/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SandboxB2bBuyerAccount } from '../models/SandboxB2bBuyerAccount';
import type { SandboxCampaign } from '../models/SandboxCampaign';
import type { SandboxGiftCard } from '../models/SandboxGiftCard';
import type { SandboxPromotion } from '../models/SandboxPromotion';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SandboxService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Reset your sandbox data
     * Wipes all of your store's **sandbox** test data immediately — orders, customers, carts,
     * wishlists, returns, store credits, reviews, messages, analytics events, webhook events and
     * more — so you can start a test run from a clean slate without waiting for the automatic
     * 30-day cleanup. Your **live** data and your store configuration are never touched.
     *
     * **Requires a secret test key** (`tybrite_sk_test_*`). Publishable keys and live keys are
     * rejected. Returns `204 No Content` on success. `DELETE /v1/sandbox/data` does the same thing.
     *
     * @returns void
     * @throws ApiError
     */
    public resetSandbox(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/reset',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Reset your sandbox data (alias)
     * Alias of `POST /v1/sandbox/reset` — wipes all of your store's sandbox test data immediately.
     * Requires a secret test key (`tybrite_sk_test_*`). Returns `204 No Content`.
     *
     * @returns void
     * @throws ApiError
     */
    public deleteSandboxData(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/sandbox/data',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Fast-forward sandbox time
     * Advances time for your **sandbox** data so time-dependent behavior happens now instead of
     * after a real wait. Back-dates your sandbox abandoned carts, stock reservations and analytics
     * events by `advance_days`, then runs the expiry/rollup jobs — so, for example, abandoned-cart
     * windows elapse, reserved stock is released, and analytics roll forward, all without waiting.
     *
     * Only your sandbox data is affected; live data is never touched. The response reports what was
     * shifted and what was intentionally not (see `not_shifted`).
     *
     * Requires a secret test key (`tybrite_sk_test_*`).
     *
     * @returns any Sandbox time advanced.
     * @throws ApiError
     */
    public advanceSandboxTime({
        requestBody,
    }: {
        requestBody: {
            /**
             * Number of days to fast-forward (1–3650).
             */
            advance_days: number;
        },
    }): CancelablePromise<{
        advanced_days?: number;
        /**
         * Per-area count of sandbox rows moved.
         */
        shifted?: Record<string, any>;
        /**
         * Areas intentionally not affected, with the reason.
         */
        not_shifted?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/time',
            body: requestBody,
            mediaType: 'application/json',
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
     * Replay a sandbox webhook event
     * Re-sends a previously-recorded **sandbox** webhook event to all of your matching, enabled
     * webhook endpoints — so you can re-test your handler without recreating the underlying order,
     * customer, etc. Identify the event either by `event_id`, or by `type` to replay the most
     * recent sandbox event of that type for your store. The original event is unchanged.
     *
     * Requires a secret test key (`tybrite_sk_test_*`).
     *
     * @returns any Replay delivered (per-endpoint results returned).
     * @throws ApiError
     */
    public replaySandboxWebhook({
        requestBody,
    }: {
        requestBody: {
            /**
             * The id of the sandbox webhook event to replay. Provide this or `type`.
             */
            event_id?: string;
            /**
             * Replay the most recent sandbox event of this type (e.g. `order.created`). Provide this or `event_id`.
             */
            type?: string;
        },
    }): CancelablePromise<{
        replayed_event_id?: string;
        results?: Array<Record<string, any>>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/webhooks/replay',
            body: requestBody,
            mediaType: 'application/json',
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
     * Create a sandbox promotion
     * Creates a promotion in your **sandbox** so you can apply a discount to a sandbox order.
     *
     * Promotions are environment-scoped: a test key resolves only sandbox promotions and a live key
     * only real ones. Because promotions are otherwise created by the merchant in their admin — which
     * always writes production — this endpoint is how a promotion comes to exist in your sandbox at
     * all.
     *
     * Every field is optional; the defaults produce an active percentage promotion that starts today
     * and runs for 30 days. The environment is always set to `sandbox` by Galactic Core and is never
     * read from the request body.
     *
     * **Requires a secret test key** (`tybrite_sk_test_*`). Publishable keys and live keys are
     * rejected.
     *
     * @returns any Sandbox promotion created.
     * @throws ApiError
     */
    public seedSandboxPromotion({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Display name. Defaults to a generated `Sandbox promotion …` name.
             */
            name?: string;
            /**
             * `percentage` and `fixed` discount the whole cart. `bogo` and `bundle` carry product
             * lists and are configured by the merchant.
             *
             */
            type?: 'percentage' | 'fixed' | 'bogo' | 'bundle';
            /**
             * Percentage points for `percentage`, else a cash amount.
             */
            value?: number;
            /**
             * Cart subtotal required before the promotion applies.
             */
            min_purchase?: number;
            /**
             * Defaults to today. Cannot be in the past.
             */
            start_date?: string;
            /**
             * Defaults to 30 days from today.
             */
            end_date?: string;
            status?: string;
        },
    }): CancelablePromise<{
        promotion?: SandboxPromotion;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/seed/promotion',
            body: requestBody,
            mediaType: 'application/json',
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
     * Create a sandbox gift card
     * Creates a gift card in your **sandbox**, so a sandbox order can be paid for with one and gift
     * card redemption can be exercised end to end.
     *
     * Gift cards are environment-scoped: the same code is valid for a test key and unknown to a live
     * key. Every field is optional; the defaults issue an active 50.00 digital card expiring in a
     * year, with a generated `SBX-…` code.
     *
     * The environment is always set to `sandbox` by Galactic Core and is never read from the request
     * body. **Requires a secret test key** (`tybrite_sk_test_*`).
     *
     * @returns any Sandbox gift card created.
     * @throws ApiError
     */
    public seedSandboxGiftCard({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Redemption code. Defaults to a generated `SBX-…` code.
             */
            code?: string;
            /**
             * Face value; the opening balance matches it. Must be greater than zero.
             */
            value?: number;
            type?: string;
            /**
             * Defaults to one year from today.
             */
            expiry_date?: string;
        },
    }): CancelablePromise<{
        gift_card?: SandboxGiftCard;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/seed/gift-card',
            body: requestBody,
            mediaType: 'application/json',
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
     * Create a sandbox campaign
     * Creates a marketing campaign in your **sandbox**. A campaign is a budget with a discount
     * attached: it discounts an order like a promotion, but stops once its budget is spent, so this
     * is how budget exhaustion is exercised without spending a real one.
     *
     * Use `applies_to` to scope where the campaign applies — `online` for storefront orders, `pos`
     * for in-store, or `all` for both. A campaign scoped to one channel does not discount the other.
     *
     * Every field is optional; the defaults create an active campaign with a 1000.00 budget and a 10%
     * discount, starting today and running for 30 days. The environment is always set to `sandbox` by
     * Galactic Core and is never read from the request body.
     *
     * **Requires a secret test key** (`tybrite_sk_test_*`).
     *
     * @returns any Sandbox campaign created.
     * @throws ApiError
     */
    public seedSandboxCampaign({
        requestBody,
    }: {
        requestBody?: {
            /**
             * Defaults to a generated `Sandbox campaign …` name.
             */
            name?: string;
            type?: string;
            /**
             * Total spend the campaign may draw down. Must be greater than zero.
             */
            budget?: number;
            discount_type?: 'percentage' | 'fixed_amount';
            /**
             * Must be greater than zero.
             */
            discount_value?: number;
            /**
             * Which sales channel the campaign discounts.
             */
            applies_to?: 'all' | 'online' | 'pos';
            /**
             * Defaults to today. Cannot be in the past.
             */
            start_date?: string;
            /**
             * Defaults to 30 days from today.
             */
            end_date?: string;
            status?: string;
        },
    }): CancelablePromise<{
        campaign?: SandboxCampaign;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/seed/campaign',
            body: requestBody,
            mediaType: 'application/json',
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
     * Create a sandbox B2B buyer account
     * Creates a B2B buyer account in your **sandbox**, which is what makes the `/v1/b2b*` endpoints
     * reachable with a test key.
     *
     * Every B2B endpoint resolves a buyer account for the calling customer before it does anything
     * else, and returns `403` when there isn't one. Buyer accounts are otherwise created by the
     * merchant in their admin, which always writes production — so without this, a test key is
     * refused across the whole B2B surface.
     *
     * Pass the `customer_id` of a customer you created with a test key. A production customer is
     * refused, so a sandbox buyer account can never attach to one of the merchant's real customers.
     *
     * A store still has to have B2B enabled: if it does not, every B2B endpoint keeps returning
     * `404`, and seeding a buyer account does not change that.
     *
     * **Requires a secret test key** (`tybrite_sk_test_*`).
     *
     * @returns any Sandbox B2B buyer account created.
     * @throws ApiError
     */
    public seedSandboxB2BBuyerAccount({
        requestBody,
    }: {
        requestBody: {
            /**
             * A sandbox customer of your store. Must already exist.
             */
            customer_id: string;
            payment_terms?: 'prepaid' | 'net15' | 'net30' | 'net60';
            /**
             * Credit the buyer may draw on. Zero or greater.
             */
            credit_limit?: number;
            tax_exempt?: boolean;
            /**
             * How this buyer checks out. Left unset by default.
             */
            checkout_policy?: 'pay_now' | 'terms' | 'upfront_then_terms';
        },
    }): CancelablePromise<{
        buyer_account?: SandboxB2bBuyerAccount;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/seed/b2b-buyer-account',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `No sandbox customer with that id in this store.`,
                409: `This sandbox customer already has a B2B buyer account.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
