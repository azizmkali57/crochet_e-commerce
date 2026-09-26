# Crochet Alif — Handcrafted Crochet E-Commerce — Development Tracker

Last updated: 2026-09-24
Current phase: Phase 0 — Discovery and Validation
Implementation state: Frontend complete with mock data (`lib/productData.js`); backend, database, and admin panel do not exist yet
Active vertical slice: None approved
Next recommended vertical slice: Module 0 — Platform Foundation (Project Scaffolding, Database, Auth)
Commercial model (CONFIRMED): full self-serve e-commerce — customers browse, add to cart, and check out directly (COD or online payment) without needing WhatsApp. Custom/bespoke crochet requests remain a separate, inquiry-based motion handled by the artisan directly.

---

## 1. Project Identity and Product Definition

Crochet Alif is a handcrafted-goods storefront selling crochet bags, home décor, accessories, wall art, and made-to-order custom pieces. The existing Next.js frontend (App Router, React 19, Tailwind, `CartContext` + localStorage) is fully built against static mock data in `lib/productData.js`, with a checkout page that currently redirects to WhatsApp instead of processing a real order. No backend, database, or admin panel exists yet.

The platform must become the system of record for:

```
Catalog Browse -> Product Detail -> Add to Cart -> Checkout -> Payment/COD -> Order -> Fulfillment (Craft/Ship/Deliver) -> Post-sale (Reviews)
```

Parallel inquiry-based flow (bespoke work only):

```
Custom Order Inquiry -> Admin Review -> Quoted -> Accepted/Rejected -> (Accepted -> manually placed as a standard Order) -> Completed
```

Parallel back-office flow:

```
Admin Login -> Manage Products/Stock -> Manage Orders -> Update Order Status -> Manage Inquiries -> View Dashboard Stats
```

## 2. Source Priority and Classification

Source priority for every decision recorded in this tracker:

1. Direct inspection of the existing frontend codebase and its mock data shape.
2. Explicit instructions given by the project owner in chat.
3. The original project brief (schema fields, endpoint list, and integration choices supplied by the owner).
4. Standard e-commerce best practice, used only to fill gaps, always labeled as an assumption.
5. Future/optional ideas noted for later consideration.

Required labels used throughout this document:

- **CONFIRMED** — explicitly stated by the project owner or directly observed in the existing frontend.
- **TO BE VALIDATED (TBV)** — unresolved decision; dependent build work should stop at the named boundary until resolved.
- **ASSUMPTION** — a reasonable default used to keep planning moving; not final until confirmed.
- **FUTURE / OPTIONAL** — a possible later enhancement, outside the current dependency path.
- **OUT OF SCOPE** — explicitly excluded from the current build.
- **DEPENDENCY** — a prerequisite module or decision.

## 3. Confirmed Governing Rules

- Price and stock are always re-validated server-side at checkout — the client cart (localStorage) is a convenience layer only, never a source of truth.
- Stock is decremented only on confirmed order creation, never on "add to cart."
- Every `Order`, `OrderItem`, and `CustomOrderInquiry` status change should be attributable and traceable (who/when), even in a single-admin system — this protects against disputes and makes future multi-staff support a data change, not a rebuild.
- Orders snapshot customer/shipping/product details at time of purchase (`Order.shippingAddress`, `OrderItem.productName/productImage/unitPrice`) so historical orders stay accurate even if a product or profile is edited later.
- Guest checkout is always available — registration is optional, never required to buy.
- Only genuinely bespoke work (the `/contact` custom-order form) uses the inquiry pipeline; every catalog product is directly purchasable via cart/checkout.
- Products are **soft-deleted** (`isActive = false`) only — never hard-deleted once an order references them.
- Authorization for `/api/admin/**` is server-enforced on every route, not just hidden in the admin UI.
- Payment signature verification (Razorpay HMAC) must use a constant-time comparison, and a webhook is the reliability fallback for the client-side confirmation callback — never trust the client callback alone.
- No dark patterns: no fake urgency/stock-countdown badges beyond genuinely low real stock, no fake countdowns, no pre-checked upsells at checkout.

## 4. Repository and Frontend Assessment

### Existing state

- Next.js (App Router) frontend, React 19, Tailwind, Lucide/React Icons — fully built UI.
- `CartContext` (React Context + localStorage) manages cart state client-side only.
- Pages exist and are styled: Home (`/`), Catalog (`/collection`), Product Detail (`/collection/[slug]`), Cart (`/cart`), Checkout (`/checkout`), Contact/Custom Order (`/contact`).
- All product data comes from the static `lib/productData.js` file — no database.
- Checkout currently redirects to WhatsApp with a pre-filled cart summary instead of creating a real order or processing payment.

### Missing or incomplete

- No database, ORM schema, or migrations.
- No authentication/session system for customers or the admin.
- No real product/category persistence or admin CRUD.
- No real checkout: no server-side stock/price validation, no payment gateway integration, no order records.
- No order tracking, order history, or admin order management.
- No structured custom-order-inquiry backend (currently just a form with no storage).
- No review system backend.
- No transactional email or WhatsApp *notification* (as opposed to WhatsApp-as-checkout) integration.
- No image upload pipeline (Cloudinary or otherwise) for admin product photos or customer reference photos.
- No admin dashboard, stats, or inventory alerts.
- No rate limiting, input validation library, or security hardening yet — this is greenfield.

### Risks identified at this stage

- **Critical:** the current WhatsApp-redirect checkout does not create a durable order record anywhere — every sale today is essentially untracked until Module 5 is complete.
- **High:** no payment gateway account exists yet (V-001) — blocks all of Module 6.
- **High:** the current mock data's exact field shape must be inspected before `prisma/seed.js` is finalized (V-009) — the seed script drafted alongside this tracker assumes a shape and will need a one-time adjustment pass.
- **Medium:** no decision yet on shipping fee logic (V-002) — affects checkout totals shown to the customer.
- **Medium:** no decision on WhatsApp API provider (V-003) — affects Module 14 cost and setup time.
- **Low:** no test framework configured yet for this codebase — establish this in Phase 0/1, not after modules accumulate.

## 5. Validation Register

All items are **TO BE VALIDATED** unless marked otherwise.

### V-001 — Payment gateway and merchant account
- Status: TBV / Owner.
- Question: Razorpay is assumed (native UPI support, India-first) — confirm the business has (or can create) a Razorpay merchant account, and whether Stripe is also needed for any international customers.
- Blocks: Module 5 (Payment Integration) entirely; Module 4 (Checkout) can be built up to order creation without it.

### V-002 — Shipping fee model
- Status: TBV / Owner.
- Question: is the assumed "free shipping above ₹1499, flat ₹79 otherwise" correct? Does shipping vary by pincode/zone or product weight?
- Blocks: final checkout total calculation in Module 4; does not block schema or route scaffolding.

### V-003 — WhatsApp notification provider
- Status: TBV / Owner.
- Question: Twilio WhatsApp Business API (assumed, faster to set up) vs. Meta's direct WhatsApp Cloud API (cheaper at scale, more setup). Confirm budget/volume expectations.
- Blocks: Module 13 (Notifications) WhatsApp piece only; email notifications can ship independently.

### V-004 — Guest checkout — **RESOLVED / CONFIRMED**
- Decision: guest checkout is always available; account registration is optional and only adds saved addresses/order history convenience.

### V-005 — Custom order quoting workflow
- Status: TBV / Owner.
- Question: after an admin reviews a `CustomOrderInquiry` and sets a price, how is the customer actually charged — a manual payment link sent externally, or a formal "convert inquiry to draft order" admin action that generates a Razorpay payment link from inside the admin panel?
- Blocks: the "QUOTED -> ACCEPTED" step's implementation detail in Module 8; does not block basic inquiry capture/triage.

### V-006 — Review submission gating — **RESOLVED / CONFIRMED (per schema)**
- Decision: any authenticated customer can submit a review (`Review.isVerifiedPurchase` is a derived flag from matching a delivered `OrderItem`, not a hard gate on submission), and all reviews require `isApproved = true` from an admin before appearing publicly.

### V-007 — Admin roles and staffing
- Status: TBV / Owner.
- Question: is this a single-owner admin account permanently, or should the system plan for additional staff (e.g., a packing/shipping assistant) with restricted permissions?
- Assumption for now: a single `ADMIN` role is sufficient for v1 (per the original schema's `Role` enum: `CUSTOMER`, `ADMIN`); if multi-staff is needed later, this becomes a schema/permission-model change, not a full rebuild — flagged in the risk register.

### V-008 — Hosting and infrastructure
- Status: ASSUMPTION, low risk to change later.
- Assumption: Vercel (app) + Neon or Supabase (managed Postgres). Confirm before production deploy (Module 17).

### V-009 — Exact shape of `lib/productData.js`
- Status: TBV / requires direct file inspection before finalizing `prisma/seed.js`.
- Question: confirm field names (`images` array vs single `image`, `category` as string vs object, presence of `rating`/`reviewCount` fields already baked into mock data) so the seed script maps 1:1 without manual patching.
- Blocks: a clean, zero-edit run of Module 15 (Migration); does not block schema design, which is independent of the seed script.

### V-010 — Coupon/discount codes
- Status: TBV / Owner.
- Question: is a coupon-code engine needed for v1, or is the `Order.discount` field just a manual admin-applied adjustment for now?
- Assumption for now: manual discount only; a full coupon engine is FUTURE/OPTIONAL (§12).

## 6. Phase and Dependency Map

```
Phase 0  Discovery & Validation ............ resolve V-001..V-010 as needed per module
Phase 1  Platform Foundation ............... Module 0 (scaffolding, DB, auth)
Phase 2  Catalog ............................ Module 1 (categories) -> Module 2 (products/images)
Phase 3  Commerce Core ...................... Module 3 (cart wiring) -> Module 4 (checkout/order creation) -> Module 5 (payment)
Phase 4  Post-Order Operations .............. Module 6 (order mgmt/fulfillment) -> Module 7 (customer account/tracking)
Phase 5  Engagement & Support ............... Module 8 (custom inquiries) -> Module 9 (contact inquiries) -> Module 10 (reviews)
Phase 6  Admin & Media ....................... Module 11 (admin dashboard) -> Module 12 (media/Cloudinary)
Phase 7  Trust & Reliability ................. Module 13 (notifications) -> Module 14 (security/rate limiting)
Phase 8  Data Migration ...................... Module 15 (seed real catalog data)
Phase 9  Launch Readiness .................... Module 16 (testing/QA) -> Module 17 (deployment/go-live)
```

Each phase's modules should be built in the listed order — later modules assume earlier ones exist (e.g., Checkout cannot be built before Products exist in the database).

## 7. Module Status Index

| # | Module | Phase | Status | Depends on |
|---|---|---|---|---|
| 0 | Platform Foundation | 1 | Not started | — |
| 1 | Categories | 2 | Not started | 0 |
| 2 | Products & Images | 2 | Not started | 0, 1 |
| 3 | Cart Wiring | 3 | Not started | 2 |
| 4 | Checkout & Order Creation | 3 | Not started | 2, 3 |
| 5 | Payment Integration | 3 | Not started | 4, V-001 |
| 6 | Order Management & Fulfillment | 4 | Not started | 4 |
| 7 | Customer Account & Tracking | 4 | Not started | 0, 4 |
| 8 | Custom Order Inquiries | 5 | Not started | 0 |
| 9 | Contact Inquiries | 5 | Not started | 0 |
| 10 | Reviews | 5 | Not started | 4, 7 |
| 11 | Admin Dashboard | 6 | Not started | 4, 6, 8 |
| 12 | Media Storage (Cloudinary) | 6 | Not started | 2, 8 |
| 13 | Notifications (Email + WhatsApp) | 7 | Not started | 4, 6 |
| 14 | Security & Rate Limiting | 7 | Not started | 0 (applied across all) |
| 15 | Data Migration (Seed) | 8 | Not started | 2, V-009 |
| 16 | Testing & QA | 9 | Not started | all above |
| 17 | Deployment & Go-Live | 9 | Not started | 16, V-001, V-008 |

## 8. Shared Engineering Strategy

**Database:** PostgreSQL via Prisma; every schema change goes through a reviewed migration, never a hand-edited production schema. Use `Decimal` for all money fields. Denormalize order-time snapshots (`OrderItem.productName/unitPrice`) — never rely on a live join back to `Product` for historical order display.

**Validation:** every Route Handler validates its input with a Zod schema before touching Prisma. Reject with `400` and structured error details on failure. Never spread raw `req.body` into a Prisma `data:` object — pick fields explicitly to prevent mass-assignment (e.g., a client setting `role: "ADMIN"` on registration).

**Authorization:** `middleware.js` gates `/admin/**` and `/api/admin/**` at the edge; each admin route handler *also* re-checks `session.user.role === "ADMIN"` server-side — defense in depth, never rely on UI hiding alone.

**Payments:** signature verification uses `crypto.timingSafeEqual`, never `===`. A webhook is the reliability fallback for the client-side payment callback — both paths are idempotent (check `paymentStatus !== "PAID"` before writing).

**Testing:** every module needs, at minimum: input-validation tests, an authorization boundary test (401/403), and a happy-path integration test. Payment and stock-decrement logic additionally need a concurrency/idempotency test (two near-simultaneous requests should not double-decrement stock or double-mark a payment).

**A module is not "done" until:** its confirmed requirements are met, its blocking V-items are resolved or the limitation is explicitly documented, backend + Prisma models exist, server-side authorization is enforced, the relevant frontend page is wired to live data, and its test checklist passes.

## 9. Detailed Module Roadmap

### Module 0 — Platform Foundation

Status: **Not started**
Objective: stand up the database, Prisma schema, and authentication so every later module has something to build on.
Confirmed requirements: Postgres + Prisma set up; `User`, `Address` models; customer register/login/logout; admin login using the same `User` table with `role: ADMIN`; session handling (NextAuth or custom JWT in an httpOnly cookie); `middleware.js` route protection scaffold.
TBV: V-007 (future multi-staff roles), V-008 (hosting).
Assumption: NextAuth.js Credentials provider for session management, one `User` table with a `role` enum rather than a separate admin table — simpler for a single-owner store.
Out of scope: SSO/social login, multi-factor auth (flag as FUTURE/OPTIONAL if the owner wants it later).
Dependencies: none — build this first.

Submodules:
- [ ] Initialize Prisma, connect to a local/dev Postgres instance, run the first migration.
- [ ] `User` and `Address` models (see `prisma/schema.prisma`).
- [ ] `POST /api/auth/register` — Zod-validated, bcrypt-hashed password (cost ≥ 12).
- [ ] `POST /api/auth/login` (or NextAuth Credentials provider config) — httpOnly session cookie.
- [ ] `GET /api/auth/me` — returns current session user or `401`.
- [ ] `middleware.js` — protects `/admin/**`, `/api/admin/**`, `/account/**`.
- [ ] Seed one admin user (`prisma/seed.js` admin block).

Workflow/states: user registered → active. Session issued → active → expired. Validate unique normalized email, minimum password length (8+), active-session check on every protected request.

Backend/persistence: `User`, `Address` Prisma models; password hashing utility; session/JWT helper (`lib/auth.js`); standard `{ success, data/error }` response envelope used by all future routes.

Tests:
- [ ] Unit: password hash/verify, session validity check.
- [ ] API: register validation errors, duplicate-email rejection, login success/failure, 401 on `/api/auth/me` without a session.
- [ ] Security: confirm `role` cannot be set via the register payload (mass-assignment test).

---

### Module 1 — Categories

Status: **Not started**
Objective: persist the five confirmed catalog categories so products can attach to them.
Confirmed requirements: CRUD for Bags, Home Decor, Accessories, Wall Art, Custom Pieces.
TBV: none blocking — categories are simple and confirmed.
Dependencies: Module 0.

Submodules:
- [ ] `Category` Prisma model (name, slug, description, image).
- [ ] `GET /api/categories` — public, returns active categories with a product count.
- [ ] Admin category CRUD (can ship as a simple admin form; not a P0 UI priority since the 5 categories are already known — a one-time seed may suffice for v1, with CRUD as a fast-follow).

Backend/persistence: `Category` model with a unique `slug`.

Tests:
- [ ] API: `GET /api/categories` returns correct `productCount` per category.

---

### Module 2 — Products & Images

Status: **Not started**
Objective: replace `lib/productData.js` with real, database-backed products the storefront can query.
Confirmed requirements: `Product` model with name, slug, description, `details` (handcrafted feature list), price, originalPrice, stock, badge, colors (hex array), `isFeatured`, `isActive`; `ProductImage` model with ordered gallery images and one `isPrimary`.
TBV: V-009 (exact mock-data field shape, for a clean seed mapping).
Assumption: colors are a simple string array on `Product` (not separate stock-tracked variant rows) — acceptable for v1 since the original brief did not request per-color stock tracking; flagged as a risk in §10 if that changes.
Dependencies: Module 0, Module 1.

Submodules:
- [ ] `Product`, `ProductImage` Prisma models (see `prisma/schema.prisma`).
- [ ] `GET /api/products` — filtering (category, search, price range, badge), sorting, pagination (see `app/api/products/route.js`).
- [ ] `GET /api/products/:slug` — full detail with images, category, approved reviews, related products.
- [ ] Admin product CRUD: `POST/PUT/DELETE /api/admin/products` (soft-delete only).
- [ ] Refactor `src/app/collection/page.jsx` and `[slug]/page.jsx` from static import to Prisma-backed Server Components.

Workflow/states: product created (inactive by default until images are attached) → active → (optionally) deactivated. Stock is display-only here; it is only *decremented* in Module 4.

Backend/persistence: `Product`, `ProductImage` models with indexes on `slug`, `categoryId`, and `(isActive, isFeatured)`.

Tests:
- [ ] API: pagination correctness, each filter combination, 404 on unknown slug.
- [ ] Frontend: catalog page renders live data; product detail page `generateMetadata()` uses real product fields for SEO.

---

### Module 3 — Cart Wiring

Status: **Not started**
Objective: point the existing `CartContext` at real product IDs instead of mock-array indices, with no other behavior change.
Confirmed requirements: cart still lives in `CartContext` + localStorage; only the identifier stored per line item changes from a mock index to a real `Product.id` (UUID).
Dependencies: Module 2.

Submodules:
- [ ] Update "Add to Cart" calls across product cards/detail page to pass `product.id` (UUID) and `selectedColor`.
- [ ] Confirm cart total display still matches (client-side estimate only — Module 4 computes the authoritative total).

Tests:
- [ ] Frontend: add/remove/update-quantity still works; cart persists across a page reload via localStorage.

---

### Module 4 — Checkout & Order Creation

Status: **Not started**
Objective: replace the WhatsApp-redirect checkout with a real order-creation pipeline that re-validates stock/price server-side.
Confirmed requirements: `Order`, `OrderItem` models; `POST /api/orders/checkout` validates cart contents against live DB stock/price, computes subtotal/shipping/discount/total server-side, creates the order (and decrements stock) in one transaction; supports both `COD` and `ONLINE` as `paymentMethod`.
TBV: V-002 (shipping fee logic — build with the assumed flat-rate/free-threshold model, swap later without a schema change).
Dependencies: Module 2, Module 3.

Submodules:
- [ ] `Order`, `OrderItem` Prisma models (see `prisma/schema.prisma`).
- [ ] `POST /api/orders/checkout` (see `app/api/orders/checkout/route.js`) — Zod validation, live stock/price re-check, `$transaction` for order + stock decrement, `409` on insufficient stock or a deactivated product.
- [ ] Order number generator (`ALIF-YYYYMMDD-XXXX`).
- [ ] Refactor `src/app/checkout/page.jsx`: remove the WhatsApp redirect, `POST` to the new endpoint, branch on `paymentMethod` (COD finishes here; ONLINE proceeds to Module 5).
- [ ] Order-confirmation page (`/orders/track/[orderNumber]`) shown after a successful COD order.

Workflow/states: `PENDING` (payment method ONLINE, awaiting gateway) or immediately `PLACED` (COD). Stock decrements happen once, atomically, at order creation — never at "add to cart."

Backend/persistence: `Order`, `OrderItem` models; a database transaction wrapping order creation + stock decrement so a crash mid-write can't create an order without decrementing stock (or vice versa).

Tests:
- [ ] API: insufficient-stock rejection, invalid-color rejection, price is always taken from the DB not the request body (tamper test: submit a lower price, confirm it's ignored).
- [ ] Concurrency: two simultaneous checkouts for the last unit of a product — only one should succeed.

---

### Module 5 — Payment Integration (Razorpay)

Status: **Not started**
Objective: let `ONLINE` orders actually collect payment, with a reliable, idempotent confirmation path.
Confirmed requirements: Razorpay order creation at checkout time; client-side Checkout.js modal; server-side HMAC-SHA256 signature verification; webhook fallback for `payment.captured`/`payment.failed`.
TBV: V-001 (merchant account) — **blocks this module entirely** until resolved; everything else in Module 4 can ship and be tested with COD only in the meantime.
Dependencies: Module 4, V-001.

Submodules:
- [ ] Razorpay order creation inside `POST /api/orders/checkout` when `paymentMethod === "ONLINE"` (see `app/api/orders/checkout/route.js`).
- [ ] Client-side Razorpay Checkout.js modal integration in `src/app/checkout/page.jsx`.
- [ ] `POST /api/orders/verify-payment` — HMAC signature verification with `crypto.timingSafeEqual` (see `app/api/orders/verify-payment/route.js`).
- [ ] `POST /api/webhooks/razorpay` — independent signature verification against the **raw** request body using `RAZORPAY_WEBHOOK_SECRET`; handles the case where the client never calls back.
- [ ] Idempotency: both the client-callback route and the webhook check `paymentStatus !== "PAID"` before writing.

Workflow/states: `PENDING` → `PAID` (signature verified) or `FAILED` (signature mismatch, or webhook reports failure). `orderStatus` moves to `PLACED` only once `paymentStatus = PAID`.

Tests:
- [ ] API: valid signature accepted, tampered signature rejected, replayed/duplicate webhook does not double-process, webhook arriving before the client callback (or vice versa) both resolve correctly.

---

### Module 6 — Order Management & Fulfillment

Status: **Not started**
Objective: give the admin a way to see and progress orders through the craft/ship/deliver pipeline.
Confirmed requirements: `orderStatus` enum (`PLACED → PROCESSING → CRAFTING → SHIPPED → DELIVERED`, plus `CANCELLED` from any pre-`SHIPPED` state); `GET /api/admin/orders` with filters; `PATCH /api/admin/orders/:id/status`.
Dependencies: Module 4.

Submodules:
- [ ] `GET /api/admin/orders` — filter by `orderStatus`, `paymentStatus`, date range, search by order number/customer.
- [ ] `PATCH /api/admin/orders/:id/status` — validate forward-only transitions; reject invalid jumps (e.g., `PLACED → DELIVERED`).
- [ ] Admin orders list + detail UI.
- [ ] (Optional, ties to Module 13) trigger a "shipped" notification when status becomes `SHIPPED`.

Backend/persistence: status transitions validated in the route handler, not just the UI.

Tests:
- [ ] API: invalid status transition rejected with a clear error; `403` for non-admin callers.

---

### Module 7 — Customer Account & Order Tracking

Status: **Not started**
Objective: let logged-in customers see their order history and saved addresses, and let anyone (guest or not) track an order by its order number.
Confirmed requirements: `GET /api/orders/track/:orderNumber` (public); `GET /api/user/orders` (authenticated); `PUT /api/user/profile` (name/phone/addresses).
Dependencies: Module 0, Module 4.

Submodules:
- [ ] `GET /api/orders/track/:orderNumber` — consider requiring the customer's phone or email as a light second factor, since an order number alone is guessable.
- [ ] `GET /api/user/orders` — authenticated, paginated, most-recent-first.
- [ ] `PUT /api/user/profile` — update name/phone; manage `Address` records (add/edit/delete/set-default).
- [ ] `/account` page: order history + saved addresses UI.

Tests:
- [ ] API: tracking with a wrong/missing phone or email is rejected if the second-factor check is implemented; `401` on `/api/user/orders` without a session.

---

### Module 8 — Custom Order Inquiries

Status: **Not started**
Objective: give the existing `/contact` custom-order form a real backend instead of it being a dead-end form.
Confirmed requirements: `CustomOrderInquiry` model; `POST /api/inquiries/custom` (name, email, phone, details, optional reference image URL, optional budget range); `status` pipeline `NEW → REVIEWING → QUOTED → ACCEPTED/REJECTED → COMPLETED`; admin list + status update.
TBV: V-005 (how an accepted quote actually gets charged).
Dependencies: Module 0 (for admin auth on the management side); Module 12 for the image-upload piece.

Submodules:
- [ ] `CustomOrderInquiry` Prisma model.
- [ ] `POST /api/inquiries/custom` — Zod validation (name 2–100 chars, valid email, 10-digit phone, details 10–1000 chars).
- [ ] `GET /api/admin/inquiries`, `PATCH /api/admin/inquiries/:id` — status pipeline management.
- [ ] Frontend: `/contact` custom-order form posts to the new endpoint instead of doing nothing/WhatsApp.

Tests:
- [ ] API: validation errors surfaced clearly; status transitions enforced (no skipping straight to `COMPLETED` from `NEW`, for example, unless explicitly allowed).

---

### Module 9 — Contact Inquiries

Status: **Not started**
Objective: capture general contact-form messages (separate from custom-order requests) for the admin to review.
Confirmed requirements: `POST /api/inquiries/contact` (name, email, phone, subject/message).
Dependencies: Module 0.

Submodules:
- [ ] Simple contact-message handling (can reuse the `CustomOrderInquiry` table with a `type` discriminator, or a lightweight separate table — pick one during implementation and record the decision here).
- [ ] `POST /api/inquiries/contact` with Zod validation.
- [ ] Admin view for general messages.

Tests:
- [ ] API: validation errors, spam/rate-limit check (ties to Module 14).

---

### Module 10 — Reviews

Status: **Not started**
Objective: let customers review products they've purchased, moderated by the admin before going public.
Confirmed requirements: `Review` model (rating 1–5, comment, `isVerifiedPurchase`, `isApproved`); reviews only appear publicly once `isApproved = true`.
Dependencies: Module 4 (orders must exist to check verified-purchase status), Module 7 (customer must be authenticated to review).

Submodules:
- [ ] `Review` Prisma model.
- [ ] `POST /api/products/:slug/reviews` — authenticated only; derive `isVerifiedPurchase` by checking for a `DELIVERED` order containing this product for this user.
- [ ] Admin moderation: `GET/PATCH /api/admin/reviews` to approve/reject.
- [ ] Product detail page renders only `isApproved = true` reviews.

Tests:
- [ ] API: unauthenticated review submission rejected; unapproved reviews never returned from the public product endpoint.

---

### Module 11 — Admin Dashboard

Status: **Not started**
Objective: give the admin a single view of store health.
Confirmed requirements: `GET /api/admin/dashboard/stats` — total revenue, total orders, pending custom inquiries, low-stock alerts (`stock <= 5`), recent orders.
Dependencies: Module 4, Module 6, Module 8.

Submodules:
- [ ] `GET /api/admin/dashboard/stats` aggregation query.
- [ ] Admin dashboard UI (cards + a recent-orders table).

Tests:
- [ ] API: revenue calculation only counts `PAID` online orders and non-cancelled COD orders (confirm this rule matches the owner's expectation — flag as a mini validation item if unclear).

---

### Module 12 — Media Storage (Cloudinary)

Status: **Not started**
Objective: give the admin a way to upload product photos, and customers a way to attach a reference photo to a custom-order inquiry, without routing large binaries through the Next.js server.
Confirmed requirements: signed uploads for admin product images; unsigned, restricted-preset uploads for customer reference photos.
Dependencies: Module 2 (products need images), Module 8 (custom inquiries need reference photos).

Submodules:
- [ ] `/api/admin/uploads/sign` — generates a signed Cloudinary upload signature for the admin panel.
- [ ] Cloudinary unsigned upload preset scoped to a `custom-inquiries/` folder, with file-size/type restrictions, for the public contact form.
- [ ] Wire admin product form and the `/contact` reference-photo field to Cloudinary directly from the browser.

Tests:
- [ ] Manual/integration: oversized or wrong-format files are rejected by the Cloudinary preset, not silently accepted.

---

### Module 13 — Notifications (Email + WhatsApp)

Status: **Not started**
Objective: notify the customer and the store owner automatically when an order is placed, without the customer having to do anything.
Confirmed requirements: Resend-based HTML order-confirmation email; WhatsApp order-summary alert to the store owner (and, if opted in, the customer) via Twilio WhatsApp Business API.
TBV: V-003 (WhatsApp provider choice).
Dependencies: Module 4 (order creation), Module 6 (status-change notifications, optional).

Submodules:
- [ ] `lib/notifications.js#notifyOrderPlaced(order)` — fire-and-forget, logs failures, never blocks or rolls back the order transaction.
- [ ] Resend email template (order number, items, total, shipping address).
- [ ] WhatsApp message to the store owner's number on every new order.
- [ ] (Optional) WhatsApp confirmation to the customer if they opt in.

Tests:
- [ ] A failed email/WhatsApp send is logged but does not fail the checkout request itself.

---

### Module 14 — Security & Rate Limiting

Status: **Not started**
Objective: harden the public-facing write endpoints before launch.
Confirmed requirements: rate limiting on `/api/auth/login`, `/api/auth/register`, `/api/inquiries/*`, `/api/orders/checkout`; standard input validation everywhere (already threaded through each module above); secure cookie flags in production.
Dependencies: Module 0 (applies across everything built after it — revisit each module's routes as this is implemented).

Submodules:
- [ ] Rate limiter (e.g., `@upstash/ratelimit` + Redis) applied to the listed endpoints.
- [ ] Security-header review (`next.config.js` headers).
- [ ] Cookie flags: `Secure`, `httpOnly`, `SameSite=Lax` confirmed in production config.
- [ ] Pass over every admin route confirming server-side role re-check (not just `middleware.js`).

Tests:
- [ ] Hitting a rate-limited endpoint past its threshold returns `429`.
- [ ] Direct `curl` to an `/api/admin/**` route without a session/role returns `401`/`403`, independent of the frontend.

---

### Module 15 — Data Migration (Seed Real Catalog)

Status: **Not started**
Objective: get the real product catalog out of `lib/productData.js` and into Postgres.
Confirmed requirements: `prisma/seed.js` maps mock records into `Category`/`Product`/`ProductImage` rows.
TBV: V-009 — confirm the exact mock-data shape before treating the seed script as final.
Dependencies: Module 2, V-009.

Submodules:
- [ ] Inspect the real `lib/productData.js` export shape and adjust `prisma/seed.js`'s field mapping to match exactly (the draft script includes a fallback dataset so it never crashes on a shape mismatch, but the fallback should not ship to production).
- [ ] Run `npx prisma db seed`, verify row counts match the mock catalog 1:1.
- [ ] Spot-check a handful of products on the live catalog page against their mock-data originals.
- [ ] Remove the `lib/productData.js` import from any page component once verified (the file itself can stay as a seed-time reference or be deleted).

Tests:
- [ ] Product count, category assignment, and image count match the source mock data exactly.

---

### Module 16 — Testing & QA

Status: **Not started**
Objective: confirm the whole system works end-to-end before launch, not just module-by-module.
Dependencies: all modules above.

Checklist:
- [ ] Full guest checkout (COD) end-to-end, including stock decrement and email/WhatsApp notification.
- [ ] Full guest checkout (ONLINE) end-to-end with a real low-value Razorpay test transaction.
- [ ] Registered-customer checkout + order history + saved address flow.
- [ ] Custom-order inquiry submission with a reference image, through to admin status update.
- [ ] Admin: create/edit/deactivate a product; confirm it disappears from/reappears on the storefront correctly.
- [ ] Admin: order status progression through the full pipeline.
- [ ] Review submission + moderation + public visibility.
- [ ] Security pass: attempt to access every `/api/admin/**` route as a logged-out user and as a logged-in customer — confirm all are rejected.
- [ ] Concurrency test: two near-simultaneous checkouts for the last unit of a low-stock item.

---

### Module 17 — Deployment & Go-Live

Status: **Not started**
Objective: ship to production safely.
Dependencies: Module 16, V-001 (live Razorpay keys), V-008 (hosting confirmed).

Checklist:
- [ ] Provision managed Postgres; run `npx prisma migrate deploy` (never `migrate dev`) in the deploy pipeline.
- [ ] Set all production secrets in the hosting platform's environment settings.
- [ ] Switch Razorpay from test to live keys; re-register the production webhook URL.
- [ ] Restrict Cloudinary upload presets to the production domain.
- [ ] Confirm `NEXTAUTH_URL`/`NEXT_PUBLIC_APP_URL` exactly match the production domain, including `https://`.
- [ ] Enable production rate limiting (Upstash Redis or equivalent).
- [ ] Run one real, low-value end-to-end transaction in production before announcing launch.
- [ ] Rotate the seed admin account's password from its default.
- [ ] Confirm database backups and basic monitoring/alerting are configured.

## 10. Known Constraints and Risk Register

- **Critical:** the current WhatsApp-redirect checkout leaves no durable order record — this is the single biggest reason Module 4/5 should be prioritized immediately after Module 0–2.
- **High:** V-001 (payment gateway account) blocks all of Module 5; plan to resolve this in parallel with Module 0–2 so it isn't a surprise bottleneck later.
- **Medium:** V-009 (mock-data shape) means `prisma/seed.js` as currently drafted is a best-effort template, not a guaranteed drop-in — budget time for a short adjustment pass in Module 15.
- **Medium:** colors are modeled as a flat string array on `Product` rather than per-color stock-tracked variants (see Module 2 assumption). If the business later needs "5 in pink, 0 in blue" style stock, this becomes a schema migration — flagged now so it isn't a surprise.
- **Low:** no CI/test framework exists yet for this codebase; establish it in Module 0/1 rather than after several modules have accumulated untested code.

## 11. Reference Schema and Route Pointers

The full Prisma schema (User, Address, Category, Product, ProductImage, Order, OrderItem, CustomOrderInquiry, Review) and three example route handlers (`/api/products`, `/api/orders/checkout`, `/api/orders/verify-payment`) plus `prisma/seed.js` were produced alongside this tracker and should be treated as the current implementation starting point for Modules 0–5 and 15. Update the schema file directly as modules are implemented (e.g., add a `ContactInquiry` model or `type` discriminator when Module 9 is built, per the open decision noted there).

## 12. Future / Optional and Out-of-Scope Backlog

- FUTURE / OPTIONAL: coupon/discount-code engine (V-010 — currently manual `Order.discount` only).
- FUTURE / OPTIONAL: per-color stock-tracked variants (currently a flat color list; see risk register).
- FUTURE / OPTIONAL: multi-staff admin roles beyond a single `ADMIN` (V-007).
- FUTURE / OPTIONAL: wishlist/save-for-later.
- FUTURE / OPTIONAL: automated shipping-rate calculation by pincode/weight (currently flat/free-threshold, V-002).
- FUTURE / OPTIONAL: native mobile app.
- FUTURE / OPTIONAL: loyalty/referral program.
- OUT OF SCOPE: multi-vendor marketplace functionality.
- OUT OF SCOPE: in-person point-of-sale system.
- OUT OF SCOPE: cryptocurrency payments.

## 13. Change Log

- **2026-09-24 — Tracker baseline:** Converted the earlier reference-style DEVELOPMENT.md into a step-by-step, module-by-module tracker for Crochet Alif, covering 18 modules (0–17) across 9 phases, a 10-item validation register (V-001–V-010), a phase/dependency map, a module status index, a shared engineering strategy, a known-constraints/risk register, and a future/out-of-scope backlog. Frontend is complete with mock data; no backend implementation has started.

## 14. Update Protocol for Every Module

1. Read this tracker in full before starting any implementation work.
2. Confirm which module (or slice within a module) is approved to start next, and check its listed dependencies and validation-register blockers in §5.
3. If a blocking V-item is unresolved, either get it resolved first or explicitly document the limitation this creates and get sign-off to proceed partially (e.g., ship Module 4 with COD only while V-001 is pending).
4. Mark only that module active in §7 (Module Status Index) before writing code.
5. Implement the Prisma model changes, the route handler(s), server-side authorization, and the corresponding frontend page update together — not as separate, disconnected passes.
6. Run the module's test checklist plus a full `npm run build` before considering it done.
7. Update this tracker: mark the module's status, note any assumption that turned out wrong, and log the change in §13.
8. Stop; do not silently continue into the next module without the same approval step.
