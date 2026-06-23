/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from '../models/Order';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrdersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List orders
     * Retrieve a paginated list of orders for the store, newest first.
     *
     * The list view returns order headers **without line items** for efficiency —
     * fetch `GET /v1/orders/{id}` for the full order including its items.
     *
     * **Key Type Support:**
     * - ✅ Secret keys (full access)
     * - ❌ Publishable keys (forbidden — returns 403)
     *
     * Supports cursor pagination (`limit` + `cursor`) and optional filters by
     * `payment_status`, `order_status`, and `customer_id`.
     *
     * @returns any Paginated list of orders (newest first)
     * @throws ApiError
     */
    public listOrders({
        limit = 50,
        cursor,
        paymentStatus,
        orderStatus,
        customerId,
        fields,
    }: {
        /**
         * Maximum number of orders to return (1–200, default 50)
         */
        limit?: number,
        /**
         * Opaque pagination cursor returned as `pagination.next_cursor` from a prior call
         */
        cursor?: string,
        /**
         * Filter by payment status
         */
        paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded',
        /**
         * Filter by order fulfillment status
         */
        orderStatus?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
        /**
         * Filter to orders for a specific customer
         */
        customerId?: string,
        /**
         * Comma-separated list of fields to include per order. Same allowed fields
         * as `GET /v1/orders/{id}` (excluding `items`, which is not returned in list view).
         *
         */
        fields?: string,
    }): CancelablePromise<{
        orders?: Array<Order>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/orders',
            query: {
                'limit': limit,
                'cursor': cursor,
                'payment_status': paymentStatus,
                'order_status': orderStatus,
                'customer_id': customerId,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create order
     * Create a new order with HMAC signature verification and idempotency protection.
     *
     * **🔐 HMAC Signing (REQUIRED)**
     *
     * All order creation requests MUST include HMAC-SHA256 signature for security:
     *
     * 1. **Generate Timestamp**: Get current Unix timestamp in seconds
     * 2. **Create Payload**: Concatenate `timestamp + "." + JSON_body`
     * 3. **Sign Payload**: `HMAC-SHA256(hmac_secret, payload)` → base64 encode
     * 4. **Include Headers**:
     * - `X-Timestamp`: Unix timestamp (must be within 5 minutes)
     * - `X-Signature`: Base64-encoded HMAC signature
     *
     * **Example (Node.js):**
     *
     * **🔄 Idempotency Protection**
     *
     * Include `Idempotency-Key` header to prevent duplicate orders on retry.
     * If the same key is used, the original order is returned (not counted against rate limit).
     *
     * **⚠️ Security Notes:**
     * - HMAC secret is displayed in Settings → Integration Settings
     * - Never expose HMAC secret in client-side code
     * - Regenerate secret immediately if compromised
     * - Requests with invalid/missing signatures return 401 Unauthorized
     * - Timestamps older than 5 minutes are rejected to prevent replay attacks
     *
     * **🛡️ Server-side price validation (anti-tampering)**
     *
     * HMAC proves the body wasn't altered in transit; it does **not** prove the amounts are honest.
     * So the server independently recomputes the order from authoritative data and rejects any
     * mismatch — you cannot set your own prices or discounts:
     *
     * - **Item prices** are recomputed from the live catalog. `unit_price` / `total_price` that don't
     * match the catalog price → **`400 price_mismatch`**. (The stored order always uses the catalog
     * price, never the value you send.)
     * - **`subtotal`, `tax_amount`, `total_amount`** must reconcile to `subtotal + tax + shipping −
     * discount` over those catalog prices → otherwise **`400 price_mismatch`**.
     * - **`discount_amount`** is validated against the discount the promotions / gift card you claim
     * actually grant (computed server-side from `promotion_usages` + `gift_card_redemption`). A
     * `discount_amount` greater than that legitimate maximum → **`400 discount_invalid`**. A discount
     * with no real promotion/gift card behind it → max is `0`. (You may apply *less* than the maximum.)
     * - **`shipping_amount`** may not be negative → **`400 price_mismatch`**.
     *
     * In short: send the **real catalog prices** and the **actual promotions/gift card** the shopper is
     * entitled to. Don't compute or invent prices/discounts client-side — the server is the authority.
     *
     * @returns any Order created successfully (or existing order returned if idempotency key matches)
     * @throws ApiError
     */
    public createOrder({
        idempotencyKey,
        xTimestamp,
        xSignature,
        requestBody,
    }: {
        /**
         * Unique key to prevent duplicate orders (e.g., order-{timestamp}-{random})
         */
        idempotencyKey: string,
        /**
         * Unix timestamp in seconds (current time). Must be within 5 minutes of server time.
         * Used to prevent replay attacks.
         *
         */
        xTimestamp: number,
        /**
         * HMAC-SHA256 signature of the payload (timestamp + "." + request_body), base64-encoded.
         * Sign using your HMAC secret from Settings → Integration Settings.
         *
         */
        xSignature: string,
        requestBody: {
            /**
             * Customer UUID (optional - guest checkout supported)
             */
            customer_id?: string;
            /**
             * Customer email address. Required.
             */
            customer_email: string;
            /**
             * Customer full name. Required.
             */
            customer_name: string;
            /**
             * Customer phone number (optional)
             */
            customer_phone?: string;
            /**
             * Billing address. Required.
             */
            billing_address: {
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
                country?: string;
            };
            /**
             * Shipping address. Required.
             */
            shipping_address: {
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
                country?: string;
            };
            /**
             * Order line items (at least one required)
             */
            items: Array<{
                /**
                 * Variant (SKU) UUID. Preferred. Identifies the exact variant to order. If omitted, the product's default variant is used.
                 */
                variant_id?: string;
                /**
                 * Product UUID. Optional when `variant_id` is given (it is resolved from the variant); when sent alone, the product's default variant is ordered.
                 */
                product_id?: string;
                /**
                 * Product name captured on the line item. Optional — if omitted, it is resolved from the product automatically.
                 */
                product_name?: string;
                /**
                 * Product SKU
                 */
                product_sku?: string;
                /**
                 * Quantity to order
                 */
                quantity?: number;
                /**
                 * Price per unit at time of order
                 */
                unit_price?: number;
                /**
                 * Total price for this line item (quantity × unit_price)
                 */
                total_price?: number;
                /**
                 * Product variant options (e.g., color, size)
                 */
                product_options?: any | null;
            }>;
            /**
             * Payment method identifier (required)
             */
            payment_method: 'card' | 'stripe' | 'paypal' | 'paystack' | 'mpesa' | 'cash';
            /**
             * Payment status (defaults to pending)
             */
            payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
            /**
             * Order fulfillment status (defaults to pending)
             */
            order_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
            /**
             * Subtotal before tax and shipping. Required.
             */
            subtotal: number;
            /**
             * Tax amount
             */
            tax_amount?: number;
            /**
             * Shipping cost
             */
            shipping_amount?: number;
            /**
             * Discount amount
             */
            discount_amount?: number;
            /**
             * Total order amount (required)
             */
            total_amount: number;
            /**
             * Additional order notes
             */
            notes?: string;
            /**
             * Shipping tracking number (optional, usually set on PATCH)
             */
            tracking_number?: string;
            /**
             * Estimated delivery date and time (optional)
             */
            estimated_delivery?: string;
            /**
             * External payment reference (e.g., Stripe charge ID, M-Pesa receipt)
             */
            payment_reference?: string;
            /**
             * Shipping calculation details from /v1/shipping/calculate for audit trail
             */
            shipping_metadata?: any | null;
            /**
             * Optional gift card to redeem towards this order
             */
            gift_card_redemption?: any | null;
            /**
             * Promotion usages applied to this order (tracked when payment_status is paid)
             */
            promotion_usages?: any[] | null;
            /**
             * Apply the customer's redeemable store credit to this order. When
             * true (and the order has a `customer_id`), store credit is spent
             * against the order total, capped at the total. The amount actually
             * applied is returned as `store_credit_applied`. Requires a customer.
             *
             */
            apply_store_credit?: boolean;
            /**
             * Optional cap on how much store credit to apply. When omitted (and
             * `apply_store_credit` is true) up to the full order total is applied.
             * The applied amount never exceeds the available balance or the total.
             *
             */
            store_credit_amount?: number;
        },
    }): CancelablePromise<{
        order: Order;
        /**
         * Present only when store credit was applied to this order. The
         * amount of the customer's store credit spent against the order.
         *
         */
        store_credit_applied?: number;
        /**
         * Optional. Present only when one or more post-order processing
         * steps (gift card redemption, stock reduction, etc.) failed.
         * The order itself was created successfully, but a downstream
         * side effect needs human follow-up. Each warning indicates the
         * stage that failed and a human-readable message.
         *
         */
        post_processing_warnings?: Array<{
            /**
             * The post-processing stage that emitted the warning
             */
            stage: string;
            /**
             * Human-readable description of the failure
             */
            message: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/orders',
            headers: {
                'Idempotency-Key': idempotencyKey,
                'X-Timestamp': xTimestamp,
                'X-Signature': xSignature,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request (missing required fields, invalid data)`,
                401: `Unauthorized - Invalid or missing authentication credentials, or HMAC signature verification failed`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get order details
     * Retrieve detailed information about a specific order including line items and status.
     *
     * **HMAC Signature Verification (Optional)**
     *
     * For enhanced security, you can verify the authenticity of order data using HMAC signatures.
     * When enabled, the response includes an `X-Signature` header containing an HMAC-SHA256 signature
     * of the response body.
     *
     * To verify:
     * 1. Extract the `X-Signature` header from the response
     * 2. Compute HMAC-SHA256 of the response body using your API secret key
     * 3. Compare the computed signature with the header value
     *
     * Example verification (Node.js):
     *
     * @returns Order Successfully retrieved order
     * @throws ApiError
     */
    public getOrder({
        id = '880e8400-e29b-41d4-a716-446655440003',
        fields,
    }: {
        /**
         * Order UUID
         */
        id?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `order_number`, `customer_id`, `customer_email`, `customer_phone`, `customer_name`
         * - `billing_address`, `shipping_address`
         * - `subtotal`, `tax_amount`, `shipping_amount`, `discount_amount`, `total_amount`
         * - `payment_method`, `payment_status`, `order_status`, `payment_reference`
         * - `notes`, `tracking_number`, `estimated_delivery`
         * - `shipped_at`, `delivered_at`
         * - `created_at`, `updated_at`
         * - `shipping_metadata`
         * - `items`
         *
         */
        fields?: string,
    }): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/orders/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update order
     * Update specific fields of an existing order with HMAC signature verification and idempotency protection.
     *
     * **🔐 HMAC Signing (REQUIRED)**
     *
     * All order update requests MUST include HMAC-SHA256 signature:
     *
     * 1. **Generate Timestamp**: Get current Unix timestamp in seconds
     * 2. **Create Payload**: Concatenate `timestamp + "." + JSON_body`
     * 3. **Sign Payload**: `HMAC-SHA256(hmac_secret, payload)` → base64 encode
     * 4. **Include Headers**:
     * - `X-Timestamp`: Unix timestamp (must be within 5 minutes)
     * - `X-Signature`: Base64-encoded HMAC signature
     *
     * **🔄 Idempotency Protection**
     *
     * Include `Idempotency-Key` header to prevent duplicate updates on retry.
     * Each PATCH operation is tracked separately - if you retry with the same key,
     * the original order state is returned without re-processing side effects.
     *
     * **Important:** Use a unique idempotency key for each distinct update operation.
     * - ✅ Good: `update-shipping-{order_id}-{timestamp}`, `mark-paid-{order_id}-{timestamp}`
     * - ❌ Bad: Reusing the same key for different updates to the same order
     *
     * This prevents duplicate processing of critical operations like:
     * - Double-triggering accounting entries when marking as paid
     * - Re-reducing inventory stock
     * - Duplicate gift card redemptions
     * - Multiple promotion usage recordings
     *
     * **Updatable Fields:**
     * - `payment_status`: Payment status (pending, paid, failed, refunded)
     * - `order_status`: Order fulfillment status (pending, processing, shipped, delivered, cancelled)
     * - `notes`: Additional order notes
     * - `tracking_number`: Shipping tracking number
     * - `estimated_delivery`: Estimated delivery date/time
     * - `shipped_at`: Timestamp when order was shipped
     * - `delivered_at`: Timestamp when order was delivered
     *
     * **Automatic Accounting:**
     * When `payment_status` is updated to `paid`, the system automatically:
     * - Triggers accounting entry creation (production only)
     * - Reduces inventory stock for all order items
     * - Updates customer purchase metrics
     * - Processes gift card redemptions (if applicable)
     * - Records promotion usage (if applicable)
     *
     * **Key Type Support:**
     * - ✅ Secret keys (full access)
     * - ❌ Publishable keys (forbidden - returns 403)
     *
     * @returns Order Order updated successfully
     * @throws ApiError
     */
    public updateOrder({
        id,
        idempotencyKey,
        xTimestamp,
        xSignature,
        requestBody,
    }: {
        /**
         * Order UUID
         */
        id: string,
        /**
         * Unique key to prevent duplicate updates (e.g., update-{operation}-{order_id}-{timestamp})
         */
        idempotencyKey: string,
        /**
         * Unix timestamp in seconds (current time). Must be within 5 minutes of server time.
         * Used to prevent replay attacks.
         *
         */
        xTimestamp: number,
        /**
         * HMAC-SHA256 signature of the payload (timestamp + "." + request_body), base64-encoded.
         * Sign using your HMAC secret from Settings → Integration Settings.
         *
         */
        xSignature: string,
        requestBody: {
            /**
             * Payment status
             */
            payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
            /**
             * Order fulfillment status
             */
            order_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
            /**
             * Additional order notes
             */
            notes?: string;
            /**
             * Shipping tracking number
             */
            tracking_number?: string;
            /**
             * Estimated delivery date and time
             */
            estimated_delivery?: string;
            /**
             * Timestamp when order was shipped
             */
            shipped_at?: string;
            /**
             * Timestamp when order was delivered
             */
            delivered_at?: string;
        },
    }): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/orders/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
                'X-Timestamp': xTimestamp,
                'X-Signature': xSignature,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request (no updatable fields provided, invalid field values)`,
                401: `Unauthorized - Invalid or missing authentication credentials, or HMAC signature verification failed`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Reserve stock for checkout
     * **Optional.** Holds stock for the items a customer is checking out so the
     * units can't be sold to someone else while they complete payment.
     *
     * Use this when there is a gap between "customer commits to buy" and "payment
     * confirms" — card redirects, 3‑D Secure, or mobile‑money push prompts — so
     * the stock is claimed *before* the customer pays and a second shopper racing
     * for the last unit is turned away up front. For instant‑capture or fully
     * synchronous flows you can skip it and call `POST /v1/orders` directly;
     * Galactic Core still prevents stock from going negative at order time. In
     * other words, reserving is a stronger guarantee for async payments, not a
     * mandatory step before every order.
     *
     * Reservations are all‑or‑nothing: if any item lacks available stock, nothing
     * is reserved and the response is `409`. Each hold expires automatically after
     * a window (15 minutes by default). Pass the returned `reservation_ids` to
     * `POST /v1/orders` (or when you `PATCH` an order to `paid`) and Galactic Core
     * converts the hold into the actual stock deduction. If the customer abandons
     * checkout, the hold simply expires and the stock returns to availability —
     * you don't need to release it explicitly.
     *
     * Works with both publishable and secret keys (checkout originates in the
     * browser).
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns any Stock reserved
     * @throws ApiError
     */
    public reserveStock({
        requestBody,
    }: {
        requestBody: {
            /**
             * The variants and quantities to hold.
             */
            items: Array<{
                /**
                 * The product variant to reserve.
                 */
                variant_id: string;
                /**
                 * How many units to hold.
                 */
                quantity: number;
            }>;
            /**
             * Optional hold duration in seconds. Defaults to 900 (15 minutes);
             * values below 60 are raised to 60.
             *
             */
            ttl_seconds?: number;
            /**
             * Optional - associate the hold with a customer (used for checkout recovery).
             */
            customer_id?: string;
            /**
             * Optional - associate the hold with an anonymous browser session.
             */
            session_id?: string;
        },
    }): CancelablePromise<{
        reservations: Array<{
            reservation_id?: string;
            variant_id?: string;
            quantity?: number;
        }>;
        /**
         * Pass these to order creation to convert the hold into a sale.
         */
        reservation_ids: Array<string>;
        /**
         * Seconds until the hold expires if not converted.
         */
        expires_in_seconds: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/checkout/reserve',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                409: `Insufficient stock - nothing was reserved`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
