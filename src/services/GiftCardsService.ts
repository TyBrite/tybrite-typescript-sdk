/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GiftCard } from '../models/GiftCard';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GiftCardsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List gift cards
     * Retrieve gift cards belonging to a specific customer, scoped to the authenticated store.
     *
     * Only **active**, non-zero balance, non-expired gift cards are returned (sorted by balance descending).
     * Accessible with both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys.
     *
     * Responses are cached at the edge for ~60s and support ETag revalidation via `If-None-Match`.
     *
     * @returns any Success
     * @throws ApiError
     */
    public listGiftCards({
        customerId,
        xAuthToken,
        fields,
    }: {
        /**
         * Filter gift cards by customer ID. Required for listing a customer's gift cards.
         */
        customerId: string,
        /**
         * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. Required when customer_id is supplied so the gateway can prove the caller owns that customer record.
         */
        xAuthToken?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `code`, `value`, `balance`, `status`, `type`
         * - `expiry_date`, `customer_id`, `issued_to`, `issued_date`, `last_used`
         * - `minimum_purchase_amount`, `maximum_usage_percentage`, `usage_restrictions`
         * - `redemption_count`, `max_redemptions`, `created_at`, `updated_at`
         *
         * Unknown field names will return a `400` error.
         *
         */
        fields?: string,
    }): CancelablePromise<{
        gift_cards?: Array<GiftCard>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/gift-cards',
            headers: {
                'x-auth-token': xAuthToken,
            },
            query: {
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
     * Check gift card balance
     * Look up a gift card by code and check its validity, balance, expiry and
     * maximum-usage rules. Accessible with both publishable (`tybrite_pk_*`) and
     * secret (`tybrite_sk_*`) API keys.
     *
     * The `valid` flag is `true` only when the gift card is active, has a
     * positive balance, and has not expired.
     *
     * Responses are cached at the edge for ~30s and support ETag revalidation
     * via `If-None-Match`.
     *
     * @returns any Success
     * @throws ApiError
     */
    public checkGiftCard({
        code,
        fields,
    }: {
        /**
         * The unique gift card code to look up (e.g. `GTSA-1B2C-3D4E-5F6G`).
         */
        code: string,
        /**
         * Comma-separated list of fields to include in the embedded `gift_card` object.
         *
         * **Allowed Fields:**
         * - `id`, `code`, `value`, `balance`, `status`, `type`
         * - `expiry_date`, `customer_id`, `issued_to`, `issued_date`, `last_used`
         * - `minimum_purchase_amount`, `maximum_usage_percentage`, `usage_restrictions`
         * - `redemption_count`, `max_redemptions`, `created_at`, `updated_at`
         *
         * Unknown field names will return a `400` error.
         *
         */
        fields?: string,
    }): CancelablePromise<{
        /**
         * True when the gift card is active, has balance > 0, and is not expired.
         */
        valid?: boolean;
        balance?: number;
        /**
         * Lifecycle status. A gift card is only redeemable while `active`.
         */
        status?: string;
        expiry_date?: string | null;
        maximum_usage_percentage?: number | null;
        gift_card?: GiftCard;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/gift-cards/check',
            query: {
                'code': code,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
