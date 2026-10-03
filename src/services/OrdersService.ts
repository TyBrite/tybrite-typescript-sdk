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
        orderStatus?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
        /**
         * Filter to orders for a specific customer
         */
        customerId?: string,
        /**
         * Comma-separated list of fields to include per order. The same allowed fields as
         * `GET /v1/orders/{id}`, minus the ones fetched per order rather than read from the order
         * row: `items`, `status_notes` and `custom_fields` are returned by the detail endpoint, and
         * requesting one of them here is a `400`.
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
     * - HMAC secret is displayed in the Integrations page (Developer section)
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
     * - **`tax_amount`** is calculated by the server when you omit it: for the `shipping_address` when
     * the store has automatic tax (the shipping charge is rated as its own line), otherwise at the
     * store's own rate — on the line totals, plus the shipping charge when the store charges tax on
     * shipping. At the store's own rate a `tax_amount` you send must match that figure to the cent →
     * otherwise **`400 price_mismatch`**. When the store's prices include tax, the tax is taken from
     * what the shopper pays (line totals − discount, plus shipping when taxed) and `subtotal` is the
     * line totals minus that tax. `POST /v1/tax/preview` returns the same figure before checkout.
     * - **`discount_amount`** is validated against the discount the promotions / gift card you claim
     * actually grant (computed server-side from `promotion_usages` + `gift_card_redemption`). A
     * `discount_amount` greater than that legitimate maximum → **`400 discount_invalid`**. A discount
     * with no real promotion/gift card behind it → max is `0`. (You may apply *less* than the maximum.)
     * - **`shipping_amount`** is checked on every order, $0 included, and may not be negative:
     * - With a carrier option (`shipping_rate_id` + `shipping_rate_source`, or `shippo_rate_id`),
     * the option is fetched again from its source — the store's carrier account, or its custom
     * shipping extension re-quoted for `shipping_address` and `shipping_parcel`. An unknown,
     * expired or foreign option, one in another currency, or a test-mode option on a live order →
     * **`400 shipping_rate_invalid`**; an amount that differs from the option →
     * **`400 price_mismatch`**.
     * - Otherwise, when the store has delivery rates and the destination is known
     * (`shipping_latitude`/`shipping_longitude`, or a `shipping_address` that can be located), the
     * amount must equal the store's charge for that address, free-delivery thresholds measured
     * against the line totals after `discount_amount` → otherwise **`400 price_mismatch`**. A
     * destination the store does not deliver to → **`400 shipping_not_deliverable`**.
     * - A store with no delivery rates (it ships through its own arrangements) accepts the amount
     * sent; so does an order whose destination cannot be located. Such an order is recorded as
     * not checked.
     * - When shipping cannot be checked because the service is unreachable →
     * **`502 shipping_unavailable`**; the order is not created.
     *
     * In short: send the **real catalog prices** and the **actual promotions/gift card** the shopper is
     * entitled to. Don't compute or invent prices/discounts client-side — the server is the authority.
     *
     * @returns Order The `Idempotency-Key` has already been used for this store, so the order it created is
     * returned instead of a new one being made. The body is the order resource, exactly as
     * `GET /v1/orders/{id}` would return it — note this differs from the `201` envelope, which
     * nests the order under an `order` property.
     *
     * Retrying a create with the same key is always safe: concurrent retries resolve to the
     * same order, and only the first request receives `201`.
     *
     * @returns any Order created successfully
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
         * Sign using your HMAC secret from the Integrations page (Developer section).
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
             * Order line items (at least one, at most 100)
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
            order_status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
             * Values for the merchant's own custom fields on this order, as
             * `{ field_name: value }`. Use this to carry a reference the merchant asked for at
             * checkout — a buyer's purchase-order number, a cost centre, a delivery instruction.
             *
             * Each value is validated against the merchant's definition: a name that is not defined,
             * a value outside a `select` field's options, or a number that will not parse is
             * **rejected**. A rejected field does **not** fail the order — the order is created and
             * the reason is returned in `post_processing_warnings`, because the payment has already
             * been taken by that point. Read `GET /v1/products/{id}/custom-fields` or the order
             * response's `custom_fields` to discover which fields a merchant has defined.
             *
             */
            custom_fields?: any | null;
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
             * Campaigns to apply to this order, by id. The discount each one grants is computed
             * server-side against the campaign's own rules and its remaining budget, so a
             * campaign that has spent its budget adds nothing. Once the order is paid, what
             * each campaign granted is drawn from its budget.
             *
             */
            campaign_ids?: any[] | null;
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
            /**
             * Your own order reference. When omitted, Galactic Core generates one. Use this to keep order numbers aligned with a system you already run.
             */
            order_number?: string;
            /**
             * ISO 4217 currency code the order is priced in. When omitted, the store's default storefront currency is used. Set it when you present prices in a currency the shopper selected, so the order is recorded in the same currency it was paid in.
             */
            currency?: string;
            /**
             * Stock reservation ids returned by `POST /v1/checkout/reserve`. Supplying them commits the stock already held for this shopper instead of decrementing it again, which is what keeps a high-demand drop from overselling between reservation and payment. On a `pending` order the ids are kept with the order: they are committed when the order is paid and released when it is cancelled or its payment fails. Only holds on the order's own items are committed. At most 100 ids.
             */
            reservation_ids?: Array<string>;
            /**
             * Delivery latitude, used to resolve the delivery zone or distance tier that prices shipping. Send it with `shipping_longitude` when the shopper's coordinates are known; the server re-derives the shipping cost from them rather than trusting a client total.
             */
            shipping_latitude?: number;
            /**
             * Delivery longitude. See `shipping_latitude`.
             */
            shipping_longitude?: number;
            /**
             * The id of a carrier option from the store's connected carrier account. Equivalent to `shipping_rate_id` with `shipping_rate_source: shippo`. The option is fetched again and checked before it is charged, so a modified, stale or foreign option is rejected.
             */
            shippo_rate_id?: string;
            /**
             * The id of the carrier option the shopper chose, as returned in `rates[]` by `POST /v1/shipping/calculate`. Send with `shipping_rate_source`.
             */
            shipping_rate_id?: string;
            /**
             * Where the chosen option came from — its `source` in `rates[]`: the store's carrier account (`shippo`) or its custom shipping extension (`custom`).
             */
            shipping_rate_source?: 'shippo' | 'custom';
            /**
             * The parcel the option was quoted for. Required with `shipping_rate_source: custom`, because the extension is asked for its options again to check the one chosen.
             */
            shipping_parcel?: {
                length?: string;
                width?: string;
                height?: string;
                distance_unit?: string;
                weight?: string;
                mass_unit?: string;
            };
            /**
             * The ship-from address the option was quoted with, when one was sent to `POST /v1/shipping/calculate` as `address_from`.
             */
            shipping_address_from?: Record<string, any>;
            /**
             * Where this order came from, recorded for the merchant's analytics. Accepts the fields below; the same fields are also read from the top level of the request body if you already send them there. Promotions that actually applied are recorded from the server-validated result, so `promotion_ids` never inflates what a shopper received.
             */
            attribution?: any | null;
            /**
             * Google ad click id, when the shopper arrived from a Google ad. On a paid order this lets the merchant's Google advertising get credit for the sale, and is kept on the order so the merchant's own reports can attribute revenue and profit to the ad that earned it rather than relying on the ad platform's account. Forward the true captured value; omit if not present.
             */
            gclid?: string | null;
            /**
             * Meta (Facebook & Instagram) ad click id, when the shopper arrived from a Meta ad. On a paid order this lets the merchant's Meta advertising get credit for the sale. The conversion is sent server-side (Conversions API) and de-duplicated against the storefront's Meta Pixel by the order id, so it counts even when the browser blocks the Pixel. It is kept on the order so the merchant's own reports can attribute revenue and profit to the ad that earned it. Forward the true captured value; omit if not present.
             */
            fbclid?: string | null;
            /**
             * Advertising privacy-consent state captured at checkout, used to decide whether a conversion may be reported to an ad platform for this shopper's region (required for EEA shoppers; UK/Swiss records are not dropped for a missing signal). Always forward the true captured values — never guess.
             */
            ad_consent?: any | null;
        },
    }): CancelablePromise<Order | {
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
                422: `The store runs its own order-validation rule and that rule rejected the order. The \`message\` carries the reason the store gave. No order is created. This is also returned when the store requires validation but the rule could not be reached, so an order is never created unchecked.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                502: `Shipping could not be checked right now (\`shipping_unavailable\`). No order is created.`,
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
     * - `payment_status`: Payment status (pending, paid, failed)
     * - `order_status`: Order fulfillment status (pending, confirmed, processing, shipped, delivered, cancelled)
     * - `notes`: Additional order notes
     * - `tracking_number`: Shipping tracking number
     * - `estimated_delivery`: Estimated delivery date/time
     * - `shipped_at`: Timestamp when order was shipped
     * - `delivered_at`: Timestamp when order was delivered
     * - `shipping_metadata`: Fulfilment details such as a purchased label's carrier and tracking (replaces the stored object)
     *
     * **Status transitions:**
     * - `payment_status`: `pending` → `paid` or `failed`; `failed` → `paid`. A `paid` order
     * does not move back, and `refunded` is set by processing a refund, not by this endpoint.
     * - `order_status` moves forward only (`pending` → `confirmed` → `processing` → `shipped` →
     * `delivered`). `cancelled` is available until the order ships. `cancelled` and `delivered`
     * are final, and a cancelled order cannot be marked paid.
     * - Sending a field with the value it already has is not a transition: the request succeeds
     * and nothing is repeated. Any other move is refused with `409 invalid_transition`.
     * - A status change applies only if the order is still in the state it was in when the
     * request began. When two requests change it at once, one succeeds and the other receives
     * `409 order_changed`.
     *
     * **Automatic Accounting:**
     * When `payment_status` is updated to `paid`, the system automatically, and once:
     * - Triggers accounting entry creation (production only)
     * - Reduces inventory stock for all order items, committing the order's own stock holds
     * - Updates customer purchase metrics
     * - Redeems the gift card applied at checkout (if applicable)
     * - Records promotion usage and campaign spend (if applicable)
     * Anything that does not complete is listed in `post_processing_warnings` on the response; the
     * order stays paid.
     *
     * When an unpaid order is cancelled or its payment fails, its stock holds are released and any
     * store credit applied to it is returned to the customer.
     *
     * **Key Type Support:**
     * - ✅ Secret keys (full access)
     * - ❌ Publishable keys (forbidden - returns 403)
     *
     * @returns any Order updated successfully
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
         * Sign using your HMAC secret from the Integrations page (Developer section).
         *
         */
        xSignature: string,
        requestBody: {
            /**
             * Payment status. See the allowed transitions above.
             */
            payment_status?: 'pending' | 'paid' | 'failed';
            /**
             * Order fulfillment status. See the allowed transitions above.
             */
            order_status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
            /**
             * The reference your payment provider issued for this payment. Send it when marking an order paid that was charged outside Galactic Core, so the payment can be traced back to the provider's own record. When the store has added its own payment method, the reference is checked with that provider before the order is accepted as paid.
             */
            payment_reference?: string;
            /**
             * Stock reservation ids returned by `POST /v1/checkout/reserve`. Supplying them commits the stock already held for this shopper rather than decrementing it a second time.
             */
            reservation_ids?: Array<string>;
            /**
             * Fulfilment details to store on the order, such as the carrier, service, label URL and tracking details of a purchased shipping label. The object replaces the order's stored `shipping_metadata` in full rather than being merged into it, so include any existing keys that should be kept.
             */
            shipping_metadata?: any | null;
        },
    }): CancelablePromise<(Order & {
        /**
         * Present only when the update marked the order paid and one or more of the
         * steps that follow (stock, gift card, store credit, promotion usage) did not
         * complete. The order stays paid; each warning names the step and what needs
         * follow-up.
         *
         */
        post_processing_warnings?: Array<{
            /**
             * The step that did not complete
             */
            stage: string;
            /**
             * Human-readable description of the failure
             */
            message: string;
        }>;
    })> {
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
                409: `The requested status change is not allowed from the order's current state (\`invalid_transition\`), or the order changed while the request was being applied (\`order_changed\`). The order is left as it was.`,
                422: `You marked the order paid with a \`payment_reference\`, but the payment method the merchant added does not report that reference as paid. The order is left unchanged rather than accepted on an unverified claim.`,
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
     * **Limits per request:** with a publishable key, at most 25 items and 25 units
     * of any one variant (quantities for a repeated variant are added together);
     * with a secret key, at most 100 items and 1,000 units of any one variant. A
     * request over a limit is refused with `400` and nothing is reserved.
     *
     * **Rate limit:** 300 requests/hour per API key, and with a publishable key
     * 60 requests/hour per visitor.
     *
     * A key issued through GC Connect needs the `orders:write` scope; without it
     * the request returns `403`.
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
             * Optional - associate the hold with a customer (used for checkout recovery). Honoured only with a secret key; with a publishable key the hold is recorded without a customer.
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
                403: `Insufficient permissions - operation requires secret key`,
                409: `Insufficient stock - nothing was reserved`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
