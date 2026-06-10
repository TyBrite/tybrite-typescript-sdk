/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdEventResponse } from '../models/AdEventResponse';
import type { AdSlotResponse } from '../models/AdSlotResponse';
import type { MarketplaceCheckoutResponse } from '../models/MarketplaceCheckoutResponse';
import type { MarketplaceCollectionDetail } from '../models/MarketplaceCollectionDetail';
import type { MarketplaceCollectionListResponse } from '../models/MarketplaceCollectionListResponse';
import type { MarketplaceInfoResponse } from '../models/MarketplaceInfoResponse';
import type { StoreInfoResponse } from '../models/StoreInfoResponse';
import type { UnifiedCustomerProfile } from '../models/UnifiedCustomerProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MarketplaceService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Check out a multi-merchant cart
     * Create a single order for a cart that contains items from multiple merchants
     * in the marketplace, and start a payment for the whole basket. Each item names
     * the merchant it belongs to; items are validated against the marketplace catalog,
     * commission is resolved per merchant, and one payment covers the entire order.
     *
     * The response includes a `client_secret` to complete the payment on the
     * storefront and a per-merchant breakdown of gross, discount, commission, and net
     * amounts. Once payment succeeds, the order finalizes automatically — no further
     * call is required.
     *
     * **Discounts.** Pass the optional `discounts` array to apply a merchant's own
     * promotion or gift card to that merchant's portion of the basket — each entry
     * names the `merchant_store_id` and an optional `promotion_id` and/or
     * `gift_card_code`, and the discount reduces only that merchant's subtotal.
     * Marketplace-wide promotions run by the operator apply automatically; you do not
     * pass them. The response reports `discount_total`, the
     * `operator_funded_discount` (the share the operator funded), a per-merchant
     * `discount_breakdown`, and `discount_amount` plus `merchant_gross` on each
     * `merchant_breakdown` entry.
     *
     * Stock is reserved at checkout: the items are held against each merchant's
     * inventory immediately so concurrent shoppers cannot oversell the last units,
     * and the hold becomes a real stock reduction when payment succeeds. If an item
     * cannot be held, the call returns `400 insufficient_stock` and no order or
     * payment is created. Holds expire automatically if payment is never completed,
     * returning the stock to availability.
     *
     * Requires the marketplace operator key.
     *
     * @returns MarketplaceCheckoutResponse The multi-merchant order was created and is awaiting payment.
     * @throws ApiError
     */
    public marketplaceCheckout({
        requestBody,
    }: {
        requestBody: {
            /**
             * The cart line items to check out.
             */
            items: Array<{
                product_id?: string;
                variant_id: string;
                /**
                 * The merchant that sells this item.
                 */
                merchant_store_id: string;
                quantity: number;
            }>;
            customer_email: string;
            customer_name?: string;
            customer_phone?: string;
            /**
             * ISO currency code for the order. Defaults to USD.
             */
            currency?: string;
            shipping_address?: Record<string, any>;
            billing_address?: Record<string, any>;
            /**
             * Optional per-merchant discounts. Each entry applies a merchant's own promotion and/or gift card to that merchant's portion of the basket, reducing only that merchant's subtotal. Marketplace-wide promotions run by the operator apply automatically and are not passed here.
             */
            discounts?: Array<{
                /**
                 * The merchant whose portion of the basket this discount applies to.
                 */
                merchant_store_id: string;
                /**
                 * The merchant's own promotion to apply.
                 */
                promotion_id?: string;
                /**
                 * A gift card code to redeem against this merchant's portion.
                 */
                gift_card_code?: string;
            }>;
        },
    }): CancelablePromise<MarketplaceCheckoutResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cart/checkout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                500: `Internal server error`,
                502: `The payment provider could not be reached or rejected the request.`,
            },
        });
    }
    /**
     * Get the signed-in shopper's unified marketplace profile
     * Return a marketplace shopper's unified profile, aggregated across every
     * merchant in the marketplace they have shopped with. The response combines
     * their identity, the merchants they have a relationship with, and their full
     * cross-merchant order history.
     *
     * Requires the marketplace operator key plus the shopper's session token,
     * supplied in the `X-Customer-Token` header. Sign the shopper in first, then
     * pass the token from that response here.
     *
     * @returns UnifiedCustomerProfile The shopper's unified marketplace profile.
     * @throws ApiError
     */
    public getMarketplaceCustomer({
        xCustomerToken,
    }: {
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in.
         */
        xCustomerToken: string,
    }): CancelablePromise<UnifiedCustomerProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/me',
            headers: {
                'X-Customer-Token': xCustomerToken,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Get marketplace information
     * Returns information about a marketplace. **Requires a marketplace operator key.**
     *
     * This endpoint has two modes:
     *
     * - **No `store_id`** — returns the marketplace's own identity and branding: name, logo,
     * primary color, tagline, contact details, and whether unified checkout and commission are
     * enabled. Use this to render the marketplace's storefront branding.
     * - **With `?store_id=<merchant>`** — returns the same comprehensive store information as
     * `GET /v1/store/info`, but for that one merchant within the marketplace. Useful for a
     * single-merchant "shop page" or for giving an AI agent context about one merchant. The
     * merchant must be active in the marketplace, otherwise `404` is returned. Combine with
     * `sections` to request only specific sections of that merchant's information.
     *
     * A single-store (non-operator) key receives `403`; use `GET /v1/store/info` instead.
     *
     * **Caching:** Responses may be cached for up to 5 minutes.
     *
     * @returns any Marketplace identity and branding (no `store_id`), or a merchant's comprehensive store
     * information (`store_id` provided).
     *
     * @throws ApiError
     */
    public getMarketplaceInfo({
        storeId,
        sections,
    }: {
        /**
         * A merchant's store identifier. When provided, returns that merchant's comprehensive
         * store information (same shape as `GET /v1/store/info`). Omit to return the marketplace's
         * own identity and branding.
         *
         */
        storeId?: string,
        /**
         * Only used together with `store_id`. Comma-separated list of sections of the merchant's
         * information to include. Omit to return all sections.
         *
         * **Available sections:** `catalog`, `pricing`, `promotions`, `payments`, `shipping`,
         * `cms`, `features`. The `store` section is always included.
         *
         */
        sections?: string,
    }): CancelablePromise<(MarketplaceInfoResponse | StoreInfoResponse)> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/marketplace/info',
            query: {
                'store_id': storeId,
                'sections': sections,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get placements for a slot
     * Returns the active placements to render in a named slot on a marketplace storefront (for
     * example a hero banner, a category strip, or search results). **Requires a marketplace
     * operator key.**
     *
     * A slot can return two kinds of placement. **Sponsored** placements (`sponsored: true`) are
     * paid advertising and **must be rendered with their `disclosure_label`** (for example
     * "Sponsored") so shoppers can tell them apart from organic results. **Curated fallback**
     * placements (`curated: true, sponsored: false`) are hand-picked by the marketplace operator
     * to fill the slot when no paid placement is available; they are **not** labelled as sponsored.
     * Only sponsored placements require the disclosure label.
     *
     * Blend placements with your organic listings or recommendations as appropriate for the slot.
     *
     * Use the optional `context` parameter to request placements scoped to a category or a search
     * term, and `limit` to cap how many placements come back.
     *
     * After rendering, log a beacon with `POST /v1/marketplace/ad-events`: one `impression` per
     * placement when it becomes visible, and a `click` when the shopper clicks it.
     *
     * @returns AdSlotResponse The active placements for the slot.
     * @throws ApiError
     */
    public getAdSlot({
        slotKey,
        context,
        limit,
    }: {
        /**
         * The slot to fill, for example `home_hero` or `category_top`.
         */
        slotKey: string,
        /**
         * Optional context for context-scoped slots — a category identifier or a search term — used to pick placements relevant to what the shopper is viewing.
         */
        context?: string,
        /**
         * Maximum number of placements to return.
         */
        limit?: number,
    }): CancelablePromise<AdSlotResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/marketplace/ad-slots/{slot_key}',
            path: {
                'slot_key': slotKey,
            },
            query: {
                'context': context,
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * Log an ad impression or click
     * Records an impression or click beacon for a sponsored placement. **Requires a marketplace
     * operator key.**
     *
     * This is fire-and-forget: fire one `impression` per placement when it becomes visible, and a
     * `click` when the shopper clicks it. Pass the `booking_id` from the placement you rendered.
     *
     * The response returns `202 Accepted` with `billable` indicating whether the event counted
     * toward billing after de-duplication and invalid-traffic filtering. This is informational —
     * the storefront does not need to act on it.
     *
     * @returns AdEventResponse The beacon was accepted.
     * @throws ApiError
     */
    public logAdEvent({
        requestBody,
    }: {
        requestBody: {
            /**
             * The placement's identifier, taken from the slot response.
             */
            booking_id: string;
            /**
             * Whether the placement was shown (`impression`) or clicked (`click`).
             */
            event_type: 'impression' | 'click';
            /**
             * Optional — the specific product within the placement the event relates to.
             */
            product_id?: string;
            /**
             * Optional — an opaque storefront session identifier used to de-duplicate events.
             */
            session_id?: string;
        },
    }): CancelablePromise<AdEventResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/marketplace/ad-events',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * List operator-curated merchandising sections
     * Returns the merchandising sections the marketplace operator has curated for the storefront —
     * for example "Trending now", "Featured shops", or a seasonal promotion rail. Each section
     * groups products, merchants, or promotions the operator hand-picked (or auto-curated) to
     * merchandise the storefront. **Requires a marketplace operator key.**
     *
     * Use these to render homepage sections, and blend them with sponsored placements and organic
     * recommendations as appropriate. Fetch a section's resolved members with
     * `GET /v1/marketplace/collections/{slug}`.
     *
     * Use the optional `placement_kind` parameter to return only sections of a given kind.
     *
     * @returns MarketplaceCollectionListResponse The operator-curated merchandising sections.
     * @throws ApiError
     */
    public listMarketplaceCollections({
        placementKind,
    }: {
        /**
         * Return only sections of this kind.
         */
        placementKind?: 'product' | 'merchant' | 'promotion',
    }): CancelablePromise<MarketplaceCollectionListResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/marketplace/collections',
            query: {
                'placement_kind': placementKind,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * Get one curated section with its members
     * Returns a single curated merchandising section together with its resolved members. The
     * members are products, merchants, or promotions hand-picked (or auto-curated) by the
     * marketplace operator to merchandise the storefront. **Requires a marketplace operator key.**
     *
     * Render the section as a homepage rail and blend it with sponsored placements and organic
     * recommendations as appropriate.
     *
     * Use the optional `limit` parameter to cap how many members come back.
     *
     * @returns MarketplaceCollectionDetail The curated section and its members.
     * @throws ApiError
     */
    public getMarketplaceCollection({
        slug,
        limit,
    }: {
        /**
         * The section's slug, taken from the section list.
         */
        slug: string,
        /**
         * Maximum number of members to return.
         */
        limit?: number,
    }): CancelablePromise<MarketplaceCollectionDetail> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/marketplace/collections/{slug}',
            path: {
                'slug': slug,
            },
            query: {
                'limit': limit,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
            },
        });
    }
}
