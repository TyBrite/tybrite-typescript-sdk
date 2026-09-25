/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdEventResponse } from '../models/AdEventResponse';
import type { AdSlotResponse } from '../models/AdSlotResponse';
import type { MarketplaceCheckoutQuote } from '../models/MarketplaceCheckoutQuote';
import type { MarketplaceCheckoutResponse } from '../models/MarketplaceCheckoutResponse';
import type { MarketplaceCollectionDetail } from '../models/MarketplaceCollectionDetail';
import type { MarketplaceCollectionListResponse } from '../models/MarketplaceCollectionListResponse';
import type { MarketplaceInfoResponse } from '../models/MarketplaceInfoResponse';
import type { MarketplaceShippingDestination } from '../models/MarketplaceShippingDestination';
import type { MarketplaceShippingSelection } from '../models/MarketplaceShippingSelection';
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
     * 🛡️ **The server is the price authority (anti-tampering).** You never send money
     * amounts on this call — only identifiers. Each item's price is recomputed from the
     * marketplace catalog, and a `discounts` entry only *names* a `promotion_id` /
     * `gift_card_code`; the server independently resolves the actual discount that
     * merchant's promotion or gift card grants (and the operator-funded share),
     * computes every `gross`, `discount_amount`, `merchant_gross`, commission, and the
     * payment total from those resolved values, and charges exactly that. A named
     * discount that doesn't validate (expired, ineligible, wrong store) is rejected with
     * `400 discount_invalid` rather than silently applied. There is no client-supplied
     * `discount_amount` or per-item price to tamper with — a manipulated basket cannot
     * lower what is charged. The resolved breakdown is then held server-side and used
     * verbatim to finalize the order after payment succeeds; nothing the client sends
     * after checkout can change what each merchant is paid.
     *
     * **Shipping.** Each merchant's items are delivered, and priced, separately: one shipping
     * line per merchant. By default each merchant's own delivery rates price their line, from
     * the `shipping_destination` (or the `shipping_address`, which is located when no
     * destination is sent). The marketplace may instead charge a flat rate per merchant, and may
     * set a free-shipping threshold: a merchant whose items total at least that much ships free.
     * To offer carrier options, send a street `shipping_address` and a `parcel` per merchant in
     * `shipping_selections` to `POST /v1/cart/checkout/quote`; to choose one, send its `rate_id`
     * here. Shipping is paid to whoever ships the items — the merchant, or the marketplace when
     * it ships on the merchant's behalf. `total_amount` includes shipping, `shipping_total`
     * reports it, and `shipping_breakdown` lists each merchant's line. A shipping amount is never
     * read from the request. The same computation runs on `POST /v1/cart/checkout/quote`, so the
     * shopper can see each line before paying.
     *
     * Stock is reserved at checkout: the items are held against each merchant's
     * inventory immediately so concurrent shoppers cannot oversell the last units,
     * and the hold becomes a real stock reduction when payment succeeds. If an item
     * cannot be held, the call returns `400 insufficient_stock` and no order or
     * payment is created. Holds expire automatically if payment is never completed,
     * returning the stock to availability.
     *
     * **The shopper.** Send the shopper's credential to tie the purchase to them: a
     * Galactic Core shopper session in `x-auth-token` (also accepted as
     * `x-customer-token`), or an assertion signed by the marketplace's own backend in
     * `x-external-auth`. With neither, the checkout is a guest checkout. The purchase is
     * recorded against that credential, which is what later lets the shopper see it in
     * `GET /v1/customers/me`, return it, and dispute it. A guest purchase becomes
     * visible to an account once that account has verified its email address with a
     * one-time code.
     *
     * **Wallet.** A signed-in shopper can spend their marketplace wallet balance: send
     * `wallet_amount` to spend up to that much, or `use_wallet: true` to spend as much
     * as the checkout allows. The balance is held while payment is pending and returned
     * if the payment fails or is abandoned. The charge never falls below the payment
     * provider's minimum for the currency, so a wallet cannot pay for a whole basket.
     * The response reports `wallet_applied`, and `total_amount` is the amount charged
     * after it. Each merchant is still paid their full net: the marketplace operator
     * funds the wallet.
     *
     * Currency: every price is charged in the marketplace's currency. A merchant who prices in
     * another currency is converted with the exchange rate the marketplace sets for that currency —
     * items, the merchant's discounts, gift-card amounts and delivery fees alike, each rounded to
     * the marketplace currency's minor units. A merchant whose currency has no rate in the
     * marketplace cannot be bought from there (`400 item_currency_unsupported`).
     *
     * Shipping: each merchant's items are priced by that merchant's delivery rates, converted to
     * the marketplace's currency with the marketplace's exchange rate; items the marketplace ships
     * itself are priced by the marketplace's own delivery rates (`pricing: operator_rate`). A
     * marketplace flat rate or free-shipping threshold overrides both.
     *
     * Shipping errors: `400 shipping_destination_required` when a merchant's delivery rate needs
     * a location and none can be found, `400 shipping_not_deliverable` when a merchant (or the
     * marketplace, for items it ships) does not deliver to the address, `400
     * shipping_currency_unsupported` when the marketplace has no exchange rate for the currency a
     * merchant's delivery rates are set in, `400 shipping_rate_invalid` when a chosen carrier option is unknown,
     * expired, not in the marketplace's currency, or chosen for items the marketplace ships itself,
     * and `502 shipping_unavailable` when shipping cannot be priced right now.
     *
     * Requires the marketplace operator key.
     *
     * @returns MarketplaceCheckoutResponse The multi-merchant order was created and is awaiting payment.
     * @throws ApiError
     */
    public marketplaceCheckout({
        requestBody,
        xAuthToken,
        xCustomerToken,
        xExternalAuth,
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
            /**
             * Where the order is going (`line1`, `line2`, `city`, `state`, `postal_code`, `country`). Located to price shipping when `shipping_destination` is omitted.
             */
            shipping_address?: Record<string, any>;
            shipping_destination?: MarketplaceShippingDestination;
            /**
             * Optional per-merchant shipping choices: a carrier option (`rate_id`) returned by `POST /v1/cart/checkout/quote`. Without one, the merchant's own delivery rate applies.
             */
            shipping_selections?: Array<MarketplaceShippingSelection>;
            billing_address?: Record<string, any>;
            /**
             * Spend up to this much of the signed-in shopper's marketplace wallet on this checkout. Capped by the balance and by the payment provider's minimum charge.
             */
            wallet_amount?: number;
            /**
             * Spend as much of the signed-in shopper's wallet as the checkout allows.
             */
            use_wallet?: boolean;
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
            /**
             * Where the shopper came from, recorded so the sale is credited to the right traffic source in the merchant's reports. The same fields are also accepted at the top level of this request body if you already send them that way.
             */
            attribution?: {
                /**
                 * The shopper's storefront session, linking the order to their visit.
                 */
                session_id?: string;
                utm_source?: string;
                utm_medium?: string;
                utm_campaign?: string;
                referrer?: string;
            };
        },
        /**
         * Session token of a shopper signed in through Galactic Core, tying the checkout to their account rather than treating it as a guest checkout. Optional; send at most one shopper credential.
         */
        xAuthToken?: string,
        /**
         * Alias of `x-auth-token`.
         */
        xCustomerToken?: string,
        /**
         * A shopper assertion signed by the marketplace's own backend with the marketplace's signing secret, for marketplaces that run their own sign-in. The claim carries `external_id`, `iat` and `exp` (at most 300 seconds apart), and optionally `email` with `email_verified: true`. Optional; send at most one shopper credential.
         */
        xExternalAuth?: string,
    }): CancelablePromise<MarketplaceCheckoutResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cart/checkout',
            headers: {
                'x-auth-token': xAuthToken,
                'x-customer-token': xCustomerToken,
                'x-external-auth': xExternalAuth,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The marketplace has not finished connecting its payment account, so it cannot take payment yet (\`provider_not_live\`).`,
                500: `Internal server error`,
                502: `The payment provider could not be reached or rejected the request (\`provider_error\`), or shipping could not be priced (\`shipping_unavailable\`). No order is created.`,
            },
        });
    }
    /**
     * Quote a multi-merchant checkout
     * What `POST /v1/cart/checkout` will charge for this basket, per merchant, before the
     * shopper pays — including each merchant's shipping line. It takes the same body and runs
     * the same computation as the checkout, but holds no stock, creates no order and starts no
     * payment, so it can be called as the shopper edits their basket or their address.
     *
     * Each merchant's items are priced for delivery separately: by that merchant's own delivery
     * rates for the destination, or by the marketplace's flat rate per merchant, and free when
     * the merchant's items reach the marketplace's free-shipping threshold. When the request
     * carries a street `shipping_address` and a `parcel` for a merchant in
     * `shipping_selections`, that merchant's carrier options are listed in `rates`; send the
     * chosen option's `rate_id` (and `rate_source`) to the checkout. Carrier options are not
     * offered for items the marketplace ships itself.
     *
     * The quote never includes commission or what a merchant is paid.
     *
     * Requires the marketplace operator key (a publishable key is enough).
     *
     * @returns MarketplaceCheckoutQuote The basket's price, per merchant, including shipping.
     * @throws ApiError
     */
    public marketplaceCheckoutQuote({
        requestBody,
    }: {
        requestBody: {
            items: Array<{
                product_id?: string;
                variant_id: string;
                merchant_store_id: string;
                quantity: number;
            }>;
            currency?: string;
            /**
             * Used as the recipient name on carrier options.
             */
            customer_name?: string;
            /**
             * Where the order is going (`line1`, `line2`, `city`, `state`, `postal_code`, `country`). Located to price shipping when `shipping_destination` is omitted, and needed for carrier options.
             */
            shipping_address?: Record<string, any>;
            shipping_destination?: MarketplaceShippingDestination;
            shipping_selections?: Array<MarketplaceShippingSelection>;
            /**
             * The same per-merchant discounts the checkout accepts.
             */
            discounts?: Array<{
                merchant_store_id: string;
                promotion_id?: string;
                gift_card_code?: string;
            }>;
        },
    }): CancelablePromise<MarketplaceCheckoutQuote> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/cart/checkout/quote',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The basket is invalid (\`invalid_request\`, \`insufficient_stock\`, \`currency_mismatch\`, \`discount_invalid\`), a merchant's currency has no exchange rate in the marketplace (\`item_currency_unsupported\`), no location could be found for a merchant priced by location (\`shipping_destination_required\`), a merchant or the marketplace does not deliver to the address (\`shipping_not_deliverable\`), the marketplace has no exchange rate for a merchant's delivery-rate currency (\`shipping_currency_unsupported\`), or a chosen carrier option cannot be used (\`shipping_rate_invalid\`).`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The marketplace has not finished connecting its payment account (\`provider_not_live\`).`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                502: `Shipping could not be priced right now (\`shipping_unavailable\`).`,
            },
        });
    }
    /**
     * Get the signed-in shopper's unified marketplace profile
     * Return a marketplace shopper's profile and their order history across every
     * merchant in this marketplace.
     *
     * A purchase belongs to the shopper when it was placed with their credential. A
     * purchase made as a guest belongs to them once they have verified the email address
     * it was bought with, by verifying a one-time code or following a sign-in link;
     * registering an account with that address is not enough. `customer.email_verified`
     * reports which applies. A marketplace shopper holds no customer record with any
     * merchant, so `customer.ids` is empty.
     *
     * Requires the marketplace operator key plus exactly one shopper credential:
     * `x-auth-token` (a Galactic Core shopper session, also accepted as
     * `X-Customer-Token`) or `x-external-auth` (an assertion signed with the
     * marketplace's signing secret).
     *
     * @returns UnifiedCustomerProfile The shopper's marketplace profile.
     * @throws ApiError
     */
    public getMarketplaceCustomer({
        xAuthToken,
        xCustomerToken,
        xExternalAuth,
    }: {
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in.
         */
        xAuthToken?: string,
        /**
         * Alias of `x-auth-token`.
         */
        xCustomerToken?: string,
        /**
         * A shopper assertion signed by the marketplace's own backend with the marketplace's signing secret: `external_id`, `iat` and `exp` (at most 300 seconds apart), and optionally `email` with `email_verified: true`.
         */
        xExternalAuth?: string,
    }): CancelablePromise<UnifiedCustomerProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/me',
            headers: {
                'x-auth-token': xAuthToken,
                'X-Customer-Token': xCustomerToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the signed-in shopper's marketplace wallet
     * Return the shopper's marketplace wallet: the balance the marketplace has credited
     * them (for example when a dispute is decided as credit rather than a refund) and the
     * credits that make it up. The balance is spendable at this marketplace's checkout
     * with `wallet_amount` or `use_wallet`. It is held by the marketplace, not by any
     * merchant, and is separate in sandbox and production.
     *
     * Requires the marketplace operator key plus exactly one shopper credential, as for
     * `GET /v1/customers/me`.
     *
     * @returns any The shopper's wallet.
     * @throws ApiError
     */
    public getMarketplaceWallet({
        xAuthToken,
        xCustomerToken,
        xExternalAuth,
    }: {
        /**
         * The signed-in shopper's session token.
         */
        xAuthToken?: string,
        /**
         * Alias of `x-auth-token`.
         */
        xCustomerToken?: string,
        /**
         * A shopper assertion signed with the marketplace's signing secret.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: {
            /**
             * Spendable balance, in `currency`.
             */
            balance?: number;
            /**
             * The marketplace's settlement currency.
             */
            currency?: string | null;
            /**
             * The most recent credits, newest first (up to 50).
             */
            credits?: Array<{
                id?: string;
                /**
                 * The amount credited.
                 */
                amount?: number;
                /**
                 * What remains of this credit.
                 */
                balance?: number;
                currency?: string | null;
                status?: 'active' | 'depleted' | 'expired' | 'void';
                /**
                 * Why the credit was issued, for example `dispute`.
                 */
                source?: string;
                expires_at?: string | null;
                created_at?: string;
            }>;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/me/wallet',
            headers: {
                'x-auth-token': xAuthToken,
                'X-Customer-Token': xCustomerToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                500: `Internal server error`,
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
         * `cms`, `features`, `custom_fields`. The `store` section is always included.
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
                500: `Internal server error`,
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
                500: `Internal server error`,
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
                500: `Internal server error`,
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
                500: `Internal server error`,
            },
        });
    }
}
