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
     * ```javascript
     * const crypto = require('crypto');
     * const timestamp = Math.floor(Date.now() / 1000);
     * const body = JSON.stringify(orderData);
     * const payload = `${timestamp}.${body}`;
     * const signature = crypto.createHmac('sha256', hmacSecret)
     * .update(payload).digest('base64');
     *
     * // Include in headers:
     * // X-Timestamp: 1771523993
     * // X-Signature: IqdgKXgloLzL5akDgFEwPaK6wviozf...
     * ```
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
     * @returns Order Order created successfully (or existing order returned if idempotency key matches)
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
             * Customer UUID
             */
            customer_id: string;
            /**
             * Customer email address
             */
            customer_email?: string;
            /**
             * Customer full name
             */
            customer_name?: string;
            /**
             * Customer phone number
             */
            customer_phone?: string;
            /**
             * Billing address (required)
             */
            billing_address?: {
                street: string;
                city: string;
                state?: string;
                zip?: string;
                country: string;
            };
            /**
             * Shipping address (required)
             */
            shipping_address?: {
                street: string;
                city: string;
                state?: string;
                zip?: string;
                country: string;
            };
            /**
             * Order line items
             */
            items: Array<{
                /**
                 * Product UUID (required)
                 */
                product_id: string;
                /**
                 * Variant UUID (optional - uses default variant if not provided)
                 */
                variant_id?: string;
                /**
                 * Product name at time of order
                 */
                product_name: string;
                /**
                 * Product SKU
                 */
                product_sku: string;
                /**
                 * Quantity to order
                 */
                quantity: number;
                /**
                 * Price per unit at time of order
                 */
                unit_price: number;
                /**
                 * Total price for this line item (quantity × unit_price)
                 */
                total_price: number;
                /**
                 * Product variant options (e.g., color, size)
                 */
                product_options?: Record<string, any> | null;
            }>;
            /**
             * Payment method identifier
             */
            payment_method?: 'card' | 'stripe' | 'paystack' | 'mpesa' | 'airtel_money' | 'cash';
            /**
             * Payment status (defaults to pending)
             */
            payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
            /**
             * Subtotal before tax and shipping
             */
            subtotal?: number;
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
            total_amount?: number;
            /**
             * Additional order notes
             */
            notes?: string;
            /**
             * Shipping calculation details from /v1/shipping/calculate for audit trail
             */
            shipping_metadata?: {
                fee?: number;
                zone_name?: string | null;
                tier_name?: string | null;
                distance_meters?: number | null;
                is_free?: boolean;
                reason?: string;
                applied_rule?: 'zone' | 'distance' | 'default';
            } | null;
            /**
             * Optional gift card to redeem towards this order
             */
            gift_card_redemption?: {
                code?: string;
                amount?: number;
            } | null;
        },
    }): CancelablePromise<Order> {
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
                429: `Rate limit exceeded`,
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
     * ```javascript
     * const crypto = require('crypto');
     * const signature = response.headers['x-signature'];
     * const computed = crypto.createHmac('sha256', apiSecretKey)
     * .update(JSON.stringify(response.data))
     * .digest('hex');
     * const isValid = signature === computed;
     * ```
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
                404: `Resource not found`,
                429: `Rate limit exceeded`,
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
