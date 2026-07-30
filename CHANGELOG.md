# Changelog

Tracks notable changes to the live site and its backend. Started 2026-07-30 alongside
the Website Service work — earlier history lives in git log, not reconstructed here.

## 2026-07-30 (Review Service)

### Added — Review Service (Website Roadmap Phase W2)

- New Supabase RPCs: `list_reviews` (public read), `submit_review` (public write,
  deliberately **not** `SECURITY DEFINER`), `delete_review` (admin-gated).
- New permanent architecture rule: an intentionally-public operation like
  `submitReview` must not be upgraded to a privileged one just by moving into the
  Website Service layer. It runs as the calling role, subject to the same RLS policy
  (`anon_insert_reviews`) that governs the raw insert today — verified live as a
  genuine unauthenticated call, with invalid input rejected via the same error codes
  the raw insert already produces.
- `approveReview`/`rejectReview`/`updateReviewStatus` intentionally not built — no
  moderation-queue concept exists today; a submitted review is public immediately.
- No schema change. `clkhanna-admin.html` not yet migrated.

## 2026-07-30 (Editorial Service)

### Added — Editorial Service (Website Roadmap Phase W2)

- New Supabase RPCs: `list_editorial_images` (public read), `delete_editorial_image`
  (admin-gated). New Edge Function `upload-editorial-image` (admin-gated), which
  performs the Storage upload and the `editorial_images` row insert together in one
  operation.
- `reorderEditorialImages` intentionally not built — neither the current admin nor the
  customer-facing site expose reordering today, and this phase migrates existing
  capabilities only.
- No schema change — `editorial_images` already had the right shape and RLS.
- `clkhanna-admin.html` not yet migrated — still writes directly. `editorial_images`
  has 0 rows in production; the homepage's editorial section has always rendered its
  static fallback.

## 2026-07-30 (Homepage Service)

### Added — Homepage Service (Website Roadmap Phase W2)

- New Supabase RPCs: `get_homepage_config` (public read), `update_category_order` and
  `update_featured_products` (both admin-gated). Scoped to homepage business
  configuration only — editorial images are explicitly excluded, deferred to a future
  Editorial Service.
- Both write operations return the result of `get_homepage_config()` rather than raw
  `site_config` rows, so the storage mechanism stays invisible to every caller.
- `update_category_order` validates the input is exactly `{gold, diamond, polki}`,
  each once. `update_featured_products` validates every `img` against real products,
  rejects duplicates, and caps the list at 12 items.
- No schema change — `site_config` already had the right shape and RLS.
- Not yet consumed by the homepage: `home-page.js`/`index.html` still render from
  hardcoded values. Wiring the homepage to this service is a separate future step.

## 2026-07-30 (Product Service)

### Added — Product Service (Website Roadmap Phase W2)

- New Supabase RPCs implementing the Product Service business contract:
  `list_products`, `get_product`, `create_product`, `update_product`,
  `delete_product`, `preview_product`, `duplicate_product`, `set_stock`,
  `reorder_products`. All write operations are gated to the admin account
  server-side, matching the existing RLS admin-email pattern.
- New Edge Function `upload-product-image` — handles product photo uploads via
  Supabase Storage using the caller's own verified admin session, replacing direct
  client-side Storage calls for this operation.
- `archiveProduct` intentionally deferred — requires an additive `archived` column
  on `products` that doesn't exist yet.

### Changed

- `clkhanna-admin.html`: product list/create/edit/delete/photo-upload now call the
  Product Service RPCs/Edge Function above instead of raw `sb.from("products")` /
  `sb.storage` calls. Login flow, UI, and all non-product sections (editorial,
  subscribers, reviews, dashboard) are unchanged. Manual QA passed for all five
  flows (Load/Create/Edit/Delete/Upload) via a real admin login.
- `index.html`: homepage "View the Full Catalogue" button now links to
  `collections.html` (all categories) instead of `diamond.html` (diamond only) —
  fixed separately, already deployed in commit `5f0df91`.

### Documentation

- Added `WEBSITE_ROADMAP.md` as the authoritative, tracked roadmap (previously only
  existed as conversation/session context).
- Added this changelog.
