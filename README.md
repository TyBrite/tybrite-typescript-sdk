# @tybrite-labs/sdk

**The TypeScript SDK for Galactic Core — a headless commerce API.**

Build storefronts, mobile apps, and custom commerce experiences against [Galactic Core](https://gc.tybritelabs.com): a fully-typed client for the catalog, cart, checkout, orders, payments, customers, search, recommendations, promotions, gift cards, reviews, returns, and messaging — one call places an order and the inventory, accounting, and customer records update themselves. Your code owns the frontend; Galactic Core runs the commerce backend behind a versioned REST API and real-time webhooks.

## Documentation

📚 Full docs, guides, and a live API reference: **[docs.tybritelabs.com](https://docs.tybritelabs.com)**

| | |
| :--- | :--- |
| **[API Reference →](https://docs.tybritelabs.com/api-reference/introduction)** | Every endpoint, parameter, and response shape. |
| **[SDK Reference →](https://docs.tybritelabs.com/sdk/introduction)** | This SDK, method by method, with TypeScript examples. |
| **[Workflow Examples →](https://docs.tybritelabs.com/workflows/introduction)** | Start-to-finish recipes — checkout, returning customer, search & discovery, marketplace, webhooks. |

## Features

- **🛍️ Complete commerce surface** — catalog & variants, cart & wishlist, checkout, orders, payments, customers, promotions, gift cards, reviews, returns, and customer messaging.
- **🧠 Smart discovery** — semantic search, "frequently bought together", trending, and personalized recommendations out of the box.
- **🌍 Global by design** — multi-currency pricing (the currency rides on every priced response), regional shipping, and tax handling; served from the edge worldwide.
- **🔗 Side effects handled for you** — placing a paid order reduces stock, redeems gift cards, books the sale, and updates customer history in one call; partial failures surface as `post_processing_warnings`.
- **🔒 Safe by default** — publishable vs. secret keys, HMAC request signing, idempotent retries, and a server that is the price authority (it recomputes prices and validates discounts, so a tampered payload can't lower the total).
- **⚡ Developer-first** — fully typed, sparse fieldsets (`fields=`) to trim payloads, cursor pagination, and real-time webhooks for order/inventory/customer events.

## Installation
To get started with the Tybrite SDK, install it via npm:
```bash
npm install @tybrite-labs/sdk
```

## Quick Start

```typescript
import { Tybrite } from '@tybrite-labs/sdk';

// Initialize the client
const client = new Tybrite({
  apiKey: 'tybrite_pk_live_YOUR_API_KEY', // publishable key — safe for client-side / storefront reads
});

// fetch products
const { products } = await client.products.listProducts({
  limit: 10,
  fields: 'id,name,price,images' // Field filtering for performance
});

console.log(products);
```

## Authentication

The API uses **Bearer Authentication**. Your API key determines your environment (Test vs. Live) and permissions.

### Key Types

| Key Type | Prefix | Access | Scope |
|----------|--------|--------|-------|
| **Secret Key** | `tybrite_sk_...` | **Read/Write** | Server-side only. Required for Orders, Customers, and Payments. |
| **Publishable Key** | `tybrite_pk_...` | **Read-Only** | Client-side safe. Use for Public Catalog, Search, and CMS. |

## Service Reference

The SDK is organized into services matching the API resources. Access them via the client instance (e.g., `client.products`).

- **`products`**: Browse the catalog, collections and specifications. The **single-product detail** calls (`getProduct`, `getProductBySlug`) return the full object — long-form `description`, **SEO metadata** (`seo_title`, `seo_description`, `seo_keywords`), the full media gallery and published specifications — for rendering search-engine-friendly product pages. The **product list** (`listProducts`) is lean by default (identity, price, thumbnail, taxonomy, flags) so catalog grids stay fast; request the heavy fields explicitly with `fields=` (e.g. `fields: 'name,price,description,seo_title'`) or pass `full: true` to get the complete object for every row. Filter the list by `categoryId`, `subcategoryId`, `search`, or **`brand`** (case-insensitive exact match). **`listBrands()`** returns the catalog's distinct brands with product counts (sorted by count) for building a "shop by brand" row — then pass a chosen brand to `listProducts({ brand })`. A store's public catalog feed carries the full fields, so a catalog mirrored into another store keeps its SEO.
- **`orders`**: Create, track, and manage orders with automatic inventory sync.
- **`customers`**: Customer profiles, RFM analytics, account management, and saved billing/shipping addresses for reuse at checkout. Capture a shopper's marketing opt-in with `marketing_consent` on `createCustomer` / `register` (and update it later via `updateCustomer`).
- **`authentication`**: Customer login, registration, and session management.
- **`cartWishlist`**: Unified interface for shopping carts and wishlists.
- **`search`**: Semantic (vector-based) and keyword search functionality. Pass `personalize: true` together with a customer session (`x-auth-token`) to nudge results toward that shopper's preferences while keeping query relevance primary.
- **`recommendations`**: AI-driven suggestions. Types: `similar`, `also-bought` (each item flagged as a complement or an alternative), `next` (the products a shopper is most likely to view or add next given their current session — pass `sessionId` and/or a `productId` anchor), `trending`, `new`, `personalized`, and `bundle` (complements ranked ahead of alternatives).
- **`discovery`**: Windowed storefront signal rankings — `getMostViewedProducts`, `getMostAddedToCartProducts`, `getBestConvertingProducts`, each over a `windowHours` window (1h/1d/7d/30d). Returns product ids + a score for a "Popular now" shelf, a "Trending in carts" section, or a PDP "hot" badge. **Publishable-key accessible, every plan** — a simple non-personalized signal list, distinct from the ML `recommendations` engine.
- **`events`**: Record storefront interactions — `record({ requestBody: { event_type, variant_id | product_id, session_id } })` logs a product `view`, `add_to_cart`, or `add_to_wishlist`. These power the `next` recommendation type. Publishable-key accessible, so it can be called from the browser; the call returns immediately and never blocks the page.
- **`analytics`**: First-party storefront analytics — `collectAnalyticsEvent({ requestBody: { event_type, visitor_id, session_id, path, referrer, utm_*, duration_ms? } })` records a `session_start` (first event of a browsing session), `page_view` (each route change), or `page_close` (on page hide, with `duration_ms`, sent via `navigator.sendBeacon` to capture time-on-page + exit pages). Device, browser, OS, and country/region/city are derived automatically from the request — no tracking script to add. These power the merchant's traffic, audience, conversion-funnel, and revenue-by-source reporting. Publishable-key accessible; fire-and-forget, never blocks the page. (To attribute revenue to a source, pass the session's `attribution` when creating the order — see `orders`.)
- **`payments`**: Payment processing (Stripe, Mobile Money) and verification.
- **`pricing`**: Dynamic pricing engine and discount rule resolution.
- **`promotions`**: Read marketing campaigns and discounts, and compute discounts **server-side** so your storefront never reimplements the math: `calculatePromotionDiscount({ id, requestBody: { cart } })` returns the exact amount one promotion takes off a cart (with `eligible`/`reason` when it doesn't qualify), and `calculateBestPromotion({ requestBody: { cart } })` returns the single highest-value promotion to auto-apply. `bundle`/`bogo` promotions expose their product sets as id arrays (`bundle_products`, `bogo_required_products`, `bogo_free_products`) — pass `getPromotion({ id, expand: 'products' })` to get them resolved with embedded product details in one call (`*_resolved` arrays), or resolve the ids yourself with `products.getProduct`. Marketplace storefronts read and calculate a featured merchant's promotion by passing `storeId` (the `merchant_store_id` from the placement/collection).
- **`giftCards`**: Gift card redemption, and balance tracking.
- **`shipping`**: Delivery cost calculation + multi-carrier shipping. `getShippingZones` / `calculateShipping` price delivery from the merchant's zones + distance tiers (always available). When the store has **Shippo** connected and you pass a destination `address_to` + `parcel` to `calculateShipping`, the response ALSO includes live carrier `rates[]` (USPS/UPS/FedEx/DHL — each with `rate_id`, `provider`, `service`, `amount`, `estimated_days`); show them at checkout and carry the chosen `rate_id` into `orders.createOrder` as `shippo_rate_id`. For tracking, the lightest path is to link to the carrier's own tracking page (saved on the order at `shipping_metadata.shippo.tracking_url` when the label is bought — no API call); use `trackShipment({ carrier, number })` only when you want the live status rendered inside your own UI. (Buying a shipping label is a merchant fulfillment action done in the admin — it charges the merchant's carrier account, marks the order shipped, and emits `order.shipped` — so it isn't part of the storefront SDK.) Manual zones/tiers keep working with or without Shippo.
- **`tax`**: Preview the tax for a shipping destination and cart **before** placing the order, so the storefront can show and charge the final tax-inclusive total. `previewTax({ requestBody: { ship_to, lines, currency } })` returns `tax_amount` plus a per-jurisdiction `tax_breakdown` when the store has automatic tax enabled (`tax_source: 'automatic'`), or `{ tax_source: 'fallback' }` when it isn't (apply the store's own rate). The estimate is never recorded for filing. Publishable-key accessible so it can be called from the browser at checkout — then compute `total_amount` (`subtotal + tax_amount + shipping − discount`) and pass that same total to `orders.createOrder`. (Order responses also carry `tax_amount`, `tax_breakdown`, and `tax_source`.)
- **`taxonomy`**: Manage categories and subcategories.
- **`cms`**: Shoppable content management (Blog posts, Lookbooks).
- **`messaging`**: Real-time customer support messaging. Receive a thread's new messages live (no polling) by opening a WebSocket with the `subscribeToThread` helper exported from the package root — no extra dependency required.
- **`ingestion`**: Sync an external product catalog into a store. `ingestProducts({ requestBody })` accepts a batch of products as JSON (or send XML/CSV with the matching `Content-Type`), matches by **SKU** (existing SKUs are updated, new ones created; pass `strategy: 'create_only'` to skip existing), and groups rows that share a `product_group` into one multi-variant product. Returns a per-row result (`summary` counts + an `errors` array naming each rejected row). Requires a **secret key and a request signature** (sign like orders/payments — see HMAC Signature Verification). Validate a feed before integrating with the no-key helpers `getIngestSample({ format })` (returns a sample feed) and `testIngest({ requestBody })` (validates without writing).
- **`marketplace`**: Multi-merchant marketplaces — marketplace identity and branding, aggregated catalog reads, single-merchant shop pages, unified multi-merchant checkout with automatic payment splitting, and the unified cross-merchant customer profile. Checkout supports **per-merchant discounts** (apply a merchant's own promotion or gift card to that merchant's portion of the basket; marketplace-wide operator promotions apply automatically). Serves **operator-curated collections** (homepage merchandising sections of products, merchants, or promotions) alongside **sponsored ad placements** (rendered with a required "Sponsored" disclosure label) and operator-curated fallback placements; logs impression/click beacons. Marketplace recommendations are computed deployment-wide across all merchants, each item stamped with its source `merchant_store_id` — including session/`next`-item suggestions across merchants and the complement/alternative distinction on co-purchase results.
- **`returns`**: Returns a shopper lodges against their own online orders. `listReturnReasons()` fetches the reason codes + labels for your dropdown (API key only — no customer session). `createReturn({ requestBody, xAuthToken })` lodges a return for one of the signed-in customer's orders (it starts `pending`), and `listReturns(...)` / `getReturn({ id, xAuthToken })` track the customer's own returns and per-item status. List/get/create require a customer session — pass `xAuthToken` (a session token) **or** `xExternalAuth` (a bring-your-own-auth assertion). `reason_description` is required only when `reason_code` is `other`. A customer can only see and create their own returns; approving, refunding, issuing store credit, restocking, and rejecting are merchant actions in the admin, not in this API. When a return carries a pending store-credit offer (`credit_offer.status === 'pending'`), the shopper can `acceptReturnCredit({ id, xAuthToken })` to take the credit or `requestReturnRefund({ id, xAuthToken })` to ask for a refund instead; `getStoreCredit({ xAuthToken })` returns their redeemable balance. Spend store credit at checkout by passing `apply_store_credit: true` to `orders.createOrder`.
- **`system`**: Platform health checks and store metadata, including the store's currency (see below).
- **`sandbox`**: Developer tooling for the **sandbox (test) environment** — **secret test key (`tybrite_sk_test_*`) only**, and only ever affects sandbox data. `resetSandbox()` (or `deleteSandboxData()`) wipes all your sandbox test data instantly instead of waiting for the 30-day cleanup; `advanceSandboxTime({ requestBody: { advance_days } })` fast-forwards sandbox time so abandoned-cart windows elapse, reserved stock releases, and analytics roll forward without waiting (returns a summary of what shifted / was left alone); `replaySandboxWebhook({ requestBody: { event_id } | { type } })` re-sends a recorded sandbox webhook event to your endpoints without recreating the underlying record.

## Key usage by operation

Which key each operation needs. **`pk`** = publishable (browser-safe, read + cart/wishlist writes); **`sk`** = secret (server-only, full access); **+ session** = also requires the shopper's `xAuthToken` (or `xExternalAuth`); **+ HMAC** = secret key **and** a request signature (see [HMAC Signature Verification](#hmac-signature-verification)).

| Operation | Key |
| :--- | :--- |
| Products, collections, specs, **brands** (`client.products.*`) | `pk` or `sk` |
| Categories & subcategories (`client.taxonomy.*`) | `pk` or `sk` |
| Prices (`client.pricing.*`) | `pk` or `sk` |
| Search — text & semantic (`client.search.*`) | `pk` or `sk` |
| Tax preview (`client.tax.previewTax`) | `pk` or `sk` (browser) |
| **Recommendations** (`client.recommendations.*`) | **`sk` only** |
| Discovery — most-viewed / carted / converting (`client.discovery.*`) | `pk` or `sk` (browser) |
| Event capture (`client.events.recordEvent`) | `pk` (browser) |
| Analytics (`client.analytics.collectAnalyticsEvent`) | `pk` (browser) |
| Blog posts & lookbooks (`client.cms.*`) | `pk` or `sk` |
| Store info (`client.system.getStoreInfo`), health | `pk` or `sk` |
| Cart & wishlist (`client.cartWishlist.*`) | `pk` (browser) — **+ session** when a `customer_id` is supplied |
| Auth — login / register / logout / OTP / reset (`client.authentication.*`) | **`sk` only** |
| Create customer (`createCustomer`) | **`sk` only** |
| Customer self — profile & addresses (`getCustomer`, `updateCustomer`, …) | `pk` **+ session** |
| List / get orders (`listOrders`, `getOrder`) | **`sk` only** |
| Create / update order (`createOrder`, `updateOrder`) | **`sk` only + HMAC** |
| Payment methods (`getPaymentMethods`) | `pk` or `sk` |
| Initialize / verify payment (`initializePayment`, `verifyPayment`) | **`sk` only** (init also **+ HMAC**) |
| List reviews (`listReviews`) | `pk` or `sk` (pk sees approved only) |
| Submit/delete own review (`client.reviews.*` writes) | `pk` **+ session** |
| Returns — lodge / track / accept-credit (`client.returns.*`) | `pk` **+ session** (`listReturnReasons` needs no session) |
| Messaging (`client.messaging.*`) | `pk` **+ session** |
| Gift card check (`checkGiftCard`) | `pk` or `sk` · list mine (`listGiftCards`) → `pk` **+ session** |
| Promotions (`client.promotions.*`) | `pk` or `sk` |
| Shipping — zones, calculate, track (`client.shipping.*`) | `pk` or `sk` |
| Webhook endpoints & events (`client.webhooks.*`) | **`sk` only** |
| Catalog ingestion push (`ingestProducts`) | **`sk` only + HMAC** · sample/test → `sk` |
| GC Connect — authorize / token / revoke (`client.gcConnect.*`) | Public (OAuth client credentials) · list sessions → `sk` |
| Marketplace — checkout, info, profile (`client.marketplace.*`) | Operator key (profile also **+ `X-Customer-Token`**) |
| Sandbox tools — reset / time-travel / replay (`client.sandbox.*`) | **`sk` test key only** (`tybrite_sk_test_*`; sandbox env) |

## Examples by service

One happy-path example per service. Unless noted, examples assume a publishable-key client
(`const client = new Tybrite({ apiKey: 'tybrite_pk_live_...' })`); where a call is secret-key only,
the example uses `server` (`const server = new Tybrite({ apiKey: 'tybrite_sk_live_...' })`) and says
so. See the [Key usage by operation](#key-usage-by-operation) matrix below, plus
[Authentication](#authentication) and [HMAC Signature Verification](#hmac-signature-verification).

### products

```typescript
const { brands } = await client.products.listBrands();
// → [{ brand: 'Acme', product_count: 42 }, ...] — pair with listProducts({ brand }) for a brand page
```

### taxonomy

```typescript
const { categories } = await client.taxonomy.listCategories({ limit: 50 });
// → [{ id, name, slug, product_count }, ...] — build your nav, then filter listProducts({ categoryId })
```

### pricing

```typescript
const price = await client.pricing.getProductPrice({ id: 'product-uuid', quantity: 2 });
// → { resolved_price, display_currency, currency_symbol, base_currency, exchange_rate, ... }
```

### search

```typescript
const results = await client.search.searchProducts({ q: 'wireless headphones', limit: 10 });
// → { query, results: [{ productId, score }], totalResults }
// Natural-language? Use client.search.semanticSearch({ requestBody: { query, limit } }).
```

### recommendations

```typescript
// Secret-key only (a publishable key gets 403) — call from your server.
const { recommendations } = await server.recommendations.getRecommendations({
  requestBody: { type: 'similar', productId: 'product-uuid', limit: 8 },
});
// → { type, recommendations: [...ranked products], fromCache, computedAt }
// Types: similar | also-bought | next | trending | new | personalized | bundle
```

### giftCards

```typescript
const card = await client.giftCards.checkGiftCard({ code: 'GIFT-XXXX-YYYY' });
// → { valid, balance, currency } — redeem by passing gift_card_redemption to orders.createOrder
```

### promotions

```typescript
const best = await client.promotions.calculateBestPromotion({
  requestBody: { cart: [{ product_id: 'product-uuid', quantity: 2, price: 49.99 }] },
});
// → the single highest-value promotion to auto-apply, with the discount it grants
```

### cartWishlist

```typescript
const cart = await client.cartWishlist.addToCart({
  requestBody: { variant_id: 'variant-uuid', quantity: 1 },
  xSessionId: 'session-uuid', // anonymous cart; or pass xAuthToken for a signed-in shopper
});
// → the updated cart with its line items and totals
```

### authentication

```typescript
const session = await client.authentication.login({
  requestBody: { email: 'shopper@example.com', password: '...' },
});
// → { access_token, ... } — pass access_token as xAuthToken on customer-scoped calls
```

### customers

```typescript
const customer = await client.customers.getCustomer({ id: 'customer-uuid', xAuthToken: session.access_token });
// → { id, name, email, phone, store_metrics, ... } (requires the customer's own session)
```

### orders

```typescript
// Secret key + HMAC signing required — see HMAC Signature Verification.
const order = await client.orders.getOrder({ id: 'order-uuid' });
// → the order with line items, totals and status
```

### payments

```typescript
const { methods } = await client.payments.getPaymentMethods();
// → the providers this store has configured (e.g. stripe). initializePayment is secret-key + HMAC.
```

### shipping

```typescript
// Zone / distance pricing (always available):
const fee = await client.shipping.calculateShipping({
  requestBody: { latitude: 40.7128, longitude: -74.006, order_total: 120 },
});
// → { fee, rate_source: 'zone'|'tier'|'none', ... }

// With Shippo connected — pass a destination + parcel to ALSO get live carrier rates:
const quote = await client.shipping.calculateShipping({
  requestBody: {
    latitude: 40.748, longitude: -73.985, order_total: 120,
    address_to: { street1: '350 5th Ave', city: 'New York', state: 'NY', zip: '10118', country: 'US' },
    parcel: { length: '10', width: '8', height: '4', distance_unit: 'in', weight: '2', mass_unit: 'lb' },
  },
});
// → { fee, rate_source: 'shippo', rates: [{ rate_id, provider, service, amount, estimated_days }, …] }
// Show rates[], let the shopper pick, and pass the chosen rate_id to createOrder as `shippo_rate_id`.

// Track a parcel once the order has a tracking number (the merchant buys the label in the admin):
const status = await client.shipping.trackShipment({ carrier: 'usps', number: order.tracking_number });
```

### returns

```typescript
const reasons = await client.returns.listReturnReasons();
// → [{ code: 'damaged', label: 'Arrived damaged' }, ...] for your return-reason dropdown.
// createReturn / listReturns / getReturn require a customer session (xAuthToken or xExternalAuth).
```

### reviews

```typescript
const { reviews } = await client.reviews.listReviews({ productId: 'product-uuid', sort: 'newest' });
// → approved reviews for the product. submitReview requires a customer session.
```

### messaging

```typescript
// Customer-scoped: pass the shopper's session token + their customer id.
const { threads } = await client.messaging.listThreads({ xAuthToken: session.access_token, customerId: 'customer-uuid' });
// → the customer's support threads.

// Live updates: open a WebSocket to the thread (no polling, no extra dependency).
import { subscribeToThread } from '@tybrite-labs/sdk';
const unsubscribe = subscribeToThread({
  apiKey: 'tybrite_pk_live_...',
  threadId: 'thread-uuid',
  authToken: session.access_token, // or externalAuth for bring-your-own-auth
  onMessage: (message) => console.log('new message', message),
});
// later: unsubscribe();
```

### cms

```typescript
const { posts } = await client.cms.listPosts({ limit: 10 });
// → published blog posts (shoppable). Lookbooks: client.cms.listLookbooks(...).

// Capture a newsletter signup from the storefront (email-keyed, idempotent):
await client.cms.subscribeNewsletter({ requestBody: { email: 'shopper@example.com', source: 'footer' } });
```

### events

```typescript
await client.events.recordEvent({
  requestBody: { event_type: 'view', product_id: 'product-uuid', session_id: 'session-uuid' },
});
// → 202 fire-and-forget; powers the `next` recommendation type. Never blocks the page.
```

### analytics

```typescript
await client.analytics.collectAnalyticsEvent({
  requestBody: { event_type: 'page_view', visitor_id: 'visitor-uuid', session_id: 'session-uuid', path: '/products/abc' },
});
// → fire-and-forget; device/browser/geo are derived server-side. Powers merchant analytics.
```

### tax

```typescript
// Preview tax for the cart BEFORE placing the order, so the storefront shows the final total.
const tax = await client.tax.previewTax({
  requestBody: {
    ship_to: { line1: '350 Fifth Avenue', city: 'New York', region: 'NY', country: 'US', postal_code: '10118' },
    lines: [{ quantity: 2, amount: 598, item_code: 'SAM-WATCH-6', category_name: 'Wearables' }],
    currency: 'USD',
  },
});
// → { tax_amount: 53.08, tax_source: 'automatic', breakdown: [ { jurisName: 'NEW YORK CITY', rate: 0.045, tax: 26.91 }, … ] }
// (or { tax_source: 'fallback' } when automatic tax isn't configured — apply the store's own rate.)

const subtotal = 598, shipping = 5.99, discount = 0;
const total_amount = subtotal + (tax.tax_amount ?? 0) + shipping - discount; // 657.07 → pass to createOrder
```

### system

```typescript
const { store, features } = await client.system.getStoreInfo({});
// → store config (default_currency, currencies, timezone, ...) + a `features` flag block
if (features.gift_cards) renderGiftCardField();
```

**Reading `features` flags.** Each flag answers "render this capability **now**?" — it is `true`
only when the capability is both available to the store **and** has data/config to surface. `false`
is broad: the plan doesn't include it, or it's included but not set up yet, or both. Two kinds:
- **Plan-gated** (`true` = plan includes it AND configured): `ai_recommendations`, `semantic_search`,
  `multi_currency`, `dynamic_pricing`, `cms`, `lookbooks`, `returns`. Starter has none of these;
  Growth adds `cms`/`lookbooks`/`returns`; Premium & Enterprise add the rest.
- **Data-presence** (`true` = the store has ≥1 of that item; every plan): `gift_cards`, `promotions`,
  `messaging`, `specifications`, `collections`.

Because `false` is ambiguous, `features.feature_status` gives the **reason** per flag — `available`
(boolean `true`), `awaiting_data` (in plan/ungated but no data yet → **pre-build the UI**, it lights
up automatically when data arrives), or `not_in_plan` (plan excludes it → hide; upgrade required):

```typescript
if (features.gift_cards) renderGiftCardField();
else if (features.feature_status.gift_cards === 'awaiting_data') renderGiftCardField({ pending: true });
// 'not_in_plan' → don't build it
```

### marketplace

```typescript
// Marketplace (operator key) deployments only.
const info = await client.marketplace.getMarketplaceInfo({});
// → marketplace identity + branding; pass { storeId } for one merchant's full store info
```

### ingestion

```typescript
const sample = await client.ingestion.getIngestSample({ format: 'json' });
// → a sample feed to model your data on. ingestProducts (the write) needs a secret key + signature.
```

### webhooks

```typescript
const { webhook_endpoints } = await client.webhooks.listWebhookEndpoints({ limit: 50 });
// → your registered endpoints. createWebhookEndpoint registers a new one (secret key).
```

### gcConnect

```typescript
// "Login with GC" OAuth-style flow — your app sends the merchant to the authorize URL.
const request = await client.gcConnect.getConnectAuthorize({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'products:read orders:read',
  state: 'csrf-token',
});
// → the consent request details to render before the merchant approves access
```


## Advanced Usage

### Currency
**Currency rides on every priced response — you don't fetch it separately.** Each product (from
`listProducts`/`getProduct`) and every pricing response carries `display_currency` (the code) and
`currency_symbol` inline; pricing responses also add `base_currency` and `exchange_rate`. So you
format money straight from the row you already loaded. Both fields are `fields=`-selectable.

```typescript
const fmt = (amount: number, currency: string) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);

const { products } = await client.products.listProducts({
  fields: 'name,price,display_currency,currency_symbol',
});
products.forEach((p) => console.log(p.name, fmt(p.price, p.display_currency))); // e.g. €349.99
```

Store information is **configuration metadata** — use it to know *which* currencies a store supports
(e.g. to render a currency switcher), not as the per-response source of truth:

```typescript
const { store } = await client.system.getStoreInfo({});
store.default_currency; // the store's base currency (same value pricing returns as base_currency)
store.currencies;       // every currency the store has enabled, e.g. ['USD','GBP','EUR']
```

Single-currency stores (`currencies: ['EUR']`) display everything in `default_currency`.
Multi-currency stores expose `features.multi_currency: true` and the full `currencies` list, so you
can offer a currency switcher. On a marketplace, read currency from
`client.marketplace.getMarketplaceInfo`.

### Field Filtering
Reduce payload size by requesting only specific fields.

```typescript
const product = await client.products.getProduct({
  id: 'prod_123',
  fields: 'id,name,sku,images,price,attributes.color,seo_title,seo_description,seo_keywords'
});

// Render a search-engine-friendly product page:
document.title = product.seo_title ?? product.name;
// <meta name="description" content={product.seo_description ?? product.description} />
```

### Cursor-Based Pagination
Efficiently navigate large datasets with cursor-based pagination (no offset limits).

```typescript
// Fetch first page
const page1 = await client.products.listProducts({ limit: 20 });

// Fetch next page using cursor
if (page1.pagination.has_more) {
  const page2 = await client.products.listProducts({
    limit: 20,
    cursor: page1.pagination.next_cursor
  });
}

// Infinite scroll pattern
let cursor = undefined;
do {
  const page = await client.products.listProducts({ limit: 20, cursor });
  // Process page.products...
  cursor = page.pagination.next_cursor;
} while (page.pagination.has_more);
```

### Idempotency (Safe Retries)
Prevent duplicate orders and updates during network failures by providing unique `Idempotency-Key` headers.

```typescript
// Creating an order
const order = await client.orders.createOrder({
  idempotencyKey: 'order-2026-02-16-xyz789', // Unique per order creation
  requestBody: { ... },
});

// Updating an order (requires different key)
const updated = await client.orders.updateOrder({
  id: order.id,
  idempotencyKey: 'update-shipping-xyz789-1234567890', // Unique per update operation
  requestBody: { tracking_number: '1Z999AA10123456784' },
});
```

### HMAC Signature Verification
Orders and payments require HMAC-SHA256 signatures, which prove the request body wasn't altered in transit and block replay attacks (a 5-minute timestamp window). HMAC does **not** vouch for the *values* in the body — see [Server is the price authority](#server-is-the-price-authority) below for how amounts are validated.

**Which secret to sign with:** if you obtained your keys through **Login with GC** (the GcConnect flow), sign with the `signing_secret` returned by the token exchange — it's scoped to your connection and can be rotated/revoked independently. Otherwise (a merchant signing for their own store), use the store's signing secret from **Settings → Integration Settings**. In the examples below, `hmacSecret` is whichever of these applies to you.

```typescript
import crypto from 'crypto';

// Example 1: Creating an order
const timestamp = Math.floor(Date.now() / 1000);
const orderBody = JSON.stringify({
  customer_id: 'cust_123',
  items: [{ product_id: 'prod_abc', quantity: 1, unit_price: 100 }],
  total_amount: 100
});

const payload = `${timestamp}.${orderBody}`;
const signature = crypto.createHmac('sha256', hmacSecret)
  .update(payload)
  .digest('base64');

const order = await client.orders.createOrder({
  idempotencyKey: 'order-unique-key',
  xTimestamp: timestamp,
  xSignature: signature,
  requestBody: JSON.parse(orderBody)
});

// Example 2: Initializing a payment
const paymentTimestamp = Math.floor(Date.now() / 1000);
const paymentBody = JSON.stringify({
  provider: 'stripe',
  amount: 100.00,
  currency: 'usd',
  email: 'customer@example.com'
});

const paymentPayload = `${paymentTimestamp}.${paymentBody}`;
const paymentSignature = crypto.createHmac('sha256', hmacSecret)
  .update(paymentPayload)
  .digest('base64');

const payment = await client.payments.initializePayment({
  idempotencyKey: 'payment-1234567890-abc',
  xTimestamp: paymentTimestamp,
  xSignature: paymentSignature,
  requestBody: JSON.parse(paymentBody)
});
```

**Note:** The SDK automatically handles HMAC signing when you provide your HMAC secret during initialization. Get your HMAC secret from Settings → Integration Settings in your dashboard.

### Server is the price authority

Checkout never trusts client-supplied money. When you call `orders.createOrder`, `marketplace.marketplaceCheckout`, or `payments.initializePayment`, the server independently recomputes every item price from the live catalog and validates the totals — so a signed-but-dishonest body is still rejected. Send honest values:

- **Item prices** — set each item's `unit_price` / `total_price` to the catalog price (the value from `products` / `pricing`), never a number you computed. A mismatch returns `400 price_mismatch`, and the stored order always uses the catalog price regardless.
- **Discounts** — a `discount_amount` must be backed by a real entitlement. Pass the actual `promotion_usages: [{ promotion_id, discount_amount }]` and/or `gift_card_redemption: { code, amount }` the shopper qualifies for; the server recomputes the legitimate maximum and rejects anything above it with `400 discount_invalid` (a discount with no real promotion or gift card behind it caps at 0). Never fabricate or hardcode a discount to lower the price.
- **Totals** — `subtotal + tax + shipping − discount` must reconcile, and `shipping_amount` may not be negative (`400 price_mismatch`). A gift card **is part of `discount_amount`**: fold the redeemed amount in so the total reflects it (a $50 card on a $250 cart → `discount_amount: 50`, `total_amount: 200`, `gift_card_redemption: { code, amount: 50 }`; the shopper pays $200 and the card balance drops $50). You can't redeem more than the card's balance.
- **Payments** — when you pass an `order_id`, `initializePayment` checks `amount` against the order's authoritative total and returns `400 amount_mismatch` on a mismatch; pass the order's real `total_amount`.

To discover the legitimate discount *before* checkout, use the server-side calculators and send exactly what they return:

```typescript
// What does this promotion actually take off the cart?
const promo = await client.promotions.calculatePromotionDiscount({
  id: 'promo_id',
  requestBody: { cart: [{ product_id: 'prod_abc', quantity: 2, price: 49.99 }] },
});
// → { eligible: true, discount_amount: 10.00, reason: null }

// Or let the server pick the single best promotion to auto-apply:
const best = await client.promotions.calculateBestPromotion({
  requestBody: { cart: [{ product_id: 'prod_abc', quantity: 2, price: 49.99 }] },
});

// Check a gift card's redeemable balance before applying it:
const gc = await client.giftCards.checkGiftCard({ code: 'GC-XXXX-YYYY' });
// → { valid: true, balance: 25.00, currency: 'USD' }
```

For multi-merchant `marketplaceCheckout`, you pass discount **identifiers only** — each `discounts` entry names a `merchant_store_id` and an optional `promotion_id` / `gift_card_code`; the server resolves the real amount per merchant (and the operator-funded share) and rejects an invalid one with `400 discount_invalid`. There is no client-supplied amount on that call at all.

### Anonymous Carts
Handle carts for users who haven't logged in yet using `X-Session-Id`.

```typescript
// Add item to anonymous cart — cart items are variant-grained (see "Product IDs vs Variant IDs").
await client.cartWishlist.addToCart({
  requestBody: {
    variant_id: 'variant_abc',
    quantity: 1
  },
  xSessionId: 'session_uuid_generated_on_client'
});
```

### Product IDs vs Variant IDs

A **product** is the catalog entry (the "Cotton Hoodie"); a **variant** is a specific buyable SKU of it (the "Cotton Hoodie / Navy / M"). Every product has at least one variant, one marked the default. The rule: **money and inventory are variant-grained; catalog and discovery are product-grained.** Carry the `variant_id` you put in the cart all the way through to the order — don't switch to `product_id` at checkout, or you may order the *default* variant instead of the one the shopper chose.

| Operation | Pass |
| :--- | :--- |
| `cartWishlist.addToCart`, `addToWishlist` | **`variant_id`** (required) — a specific SKU. |
| `marketplace.marketplaceCheckout` items | **`variant_id`** (required). |
| `orders.createOrder` items | **`variant_id`** preferred (the chosen SKU); `product_id` alone resolves the **default** variant. Send at least one — if both, `variant_id` wins. |
| `events.record` | **Either** `variant_id` or `product_id` — the server resolves the product. |
| `reviews.submitReview` | **`product_id`** (required); `variant_id` is an optional pin and is `null` on most reviews (expected, not missing). |
| `recommendations.getRecommendations` | **`product_id`** — the seed product. |
| `returns.createReturn` items | Neither — items reference the original `order_item_id`. |
| `products.getProduct`, `pricing.*` | **Either** — a multi-variant product returns a `variants[]` array; read the chosen `variant_id` from there. |

### Multi-Merchant Marketplaces
On a marketplace deployment, authenticate the storefront with a **marketplace operator key** (a publishable key). Catalog reads (`products`, `taxonomy`, `search`) then return the combined catalog across every active merchant. Pass `storeId` to narrow any of those reads to a single merchant's shop page. Read the marketplace's own identity and branding (or one merchant's full store information) with `marketplace.getMarketplaceInfo`, and check out a single cart spanning multiple merchants — one payment is split to each merchant automatically.

```typescript
const marketplace = new Tybrite({ apiKey: 'tybrite_pk_live_operator_...' });

// Marketplace identity & branding (name, logo, colors, contact)
const info = await marketplace.marketplace.getMarketplaceInfo({});

// Aggregated catalog across all merchants (each product carries its merchant_store_id)
const { products } = await marketplace.products.listProducts({ limit: 20 });

// Narrow to a single merchant's shop page
const merchantProducts = await marketplace.products.listProducts({ storeId: 'merchant-a' });

// One cart, many merchants → one payment, auto-split.
// Send identifiers only (variant/merchant/quantity, and discount ids) — the server
// prices and splits everything. See "Server is the price authority" above.
const order = await marketplace.marketplace.marketplaceCheckout({
  requestBody: {
    items: [
      { variant_id: 'v1', merchant_store_id: 'merchant-a', quantity: 1 },
      { variant_id: 'v2', merchant_store_id: 'merchant-b', quantity: 2 },
    ],
    customer_email: 'shopper@example.com',
    currency: 'USD',
  },
});
// Complete the payment on the storefront with order.client_secret (Stripe.js).
```

### Returns
A return is a record a shopper raises against one of their own online orders; it starts `pending` and the **merchant** resolves it from their admin (approve/reject per line, then refund, store credit, or an even-swap exchange). This API is the **storefront half**: your code lodges returns, tracks their status (overall and per line item), and — when the merchant offers store credit — lets the shopper accept it or ask for a refund instead. There is no approve/refund method here by design; those are merchant actions.

Store credit is the one resolution the shopper must agree to: an offer arrives as `credit_offer.status === 'pending'`, the shopper accepts (balance is theirs to spend) or declines (merchant arranges a refund directly). Accepted credit is a redeemable balance you read with `getStoreCredit` and spend at checkout via `orders.createOrder({ apply_store_credit: true })`.

The reason list needs only an API key; lodging, listing, getting, and the store-credit actions additionally need a customer session token (`xAuthToken`, or `xExternalAuth` for bring-your-own-auth).

```typescript
const client = new Tybrite({ apiKey: 'tybrite_pk_live_YOUR_API_KEY' });

// Build the reason dropdown (no customer session needed)
const { data: reasons } = await client.returns.listReturnReasons();

// Lodge a return for the signed-in customer's order
const customerToken = 'CUSTOMER_SESSION_TOKEN'; // from client.authentication.login(...)
const { data: lodged } = await client.returns.createReturn({
  xAuthToken: customerToken,
  requestBody: {
    order_id: '770a0622-0401-63f6-c938-557766551111',
    reason_code: 'damaged',
    return_type: 'full_refund',
    items: [
      {
        order_item_id: '9c4f1d2e-aaaa-bbbb-cccc-1234567890ab',
        quantity: 1,
        condition: 'damaged',
        media: ['https://cdn.example.com/return-photo-1.jpg'],
      },
    ],
  },
});

// Track the customer's returns
const { data: myReturns } = await client.returns.listReturns({
  xAuthToken: customerToken,
  status: 'pending',
});
const detail = await client.returns.getReturn({ id: lodged.id, xAuthToken: customerToken });

// If the merchant offered store credit (detail.data.credit_offer.status === 'pending'),
// the shopper either accepts it or asks for a refund instead:
await client.returns.acceptReturnCredit({ id: lodged.id, xAuthToken: customerToken });
// or: await client.returns.requestReturnRefund({ id: lodged.id, xAuthToken: customerToken });

// Their redeemable balance, and spending it at checkout:
const { data: credit } = await client.returns.getStoreCredit({ xAuthToken: customerToken });
const result = await client.orders.createOrder({
  idempotencyKey: `order-${Date.now()}`,
  xTimestamp: Math.floor(Date.now() / 1000),
  xSignature: hmacSignature,
  requestBody: {
    customer_id: gcCustomerId,
    customer_email: 'jane@example.com',
    customer_name: 'Jane Doe',
    billing_address: addr, shipping_address: addr,
    subtotal: 5000, total_amount: 5000, payment_method: 'card',
    items: [{ product_id: 'product-uuid', quantity: 1, unit_price: 5000, total_price: 5000 }],
    apply_store_credit: true, // spend the customer's balance; capped at the total
  },
});
console.log(result.store_credit_applied); // how much credit was applied
```

## Resources

- **Product:** [gc.tybritelabs.com](https://gc.tybritelabs.com)
- **Documentation:** [docs.tybritelabs.com](https://docs.tybritelabs.com) — [API Reference](https://docs.tybritelabs.com/api-reference/introduction) · [SDK Reference](https://docs.tybritelabs.com/sdk/introduction) · [Workflow Examples](https://docs.tybritelabs.com/workflows/introduction)

## License

MIT © Tybrite Labs
