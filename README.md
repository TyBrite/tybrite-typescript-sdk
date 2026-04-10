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
- **🖼️ Rich Media**: Native support for multiple images, videos, and thumbnails.
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
  fields: 'id,name,price,media' // Field filtering for performance
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

- **`taxonomy`**: Manage categories and subcategories.
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
- **`cms`**: Shoppable content management (Blog posts, Lookbooks).
- **`messaging`**: Real-time customer support messaging with thread management (pin/mute/archive).
- **`system`**: Platform health checks and configuration.

## Advanced Usage

### Field Filtering
Reduce payload size by requesting only specific fields.

```typescript
const product = await client.products.getProduct({
  id: 'prod_123',
  fields: 'id,name,sku,media,price,attributes.color'
});
```

### AI-Driven Development (Store Context)
For AI agents and agentic workflows, use `getStoreInfo` to retrieve the entire store configuration, catalog overview, and active features in a single call.

```typescript
// Perfect for seeding AI context or agentic workflows
const storeContext = await client.system.getStoreInfo({
  sections: 'catalog,features,pricing,promotions' 
});

console.log(`Store: ${storeContext.store.name}`);
console.log(`Active Features:`, storeContext.features);
```

### Taxonomy & Discovery
Retrieve the hierarchical structure of your store and curated product collections.

```typescript
// Fetch categories with images
const { categories } = await client.taxonomy.listCategories({
  fields: 'id,name,image'
});

// Fetch curated collections (e.g., Summer Essentials)
const { collections } = await client.products.listProductCollections({
  showOnHomepage: 'true'
});
```

### AI Product Recommendations
Boost conversion by showing personalized suggestions or "similar products".

```typescript
const { products } = await client.recommendations.getRecommendations({
  requestBody: {
    type: 'similar',
    productId: 'prod_123',
    limit: 4
  }
});
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
Orders and payments require HMAC-SHA256 signatures for security (prevents tampering and replay attacks).

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

### Anonymous Carts
Handle carts for users who haven't logged in yet using `X-Session-Id`.

```typescript
// Add item to anonymous cart
await client.cartWishlist.addToCart({
  requestBody: {
    product_id: 'prod_abc',
    quantity: 1
  },
  xSessionId: 'session_uuid_generated_on_client'
});
```

## License

Proprietary - Tybrite Labs
