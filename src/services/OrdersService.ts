/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from '../models/Address';
import type { Order } from '../models/Order';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrdersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create order
     * Create a new order with idempotency protection and optional HMAC signing for enhanced security.
     *
     * **Idempotency**: Include `Idempotency-Key` header to prevent duplicate orders on retry.
     * If the same key is used within 24 hours, the original order is returned.
     *
     * **HMAC Signing** (Optional): For enhanced security, sign requests with HMAC-SHA256:
     * 1. Include `X-Timestamp` header with current Unix timestamp
     * 2. Create signature: `HMAC-SHA256(secret, timestamp + request_body)`
     * 3. Include signature in `X-Signature` header
     *
     * @returns Order Order created successfully (or existing order returned if idempotency key matches)
     * @throws ApiError
     */
    public createOrder({
        idempotencyKey,
        requestBody,
        xTimestamp,
        xSignature,
    }: {
        /**
         * Unique key to prevent duplicate orders (e.g., order-{date}-{random})
         */
        idempotencyKey: string,
        requestBody: {
            /**
             * Customer UUID
             */
            customer_id: string;
            /**
             * Order line items
             */
            items: Array<{
                /**
                 * Product UUID
                 */
                online_product_id: string;
                /**
                 * Quantity to order
                 */
                quantity: number;
                /**
                 * Price per unit at time of order
                 */
                unit_price: number;
            }>;
            shipping_address?: Address;
            billing_address?: Address;
            /**
             * Payment method identifier
             */
            payment_method?: 'stripe' | 'paystack' | 'mpesa' | 'airtel_money' | 'cash';
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
        },
        /**
         * Unix timestamp in seconds (required if HMAC signing is enabled)
         */
        xTimestamp?: number,
        /**
         * HMAC-SHA256 signature of timestamp + request body (required if HMAC enabled)
         */
        xSignature?: string,
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
                401: `Authentication failed - invalid or missing API key`,
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
     * Update specific fields of an existing order. Only the provided fields will be updated.
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
     * **HMAC Signing** (Optional): For enhanced security, sign requests with HMAC-SHA256:
     * 1. Include `X-Timestamp` header with current Unix timestamp
     * 2. Create signature: `HMAC-SHA256(secret, timestamp + request_body)`
     * 3. Include signature in `X-Signature` header
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
        requestBody,
        xTimestamp,
        xSignature,
    }: {
        /**
         * Order UUID
         */
        id: string,
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
        /**
         * Unix timestamp in seconds (required if HMAC signing is enabled)
         */
        xTimestamp?: number,
        /**
         * HMAC-SHA256 signature of timestamp + request body (required if HMAC enabled)
         */
        xSignature?: string,
    }): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/orders/{id}',
            path: {
                'id': id,
            },
            headers: {
                'X-Timestamp': xTimestamp,
                'X-Signature': xSignature,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request (no updatable fields provided, invalid field values)`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
