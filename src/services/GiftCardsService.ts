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
     * Check gift card balance
     * @returns any Success
     * @throws ApiError
     */
    public checkGiftCard({
        code,
        fields,
    }: {
        code: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `code`, `balance`, `initial_balance`, `currency`, `status`
         * - `expiry_date`, `customer_id`, `issued_date`, `last_used_date`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        valid?: boolean;
        balance?: number;
        status?: string;
        expiry_date?: string;
        maximum_usage_percentage?: number;
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Redeem gift card
     * @returns any Success
     * @throws ApiError
     */
    public redeemGiftCard({
        requestBody,
    }: {
        requestBody: {
            code: string;
            amount: number;
            order_total?: number;
        },
    }): CancelablePromise<{
        success?: boolean;
        amount_redeemed?: number;
        gift_card?: GiftCard;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/gift-cards/redeem',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
