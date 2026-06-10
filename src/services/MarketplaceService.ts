/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketplaceCheckoutResponse } from '../models/MarketplaceCheckoutResponse';
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
     * storefront and a per-merchant breakdown of gross, commission, and net amounts.
     * Once payment succeeds, the order finalizes automatically — no further call is
     * required.
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
}
