# Changelog

Tracks notable changes to the live site and its backend. Started 2026-07-30 alongside
the Website Service work — earlier history lives in git log, not reconstructed here.

## 2026-07-30

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
