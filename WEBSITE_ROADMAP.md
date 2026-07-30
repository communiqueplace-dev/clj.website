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

Replace remaining direct DB writes with Website Service calls across the other
modules; standardize validation, error handling, logging, and audit trails site-wide.

## Phase W4 — AI CL Khanna Admin Integration (not started)

Connect each service to KHANNA AI OS one at a time, gated by WriteActionGate for
every write, verified end-to-end per service.

## Phase W5 — Transition (not started)

Feature parity with `clkhanna-admin.html` → internal testing → parallel operation →
migrate daily operations → retire legacy admin → AI CL Khanna Admin becomes primary.
`clkhanna-studio.html` (already dead) can be deleted at any point independent of this
timeline.
