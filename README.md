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
- **`system`**: Platform health checks and configuration.

## Advanced Usage

### Field Filtering
Reduce payload size by requesting only specific fields.

```typescript
const product = await client.products.getProduct({
  id: 'prod_123',
  fields: 'id,name,sku,images,price,attributes.color'
});
```

### Idempotency (Safe Retries)
Prevent duplicate orders during network failures by providing a detailed `Idempotency-Key`.

```typescript
const order = await client.orders.createOrder({
  idempotencyKey: 'order-2026-02-16-xyz789', // Unique key per operation
  requestBody: { ... },
});
```

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
