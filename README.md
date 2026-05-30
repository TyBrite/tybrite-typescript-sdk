# @tybrite-labs/sdk

**Galactic Core — The Programmable Commerce Platform**

Official TypeScript SDK for the Tybrite Galactic Core API.

Galactic Core is the programmable interface layer that transforms GalacticOS into a globally accessible Headless Commerce Backend-as-a-Service (BaaS) through clean, versioned REST APIs and real-time webhooks.

## Features

- **🚀 Headless Commerce**: Full control over your frontend with a robust backend.
- **🌍 Global by Design**: Multi-currency, multi-store, and edge-optimized (10-50ms latency).
- **🧠 AI-Powered**: Built-in semantic search and product recommendations.
- **📦 Complete Lifecycle**: interconnected Inventory, Orders, Customers, and Accounting.
- **🔒 Enterprise Security**: Role-based access, double-entry accounting, and audit trails.
- **⚡ Developer First**: Fully typed SDK, automatic retries using idempotency, and field filtering.

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
  apiKey: 'tybrite_sk_live_YOUR_API_KEY', 
});

// fetch products
const { products } = await client.products.listProducts({
  limit: 10,
  fields: 'product_id,name,price,image,thumbnail_url' // Field filtering for performance
});

console.log(products);
```

## Authentication

The API uses **Bearer Authentication**. Your API key determines your environment (Test vs. Live) and permissions.

### Key Types

| Key Type | Prefix | Access | Scope |
|----------|--------|--------|-------|
| **Secret Key** | `tybrite_sk_...` | **Read/Write** | Server-side only. Required for Orders, Customer creation, Payments, Recommendations, Authentication, Review moderation, and Webhook management. |
| **Publishable Key** | `tybrite_pk_...` | **Read + storefront writes** | Client-side safe. Use for catalog, pricing, search, taxonomy, CMS, shipping quotes, gift-card lookups, promotions, and customer-facing cart/wishlist and review submission. |

> Both key prefixes encode the environment: `_live_` keys read/write production data, `_test_` keys read/write isolated sandbox data. Every authenticated response returns a `Tybrite-Environment: production|sandbox` header confirming which one resolved.

Publishable keys are blocked (`403 forbidden`) from secret-key-only operations such as reading or writing orders, initializing/verifying payments, creating customers, requesting AI recommendations, all authentication writes, review moderation, and webhook management. Cart and wishlist writes are intentionally allowed with publishable keys because they originate in the browser.

## Service Reference

The SDK is organized into services matching the API resources. Access them via the client instance (e.g., `client.products`).

- **`products`**: Manage catalog, collections and specifications.
- **`orders`**: Create, track, and manage orders with automatic inventory sync.
- **`customers`**: Customer profiles, RFM analytics, and account management.
- **`authentication`**: Customer login, registration, and session management.
- **`cartWishlist`**: Unified interface for shopping carts and wishlists.
- **`search`**: Semantic (vector-based) and keyword search functionality.
- **`recommendations`**: AI-driven "You might also like" and personalized suggestions.
- **`payments`**: Payment processing (Stripe, Mobile Money) and verification.
- **`pricing`**: Dynamic pricing engine and discount rule resolution.
- **`promotions`**: Manage marketing campaigns, coupons, and discounts.
- **`giftCards`**: Gift card redemption, and balance tracking.
- **`shipping`**: Shipping zone management and delivery cost calculation.
- **`taxonomy`**: Manage categories and subcategories.
- **`cms`**: Shoppable content management (Blog posts, Lookbooks).
- **`messaging`**: Real-time customer support messaging.
- **`reviews`**: Product reviews — submit, list, moderate, and mark helpful.
- **`webhooks`**: Register webhook endpoints and inspect, test, and retry delivery events.
- **`gcConnect`**: "Connect your GC Store" authorization flow for third-party apps (consent, token exchange, session management).
- **`system`**: Platform health checks and configuration.

## API Reference by Service

Every operation the SDK exposes is listed below with a runnable example. Storefront/read operations work with a publishable key; operations marked **(secret key)** must run server-side.

### Storefront — Catalog & Discovery

#### `products`
```typescript
// List products (cursor-paginated)
const { products, pagination } = await client.products.listProducts({
  limit: 20,
  search: 'jacket',
  categoryId: 'cat_uuid',
  fields: 'product_id,name,price,thumbnail_url'
});

// Get a single product by id (UUID) or by slug
const product = await client.products.getProduct({ id: 'product_uuid' });
const bySlug = await client.products.getProductBySlug({ slug: 'merino-wool-jacket' });

// Product specifications
const { specifications } = await client.products.listProductSpecifications({ productId: 'product_uuid' });
const latestSpec = await client.products.getProductSpecifications({ id: 'product_uuid' });

// Collections
const { collections } = await client.products.listProductCollections({ showOnHomepage: 'true' });
const collection = await client.products.getProductCollection({ id: 'collection_uuid' });
const { items } = await client.products.getProductCollectionItems({ id: 'collection_uuid' });
```

#### `pricing`
```typescript
// Resolve live, currency-aware prices. Pass a location (coordinates or place name)
// and/or a customer to apply dynamic pricing rules and currency conversion.
const { products, pricing_context } = await client.pricing.getProductPrices({
  placeName: 'London, UK',
  customerId: 'customer_uuid',
  quantity: 2,
  limit: 20
});

const priced = await client.pricing.getProductPrice({ id: 'product_uuid', region: 'US' });
const pricedBySlug = await client.pricing.getProductPriceBySlug({ slug: 'merino-wool-jacket' });
```

#### `taxonomy`
```typescript
// Categories
const { categories } = await client.taxonomy.listCategories({ limit: 50 });
const category = await client.taxonomy.getCategory({ id: 'category_uuid' });

// Subcategories support arbitrary nesting via parent_id.
// Flat list, filtered to a category:
const { subcategories } = await client.taxonomy.listSubcategories({ categoryId: 'category_uuid' });

// Only top-level subcategories:
const roots = await client.taxonomy.listSubcategories({ rootOnly: true });

// Full nested hierarchy in one call (not paginated):
const treeResponse = await client.taxonomy.listSubcategories({ tree: true });

// A single subcategory with its breadcrumb chain and direct children:
const sub = await client.taxonomy.getSubcategory({
  id: 'subcategory_uuid',
  include: 'ancestors,children'
});
```

#### `search`
```typescript
// Fast keyword search (GET)
const textResults = await client.search.searchProducts({ q: 'running shoes', limit: 20 });

// Natural-language semantic search (POST, still read-only / pk-safe)
const semantic = await client.search.semanticSearch({
  requestBody: { query: 'lightweight waterproof jacket for hiking', limit: 20, minScore: 0.3 }
});
// Results contain { productId, score } — hydrate details via client.products.getProduct.
```

#### `recommendations` (secret key)
```typescript
// types: 'similar' | 'also-bought' | 'trending' | 'personalized' | 'bundle'
const similar = await client.recommendations.getRecommendations({
  requestBody: { type: 'similar', productId: 'product_uuid', limit: 10 }
});

const forYou = await client.recommendations.getRecommendations({
  requestBody: { type: 'personalized', customerId: 'customer_uuid' }
});
```

#### `promotions`
```typescript
const { promotions } = await client.promotions.listPromotions({ status: 'active', cartTotal: '120.00' });
const promotion = await client.promotions.getPromotion({ id: 'promotion_uuid' });
```

#### `giftCards`
```typescript
// Check a gift card by code (the code is the secret — no customer auth needed)
const balance = await client.giftCards.checkGiftCard({ code: 'V5G6-4N7H-9P2R-8W1S' });

// List a customer's gift cards (requires the customer's session token)
const { gift_cards } = await client.giftCards.listGiftCards({
  customerId: 'customer_uuid',
  xAuthToken: customerAccessToken
});
```

#### `shipping`
```typescript
const { pricing_tiers, delivery_zones } = await client.shipping.getShippingZones();

// Quote a delivery fee by coordinates OR place name (read-only / pk-safe)
const quote = await client.shipping.calculateShipping({
  requestBody: { place_name: 'Westlands, Nairobi, Kenya', order_total: 50 }
});
```

#### `cms`
```typescript
const { posts } = await client.cms.listPosts({ category: 'guides', limit: 20 });
const post = await client.cms.getPost({ slug: 'how-to-layer-for-winter' });

const { lookbooks } = await client.cms.listLookbooks({ limit: 20 });
const lookbook = await client.cms.getLookbook({ slug: 'autumn-edit' });
```

#### `reviews`
```typescript
// List approved reviews + aggregate summary (product_id required)
const { reviews, summary } = await client.reviews.listReviews({ productId: 'product_uuid', limit: 10 });
const review = await client.reviews.getReview({ id: 'review_uuid' });

// Submit a review — requires the customer's session token. Starts as 'pending'.
await client.reviews.submitReview({
  xAuthToken: customerAccessToken,
  requestBody: { product_id: 'product_uuid', rating: 5, title: 'Excellent', body: 'Exactly as described.' }
});

// Anonymous helpful vote (review must be approved)
await client.reviews.markReviewHelpful({ id: 'review_uuid' });

// Merchant moderation + deletion (secret key)
await client.reviews.moderateReview({ id: 'review_uuid', requestBody: { status: 'approved' } });
await client.reviews.deleteReview({ id: 'review_uuid' });
```

### Storefront — Cart & Wishlist

All cart/wishlist operations work with a publishable key. Anonymous carts use the `X-Session-Id` header; customer-owned carts and all wishlist operations require the matching customer session token (`x-auth-token`).

```typescript
// --- Cart ---
const cart = await client.cartWishlist.getCart({ xSessionId: 'session_uuid' });

await client.cartWishlist.addToCart({
  xSessionId: 'session_uuid',
  requestBody: { variant_id: 'variant_uuid', quantity: 1 }
});

await client.cartWishlist.updateCartItem({
  id: 'cart_item_uuid',
  xSessionId: 'session_uuid',
  requestBody: { quantity: 3 } // quantity: 0 removes the item
});

await client.cartWishlist.removeCartItem({ id: 'cart_item_uuid', xSessionId: 'session_uuid' });
await client.cartWishlist.clearCart({ xSessionId: 'session_uuid' });

// Merge an anonymous cart into a customer account after login
await client.cartWishlist.mergeCart({
  xAuthToken: customerAccessToken,
  requestBody: { session_id: 'session_uuid', customer_id: 'customer_uuid' }
});

// --- Wishlist (always customer-scoped) ---
const wishlist = await client.cartWishlist.getWishlist({
  customerId: 'customer_uuid',
  xAuthToken: customerAccessToken
});

await client.cartWishlist.addToWishlist({
  xAuthToken: customerAccessToken,
  requestBody: { variant_id: 'variant_uuid', customer_id: 'customer_uuid' }
});

await client.cartWishlist.moveWishlistToCart({
  xAuthToken: customerAccessToken,
  requestBody: { wishlist_item_id: 'wishlist_item_uuid', customer_id: 'customer_uuid', quantity: 1 }
});

await client.cartWishlist.removeFromWishlist({
  id: 'wishlist_item_uuid',
  customerId: 'customer_uuid',
  xAuthToken: customerAccessToken
});
```

### Customer Accounts

#### `authentication`
```typescript
const registered = await client.authentication.register({
  requestBody: { email: 'shopper@example.com', password: '••••••••', name: 'Sam Shopper' }
});

const { session, customer } = await client.authentication.login({
  requestBody: { email: 'shopper@example.com', password: '••••••••' }
});

// Passwordless
await client.authentication.sendMagicLink({ requestBody: { email: 'shopper@example.com' } });
const verified = await client.authentication.verifyOtp({
  requestBody: { email: 'shopper@example.com', token: '123456' }
});

// Password lifecycle
await client.authentication.resetPassword({ requestBody: { email: 'shopper@example.com' } });
await client.authentication.updatePassword({
  xAuthToken: session.access_token,
  requestBody: { password: 'new-password' }
});

// Session lifecycle
const refreshed = await client.authentication.refreshToken({
  requestBody: { refresh_token: session.refresh_token }
});
const me = await client.authentication.getCurrentUser({ xAuthToken: session.access_token });
await client.authentication.logout();
```

#### `customers`
```typescript
// Create a customer (secret key). external_id maps your upstream identity-provider user.
const { customer } = await client.customers.createCustomer({
  requestBody: { email: 'shopper@example.com', name: 'Sam Shopper', external_id: 'auth0|abc123' }
});

// Read / update the customer's own profile (customer session token required)
const profile = await client.customers.getCustomer({ id: 'customer_uuid', xAuthToken: customerAccessToken });
await client.customers.updateCustomer({
  id: 'customer_uuid',
  xAuthToken: customerAccessToken,
  requestBody: { phone: '+15551234567' }
});
```

#### `messaging`
Every messaging operation requires the customer's session token (`x-auth-token`) and is scoped to that customer's own threads.
```typescript
// Start a conversation
const { thread } = await client.messaging.createConversation({
  xAuthToken: customerAccessToken,
  requestBody: {
    customer_name: 'Sam Shopper',
    customer_email: 'shopper@example.com',
    subject: 'Where is my order?',
    message: 'Hi, can you share a tracking update?',
    customer_id: 'customer_uuid'
  }
});

// List threads + read messages
const { threads } = await client.messaging.listThreads({ xAuthToken: customerAccessToken, customerId: 'customer_uuid' });
const { messages } = await client.messaging.getThreadMessages({ xAuthToken: customerAccessToken, id: thread.id });

// Reply, mark read, edit, delete
await client.messaging.sendMessage({ xAuthToken: customerAccessToken, id: thread.id, requestBody: { message: 'Thanks!' } });
await client.messaging.markThreadRead({ xAuthToken: customerAccessToken, id: thread.id });
await client.messaging.updateThread({ xAuthToken: customerAccessToken, id: thread.id, requestBody: { status: 'closed' } });
```

### Server-side — Orders & Payments

#### `orders` (secret key)
`createOrder` and `updateOrder` require an `Idempotency-Key` plus an HMAC signature (`X-Timestamp` / `X-Signature`) — see the HMAC and Idempotency sections above.

`updateOrder` updates fulfillment or payment status and accepts `payment_status`, `order_status`, `notes`, `tracking_number`, `estimated_delivery`, `shipped_at`, and `delivered_at`.
- **Idempotency:** use a unique key for each distinct update (e.g. `update-payment-{order_id}-{timestamp}`).
- **Protection:** this prevents double-triggering side effects like accounting entries or inventory reduction on network retries — and lets the SDK auto-retry the call safely. Moving `payment_status` to `paid` is what triggers automatic accounting and inventory reduction.
```typescript
const created = await client.orders.createOrder({
  idempotencyKey: 'order-2026-05-30-abc123',
  xTimestamp: timestamp,
  xSignature: signature,
  requestBody: {
    payment_method: 'stripe',
    total_amount: 100,
    items: [{ product_id: 'product_uuid', quantity: 1, unit_price: 100, total_price: 100 }]
  }
});

const { orders } = await client.orders.listOrders({ orderStatus: 'processing', limit: 50 });
const order = await client.orders.getOrder({ id: 'order_uuid' });

const updated = await client.orders.updateOrder({
  id: 'order-uuid-here',
  idempotencyKey: `update-status-${orderId}-${Date.now()}`,
  xTimestamp: Math.floor(Date.now() / 1000),
  xSignature: signature,
  requestBody: {
    payment_status: 'paid', // Triggers auto-accounting & inventory reduction
    order_status: 'shipped',
    tracking_number: 'CARGO-123-ABC'
  }
});
```

#### `payments`
```typescript
// Available methods (publishable key OK)
const { methods } = await client.payments.getPaymentMethods();

// Initialize a payment (secret key + Idempotency-Key + HMAC signature)
const init = await client.payments.initializePayment({
  idempotencyKey: 'payment-1730000000-abc',
  xTimestamp: timestamp,
  xSignature: signature,
  requestBody: { provider: 'stripe', amount: 100, currency: 'usd', email: 'shopper@example.com' }
});

// Verify status after the customer completes payment (secret key)
const result = await client.payments.verifyPayment({
  requestBody: { provider: 'stripe', reference: init.reference }
});
```

### Platform & Integrations

#### `webhooks` (secret key)
```typescript
// Register an endpoint. url must be https; events is a non-empty list (or ['*'] for all).
const { webhook_endpoint } = await client.webhooks.createWebhookEndpoint({
  requestBody: { url: 'https://example.com/webhooks/tybrite', events: ['order.created', 'payment.succeeded'] }
});
// webhook_endpoint.signing_secret is returned once on creation — store it to verify signatures.

const { webhook_endpoints } = await client.webhooks.listWebhookEndpoints({ limit: 50 });
const endpoint = await client.webhooks.getWebhookEndpoint({ id: webhook_endpoint.id });
await client.webhooks.updateWebhookEndpoint({ id: webhook_endpoint.id, requestBody: { enabled: false } });
await client.webhooks.deleteWebhookEndpoint({ id: webhook_endpoint.id });

// Send a test event to verify your handler
await client.webhooks.sendTestWebhookEvent({ id: webhook_endpoint.id });

// Inspect the delivery log and retry a failed event
const { webhook_events } = await client.webhooks.listWebhookEvents({ limit: 50 });
const event = await client.webhooks.getWebhookEvent({ id: webhook_events[0].id });
await client.webhooks.retryWebhookEvent({ id: webhook_events[0].id });
```

Each delivery is signed with the endpoint's signing secret. Verify it on your server:
```typescript
// Header: X-Tybrite-Signature: t=<timestamp>,v1=<hex_hmac_sha256>
import crypto from 'crypto';
function isValid(rawBody: string, header: string, signingSecret: string): boolean {
  const parts = Object.fromEntries(header.split(',').map(kv => kv.split('=')));
  const expected = crypto.createHmac('sha256', signingSecret)
    .update(`${parts.t}.${rawBody}`)
    .digest('hex');
  return expected === parts.v1;
}
```

Supported event types include `order.*` (`created`, `paid`, `fulfilled`, `cancelled`, `refunded`, `updated`), `payment.*` (`succeeded`, `failed`, `refunded`), `customer.*` (`created`, `updated`, `deleted`), `product.*` (`created`, `updated`, `stock_low`, `out_of_stock`), `cart.*` (`created`, `updated`, `abandoned`), `gift_card.*` (`issued`, `redeemed`, `expired`), and `promotion.applied`.

#### `gcConnect`
"Connect your GC Store" lets a third-party app obtain a scoped key pair for a merchant via an authorization-code flow (the app never handles raw keys).
```typescript
// 1. Validate the authorization request and render your consent screen (public)
const authInfo = await client.gcConnect.getConnectAuthorize({
  clientId: 'your_client_id',
  redirectUri: 'https://yourapp.com/callback',
  scope: 'read write orders:read',
  state: 'csrf_token',
  environment: 'production'
});

// 2. Exchange the one-time code from the callback for API keys (server-side)
const tokens = await client.gcConnect.connectToken({
  requestBody: {
    code: 'authorization_code',
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    redirect_uri: 'https://yourapp.com/callback'
  }
});
// tokens => { sk, pk, pair_id, store_id, environment, scopes, client_id }

// Revoke a connection
await client.gcConnect.connectRevoke({
  requestBody: { pair_id: tokens.pair_id, client_id: 'your_client_id', client_secret: 'your_client_secret' }
});

// A merchant lists their active tool connections (secret key)
const { sessions } = await client.gcConnect.listConnectSessions();
```

#### `system`
```typescript
const info = await client.system.getApiInfo();   // no auth required
const health = await client.system.healthCheck(); // no auth required

// One-call store snapshot for AI agents / setup wizards. Request only the sections you need.
const { store, features } = await client.system.getStoreInfo({ sections: 'features,payments' });
```

## Advanced Usage

### Field Filtering
Reduce payload size by requesting only specific fields.

```typescript
const product = await client.products.getProduct({
  id: 'prod_123',
  fields: 'product_id,name,sku,media,price,attributes.color'
});
```

Field names are validated — requesting an unknown field returns `400 invalid_request` listing the offending names. For products, the identifier field is `product_id` (not `id`), images are exposed as `image` (primary URL), `thumbnail_url`, and the `media` array, and nested attributes use dot notation (`attributes.color`).

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
An `Idempotency-Key` is **required** on order creation, order updates, and payment initialization, and prevents duplicate processing during network failures. Retrying with the same key returns the original result instead of creating a duplicate. Use a unique key per distinct operation.

```typescript
// Creating an order
const order = await client.orders.createOrder({
  idempotencyKey: 'order-2026-02-16-xyz789', // Unique per order creation
  requestBody: { ... },
});

// Updating an order (requires different key)
const updated = await client.orders.updateOrder({
  id: order.id,
  idempotencyKey: '*********************************', // Unique per update operation
  requestBody: { payment_status: 'paid' },
});
```

### HMAC Signature Verification
HMAC-SHA256 request signatures are **required** on `createOrder`, `updateOrder`, and `initializePayment` (prevents tampering and replay attacks). These three operations reject unsigned or invalidly-signed requests. Other endpoints do not require a signature.

```typescript
import crypto from 'crypto';

// Example 1: Creating an order
const timestamp = Math.floor(Date.now() / 1000);
const orderBody = JSON.stringify({
  customer_id: 'cust_123',
  payment_method: 'stripe',
  items: [{ product_id: 'prod_abc', quantity: 1, unit_price: 100, total_price: 100 }],
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

### Anonymous Carts
Handle carts for users who haven't logged in yet using `X-Session-Id`.

```typescript
// Add item to anonymous cart (variant_id identifies which variant to add)
await client.cartWishlist.addToCart({
  requestBody: {
    variant_id: '83b6a47e-4f5c-4090-b8d3-4b606b78f1b4',
    quantity: 1
  },
  xSessionId: 'session_uuid_generated_on_client'
});
```

### Customer Sessions
Customer-facing endpoints that act on a specific shopper's data — `authentication.getCurrentUser`, all `messaging` operations, and review submission — require the customer's session token in the `x-auth-token` header. You obtain it from the `session.access_token` returned by `authentication.login`, `register`, or `verifyOtp`. This is separate from your API key: the API key authenticates your store, the `x-auth-token` authenticates the end customer.

```typescript
const { session } = await client.authentication.login({
  requestBody: { email: 'shopper@example.com', password: '••••••••' }
});

const me = await client.authentication.getCurrentUser({ xAuthToken: session.access_token });
```

## License

Proprietary - Tybrite Labs
