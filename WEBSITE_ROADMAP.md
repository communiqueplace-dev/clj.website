# C.L Khanna Website — Master Roadmap

This is the authoritative, tracked roadmap for the website's evolution toward a
**Website Service** layer that both the existing Manual Admin and the future
**AI CL Khanna Admin** consume — so AI CL Khanna Admin can eventually become the
operational control layer for admin work without ever touching the database directly.

Governed by the Permanent Engineering Rules (investigate → report → approve →
implement → verify, stay in-phase, no customer-facing changes unless explicitly
requested, no commit/push without approval).

---

## Phase W1 — Architecture Discovery ✅ Complete

Repository audit, technology stack, database architecture, authentication review,
admin panel investigation, integration inventory, security review, AI OS integration
strategy, Product Service specification.

Key finding: `clkhanna-admin.html` is the live, actively-used admin panel.
`clkhanna-studio.html` is a dead redirect stub (`<meta http-equiv="refresh" ...
url=clkhanna-admin.html>`) — kept only so old links don't 404, contributes nothing
`clkhanna-admin.html` doesn't already have, and can be retired whenever routine
cleanup happens.

## Phase W2 — Website Service Layer 🚧 In Progress

Goal: build the business-operation layer (`Website Service`) that both admins
consume, so AI CL Khanna Admin never touches a Supabase table or Storage bucket
directly — only Website Service operations.

**Architecture (permanent, applies to every future service):**

```
Manual Admin:        Website Admin → Website Service → Database
AI CL Khanna Admin:   Department → Tool → WriteActionGate → Human Approval → Website Service → Database
```

Manual Admin writes execute immediately, as always. Every AI-initiated *write*
requires WriteActionGate approval; reads do not. Once a service exists for a table,
it becomes the only supported write surface for that table going forward.

### Product Service — ✅ Implemented, QA-verified, live in Manual Admin

| Operation | Implementation | Status |
|---|---|---|
| `listProducts` | SQL RPC `list_products` | ✅ built, verified, migrated into admin.html |
| `getProduct` | SQL RPC `get_product` | ✅ built, verified (not yet called by admin.html — not needed there) |
| `createProduct` | SQL RPC `create_product` | ✅ built, verified, migrated into admin.html |
| `updateProduct` | SQL RPC `update_product` | ✅ built, verified, migrated into admin.html |
| `deleteProduct` | SQL RPC `delete_product` | ✅ built, verified, migrated into admin.html |
| `previewProduct` | SQL RPC `preview_product` | ✅ built, verified (not yet used by any UI — ready for AI CL Khanna Admin in W4) |
| `duplicateProduct` | SQL RPC `duplicate_product` | ✅ built, verified (not yet exposed in admin.html UI) |
| `setStock` | SQL RPC `set_stock` | ✅ built, verified (not yet exposed as a standalone admin.html action) |
| `reorderProducts` | SQL RPC `reorder_products` | ✅ built, verified (not yet exposed in admin.html UI) |
| `uploadProductImage` | Edge Function `upload-product-image` | ✅ built, verified end-to-end via real admin login + manual QA |
| `archiveProduct` | — | ⛔ deferred — needs an additive `archived` boolean column on `products` that doesn't exist yet |

**Manual Admin migration:** `clkhanna-admin.html`'s product read/write calls
(`loadProducts`, `saveProduct`, `deleteProduct`) now go through the Product Service
RPCs/Edge Function instead of raw `sb.from("products")`/`sb.storage` calls. Manual QA
passed for Load/Create/Edit/Delete/Upload. Login flow, UI, and every non-product
section (editorial images, subscribers, reviews, dashboard) are untouched — those
still write directly, pending their own future services.

### Homepage Service — ✅ Implemented, verified (not yet consumed by the homepage)

Scoped to business configuration only — editorial images stay out of this module and
will belong to a future Editorial Service instead.

| Operation | Implementation | Status |
|---|---|---|
| `getHomepageConfig` | SQL RPC `get_homepage_config` (public read) | ✅ built, verified |
| `updateCategoryOrder` | SQL RPC `update_category_order` (admin-gated) | ✅ built, verified |
| `updateFeaturedProducts` | SQL RPC `update_featured_products` (admin-gated) | ✅ built, verified |

**Architecture:** both write operations return the result of `get_homepage_config()`
internally, so the underlying storage (`site_config`, key/value/jsonb) never surfaces
past the function body — callers only ever see the business shape
`{category_order, featured_products}`.

**Known state, unchanged by this work:** the homepage still renders `category_order`
and `featured_products` from hardcoded values (`home-page.js`'s `FEATURED` const,
`index.html`'s static tile order), not from this service. `cms.js` already fetches
`site_config` and looks for a `window.__siteConfigReady` callback that has never been
defined — dead code. There is also an already-scaffolded but fully unwired homepage
admin panel (`#hp-admin` in `index.html`) with no JavaScript behind it. Wiring the
homepage to actually consume Homepage Service (fixing `__siteConfigReady`, or
finishing `#hp-admin`) is a separate, not-yet-approved follow-up — this phase only
built the service.

### Editorial Service — ✅ Implemented, verified (not yet migrated into Manual Admin)

Scoped to existing business capabilities only — `reorderEditorialImages` intentionally
not built, since neither the current admin nor the customer-facing site expose
reordering today.

| Operation | Implementation | Status |
|---|---|---|
| `listEditorialImages` | SQL RPC `list_editorial_images` (public read) | ✅ built, verified |
| `deleteEditorialImage` | SQL RPC `delete_editorial_image` (admin-gated) | ✅ built, verified |
| `uploadEditorialImage` | Edge Function `upload-editorial-image` (admin-gated) | ✅ built; unauthorized paths verified; genuine authorized-upload test still pending a real admin login, same as `uploadProductImage` |

**Architecture:** `uploadEditorialImage` performs the Storage write and the
`editorial_images` insert together in one operation, since (unlike products) there is
no separate "create" step for an editorial photo to attach a URL to afterward —
mirrors the existing `addEditorial()` admin logic exactly.

**Known state, unchanged by this work:** `editorial_images` has 0 rows in production —
this feature has never actually been used; the homepage's "Moments from the Maison"
section has always rendered its static fallback content. `clkhanna-admin.html` still
writes directly (`sb.storage`, `sb.from("editorial_images")`); migrating it onto these
RPCs/Edge Function is a separate, not-yet-approved follow-up, same sequencing as
Product Service.

### Review Service — ✅ Implemented, verified (not yet migrated into Manual Admin)

Scoped to existing business capabilities only — `approveReview`, `rejectReview`,
`updateReviewStatus` intentionally not built, since no moderation-queue concept exists
in the current schema or admin UI (a submitted review is public the instant it's
inserted; the only moderation tool today is after-the-fact deletion).

| Operation | Implementation | Status |
|---|---|---|
| `listReviews` | SQL RPC `list_reviews` (public read) | ✅ built, verified |
| `submitReview` | SQL RPC `submit_review` — **not** `SECURITY DEFINER`, runs as caller | ✅ built, verified |
| `deleteReview` | SQL RPC `delete_review` (admin-gated) | ✅ built, verified |

**Architecture — Public Business Operations rule (new permanent rule, see
[[clj-public-business-operations-rule]] in project memory):** `submitReview` is
intentionally *not* privilege-elevated. It executes as the calling `anon` role, so the
existing `anon_insert_reviews` RLS policy (rate limit + product-must-exist check)
still governs it exactly as the raw insert does today. Verified at runtime as a
genuine unauthenticated call: an invalid product and an out-of-range rating were both
rejected with the same error codes the raw insert produces. This is the pattern for
any future Website Service operation that wraps something intentionally public —
same privilege, same RLS, no operation automatically becomes privileged just by
moving into the service layer.

**Known state, unchanged by this work:** `clkhanna-admin.html` still writes/reads
reviews directly; migrating it onto these RPCs is a separate, not-yet-approved
follow-up. Customer-facing review submission and display are untouched.

### Collection Service — ❌ Not required (removed from roadmap)

Investigated and found superseded by Product Service. "Collection management is
already fully represented by Product Service through product categories. No separate
business entity or admin capability exists." `collections.html` and the category
pages are filtered views over the same `products` table Product Service already owns
(`cat` field) — there is no `collections` table, no distinct admin feature, and no
data concept separate from what Product Service already handles. Building a wrapper
service around it would duplicate existing capability with nothing new.

### Subscriber Service — ✅ Implemented, verified (not yet migrated into Manual Admin)

| Operation | Implementation | Status |
|---|---|---|
| `subscribeToNewsletter` | Existing RPC `subscribe_to_newsletter` (public, not `SECURITY DEFINER` in the privilege-elevating sense — built earlier this session, predates the formal Website Service phase but already follows the same architecture) | Treated as already-implemented, not rebuilt |
| `listSubscribers` | New SQL RPC `list_subscribers` (admin-gated `SECURITY DEFINER`) | ✅ built, verified |

**No `unsubscribe`/`deleteSubscriber` operation** — no such capability exists in the
current admin or schema; not built, per the migrate-existing-only rule.

**Known state, unchanged by this work:** `clkhanna-admin.html`'s two raw reads
(`loadSubscribers`, `exportSubsCSV`) not yet migrated onto `listSubscribers`.

### Enquiry Service — ✅ Implemented, verified (not yet migrated into Manual Admin)

| Operation | Implementation | Status |
|---|---|---|
| `listEnquiries(options?)` | SQL RPC `list_enquiries(p_options jsonb)` (admin-gated) | ✅ built, verified |
| `logEnquiry` | SQL RPC `log_enquiry` — **not** `SECURITY DEFINER`, runs as caller | ✅ built, verified after one fix |

`options` is a jsonb parameter (currently reads only `limit`, default 10) so the
contract can grow without a signature change.

**Real issue caught during verification:** `log_enquiry`'s first version used
`INSERT ... RETURNING`, which requires the calling role to also pass a SELECT check on
the new row — `enquiries` has no anon SELECT policy, only an admin-only one, so every
valid call failed. Same root constraint that shaped `subscribe_to_newsletter`
(also `void`-returning) months earlier, not connected until this failed loudly.
Fixed by making `log_enquiry` `returns void` with no `RETURNING`, matching both the
established precedent and `shop.js`'s actual fire-and-forget behavior exactly.

**Known state, unchanged by this work:** `shop.js`'s raw insert and
`clkhanna-admin.html`'s dashboard widget not yet migrated. `enquiries` has 0 rows in
production.

### SEO Service — ❌ Not required (removed from roadmap)

Investigated and found superseded by Product Service. "SEO metadata is derived
automatically from Product Service data during the static build process. No
independent SEO business entity or administrative capability exists." Every product
page's title, meta description, canonical URL, and JSON-LD schema is generated by
`gen-product-pages.js` directly from Product Service's own fields (`name`,
`description`, `metal`, `cat`, `sub`, `price_from`) — no separate table, column, or
admin UI section for SEO exists anywhere.

Note: `gen-product-pages.js` reads from `catalog.js` (a static snapshot), not the live
database, so a product edit doesn't automatically regenerate its SEO page today. This
is a real gap, but it's a build/engineering-automation concern, not a Website Service
responsibility, and is explicitly out of scope for this roadmap.

### Settings Service — ❌ Not required (removed from roadmap)

"No independent Settings business entity exists. Homepage Service already owns the
only site_config values, and all remaining settings are static content with no
administrative capability to migrate." Contact information and social links are
hardcoded across all ~90 HTML pages with no database table or admin UI.

### Phase W2 status: ✅ Complete

Every planned module has either been implemented (Product, Homepage, Editorial,
Review, Subscriber, Enquiry) or investigated and found unnecessary (Collection, SEO,
Settings — each superseded by an already-implemented module or found to have no
distinct data entity/admin capability to migrate). No further modules remain.

## Phase W3 — Website Integration Readiness 🚧 In Progress

### Phase W3A — ✅ Complete (clkhanna-admin.html only)

Migrated 4 of `clkhanna-admin.html`'s remaining direct Supabase calls onto their
Website Service operations. `app.js`/`shop.js` untouched — reserved for W3B.

| Section | Before | After |
|---|---|---|
| Editorial | raw `sb.from`/`sb.storage` (3 calls) | `listEditorialImages`, `uploadEditorialImage`, `deleteEditorialImage` |
| Subscribers | raw `sb.from` (2 calls, list + CSV export) | `listSubscribers` (both) |
| Reviews (admin) | raw `sb.from` (2 calls) | `listReviews`, `deleteReview` |
| Enquiry dashboard widget | raw `sb.from` (1 call) | `listEnquiries({limit:10})` |

Every migrated call's data shape was verified identical to what the caller already
expected before any code was changed (new standing rule). All six migrated
operations were then verified against the live database with the exact parameter
shapes now in the code — real test rows inserted, called, confirmed, and cleaned up;
production data (1 real review, 0 editorial images, 0 enquiries, 5 real subscribers)
confirmed unchanged afterward.

### Phase W3B — ✅ Complete (customer-facing: review display/submission, enquiry logging)

| Call | Before | After |
|---|---|---|
| `app.js` product-page review display | raw `fetch` to `/rest/v1/reviews?select=...` | `fetch` to `/rest/v1/rpc/list_reviews` |
| `app.js` review submission form | raw `fetch` POST to `/rest/v1/reviews` | `fetch` POST to `/rest/v1/rpc/submit_review` |
| `shop.js` WhatsApp-checkout enquiry log | `sb.from('enquiries').insert(...)` | `sb.rpc('log_enquiry', ...)` |

Data shapes were confirmed compatible before implementation (Customer Regression
Rule): the review-display rendering code reads named fields only, so `list_reviews`'s
superset of columns needed no adaptation; `reviews` has a public SELECT policy (unlike
`enquiries`), so `submit_review`'s `RETURNING` works fine for anon callers; the
enquiry log call was already fully fire-and-forget. All three verified against the
live database with the exact parameters now in the code (test rows inserted, called,
confirmed, cleaned up), plus a live browser check on a real product page confirming
identical rendering, no new console errors, and a direct in-page RPC call succeeding.
`subscribe_to_newsletter` fetch→`sb.rpc()` normalization deliberately left as-is — see
report below.

**Explicitly out of scope for Phase W3** (no owning Website Service module):
`carts`, `wishlists`, `analytics_events` reads/writes, `admin_signup_stats`, both
`send-welcome` Edge Function calls.

### Customer-facing bug fix — new-product 404 (surfaced by W3A, not a Website Service change)

Migrating admin product creation onto the live database (Product Service) made the
long-flagged `catalog.js`/live-database sync gap visible: `productHref()` in `app.js`
always linked to a static per-product page (`<slug>.html`), generated only by
`gen-product-pages.js` from `catalog.js`'s static snapshot during `deploy.ps1`. A
product created through the now-working admin had no such page yet → 404 on click.

Fixed at the customer-facing layer only, not Website Service: `app.js` now snapshots
which `img` values exist in `catalog.js`'s own array at load time (before `cms.js`'s
live fetch can overwrite it), and `productHref()` falls back to the existing dynamic
`product.html?id=<img>` page for any product not in that snapshot. Existing products
keep their exact current static URLs, unchanged. No change to Website Service,
Product Service, `deploy.ps1`, or the SEO page generation process. Verified live: a
newly created test product opened correctly via the fallback with no 404 and no
console errors; an existing product's link was confirmed unchanged.

Replace remaining direct DB writes with Website Service calls across the other
modules; standardize validation, error handling, logging, and audit trails site-wide.

## Phase W3.5 — Authorization Hardening ✅ Complete (frozen)

Infrastructure-layer phase inserted before W4: replaces the hardcoded-email
authorization check (13 RPCs, 14 RLS policies, 2 Edge Functions) with claim-based
authorization, via additive dual-check → burn-in → separately-approved cutover.

### W3.5-A — ✅ `website_admins` table

`public.website_admins` (`user_id` pk → `auth.users`, `role` default `'website_admin'`,
`created_at`), locked to `service_role` only — no anon/authenticated policy exists.
Seeded with the real admin's `user_id`. Verified: row matches admin account; anon
`SELECT` returns zero rows (RLS with no matching policy).

### W3.5-B — 🚧 Custom Access Token Hook (SQL done, hook not yet enabled)

`public.custom_access_token_hook(event jsonb)` implemented per Supabase's Auth Hook
contract — looks up the caller's `user_id` in `website_admins`, sets `app_role` claim
to `'website_admin'` if found, `null` otherwise. Grants: `supabase_auth_admin` can
execute the function and `SELECT` on `website_admins` (via a dedicated RLS policy for
that role only); `authenticated`/`anon`/`public` explicitly revoked from executing it.

Verified by direct invocation: admin `user_id` → `app_role: "website_admin"`;
unknown `user_id` → `app_role: null`.

**Blocked:** enabling the hook itself is a Supabase dashboard setting
(Authentication → Hooks), not something any available tool can configure — needs
manual action with dashboard access. W3.5-C (verify real JWT issuance) cannot proceed
until the hook is enabled there.

**Investigated (dropdown showed no functions):** checked function existence, schema,
signature (`event jsonb`), return type (`jsonb`), argument list, ownership
(`postgres`), and grants (`supabase_auth_admin` execute granted;
`authenticated`/`anon`/`public` revoked) — all matched Supabase's documented contract
exactly. One real issue found and fixed: the function had a mutable `search_path`
(missing `SET search_path = ''`, unlike every other function in this project) —
corrected, re-verified working.

**Hook enabled** in the Supabase dashboard — confirmed working (W3.5-C below).

### W3.5-C — ✅ Verified real JWT claim issuance

Verified against the actual token-issuance pipeline using a disposable test account
(created and deleted via the Auth Admin API — not the real admin's account, not any
real customer's): before having a `website_admins` row, sign-in produces no `app_role`
claim; after adding one, sign-in produces `app_role: "website_admin"`. Confirmed
unauthorized calls still rejected and the real admin's email-based path still works
identically (nothing yet consumes the new claim, so nothing could have regressed).

**Real finding, not a blocker:** the claim lands as a **top-level `app_role`** claim,
not nested under `app_metadata.role`. `app_metadata` only ever contains Supabase's
standard `provider`/`providers` fields — the hook never writes there. W3.5-D's
dual-check design already correctly targets `auth.jwt()->>'app_role'`, so this is
noted for accuracy, not a change in plan.

### W3.5-D — ✅ Dual-check authorization (SQL + Edge Functions merged, per approved adjustment)

Every hardcoded-email check migrated to `(auth.jwt()->>'app_role' = 'website_admin')
OR (email = 'clkhannajewellers@gmail.com')` — email fallback intentionally kept, not
yet removed. Covers all 27 SQL objects (13 RPCs, 14 RLS policies across `products`,
`editorial_images`, `reviews`, `subscribers`, `enquiries`, `site_config`,
`analytics_events`, `wishlists`, `storage.objects`) plus both Edge Functions
(`upload-product-image`, `upload-editorial-image`, each now checking a
`website_admins` lookup as an alternative to the verified email).

**Verified:**
- Live re-query confirms zero remaining SQL objects reference the hardcoded email
  without also referencing `app_role` — full migration, no stragglers.
- Product Service spot-check: claim-only `create_product` succeeded, email-only
  `delete_product` succeeded on the same row (both paths work independently).
- Homepage Service spot-check: claim-only `update_category_order` succeeded and was
  restored via the email path — production `site_config` unchanged afterward.
- Both Edge Functions: unauthorized (no token) still rejected. Claim-only path
  verified genuinely end-to-end using a disposable test admin (created via the Auth
  Admin API, added to `website_admins`, signed in for a real token, called
  `upload-product-image` — got a real `200`, not `401`) — then fully cleaned up
  (test file deleted from storage, test user deleted, `website_admins` back to 1 row).

### W3.5-E — ✅ Extended Burn-in Verification

**🔴 Critical regression found and fixed during this stage:** all 13 dual-check RPCs
had a NULL-propagation bug — `IF NOT (app_role_check OR email_check) THEN raise`
silently skipped the exception whenever `app_role` was absent (true for every
non-admin caller), because `NULL OR FALSE` evaluates to SQL `NULL`, and plpgsql's
`IF` treats `NULL` as "don't execute," not "execute." Confirmed live: an anonymous
caller (valid anon-role JWT, no special claims) successfully read the **full
subscriber list** via `list_subscribers` and passed authorization on `delete_review`
and `create_product`. This affected all 13 RPCs from W3.5-D; RLS policies were
**not** affected (Postgres RLS treats `NULL` as deny by default — the bug was
specific to the hand-written plpgsql checks). Fixed by wrapping both sides of every
check in `coalesce(..., '')`, guaranteeing real booleans that can never collapse the
`OR` to `NULL`. Given live exposure of real subscriber emails, this was patched
immediately rather than held for approval — re-verified anon-rejection across all 13
RPCs and direct anon table access before continuing.

**Full regression verified after the fix**, covering every item requested:

- **Product Service:** create (claim), update (claim), delete (email), duplicate
  (email), set_stock (claim), reorder (claim, no-op on the real polki order —
  confirmed restored), preview (public, unaffected), list/get (public, unaffected),
  uploadProductImage (real end-to-end with a disposable admin, verified in W3.5-D).
- **Homepage Service:** read (public), update_category_order (claim + email, both
  restored), update_featured_products (claim + email, both restored).
- **Editorial Service:** list (public), full upload→delete round trip verified
  end-to-end with a real disposable-admin sign-in (`200`/`200`), storage + DB both
  cleaned up.
- **Review Service:** list (public), submit (public/unprivileged, unaffected —
  never part of the vulnerable set), delete (claim + email).
- **Subscriber Service:** subscribe (public/unprivileged, unaffected), list (claim +
  email, both tested across this stage).
- **Enquiry Service:** log (public/unprivileged, unaffected), list (claim + email).
- Anonymous callers confirmed blocked on every one of the 13 RPCs and on direct
  table-level RLS access, post-fix.
- Manual Admin's existing email-based path re-confirmed working throughout (every
  claim-path test was paired with an equivalent email-path test).

**Final state confirmed identical to pre-burn-in baseline:** 70 products, 0
editorial images, 1 review, 5 subscribers, 0 enquiries, 1 `website_admins` row, 0
leftover test users, 0 leftover storage files. Zero remaining SQL objects reference
the hardcoded email without also referencing `app_role` (re-confirmed after the
hotfix).

### W3.5-F — ✅ Final Stability Verification: PASSED

Full re-verification immediately before cutover: zero stale hardcoded-only objects,
all 13 RPCs confirmed `coalesce`-wrapped, live anon-rejection sweep across all 13
RPCs + direct table RLS + both Edge Functions (all correctly rejected), both claim
and email paths spot-verified still working (`set_stock` on `d01`, restored to
original `true`), public reads confirmed unchanged. No issues found — proceeded to
cutover per the approved plan.

### W3.5-G — ✅ Final Authorization Cutover

Email fallback removed entirely from all 27 SQL objects and both Edge Functions.
Authorization is now **`website_admin` claim only**. Verified: email-only auth now
correctly **rejected** (proves the fallback is genuinely gone, not just unused);
claim-only auth still succeeds; anon rejected across all 13 RPCs, direct table
access, and both Edge Functions (re-swept post-cutover).

**Operational note:** the real admin's *existing* browser session, if it predates
the Custom Access Token Hook being enabled (W3.5-C), will not carry the `app_role`
claim and will need to sign in again once for a fresh token. Any session obtained
after the hook was enabled already carries it correctly (proven in W3.5-C/D/E).

### W3.5-H — ✅ Cleanup

Four temporary diagnostic Edge Functions (`w35c-hook-verify`, `w35d-edgefn-verify`,
`w35d-cleanup`, `w35e-editorial-verify`) neutralized — no tool exists to fully
delete an Edge Function, so each was replaced with an inert stub returning `410
Gone`. Confirmed via live request. Full removal from the project requires manual
action in the Supabase dashboard (Edge Functions page) if desired — noted, not
blocking.

### Final Verification — ✅ Website Service is production-ready

- Zero remaining hardcoded-email references anywhere in SQL (functions or
  policies) — confirmed by direct query, not inference.
- Role-based (`website_admin` claim) authorization fully in effect; no legacy
  authorization path remains reachable.
- Production data confirmed unchanged: 70 products, 0 editorial, 1 review, 5
  subscribers, 0 enquiries, 1 `website_admins` row, `d01` stock and homepage
  category order both back to their real values.
- Zero leftover test users or storage files.
- Working tree clean (Stages F–H were pure database/Edge Function work, nothing to
  commit until this documentation update).

## Phase W4 — AI CL Khanna Admin Integration (not started)

Connect each service to KHANNA AI OS one at a time, gated by WriteActionGate for
every write, verified end-to-end per service.

## Phase W5 — Transition (not started)

Feature parity with `clkhanna-admin.html` → internal testing → parallel operation →
migrate daily operations → retire legacy admin → AI CL Khanna Admin becomes primary.
`clkhanna-studio.html` (already dead) can be deleted at any point independent of this
timeline.
