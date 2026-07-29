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

### Remaining Phase W2 modules (not started)

Collection, Homepage, Editorial, Review, Subscriber, Enquiry, SEO, Settings Service —
each with its own operation checklist, scoped the same way Product Service was
(investigate → spec → approve → implement → verify).

## Phase W3 — Website Integration Readiness (not started)

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
