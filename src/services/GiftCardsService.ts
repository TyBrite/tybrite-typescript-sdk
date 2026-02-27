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
     * Retrieve gift cards, filtered by customer ID.
     * @returns any Success
     * @throws ApiError
     */
    public listGiftCards({
        customerId,
        fields,
    }: {
        /**
         * Filter gift cards by customer ID. Required for listing a customer's gift cards.
         */
        customerId: string,
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
        gift_cards?: Array<Record<string, any>>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/gift-cards',
            query: {
                'customer_id': customerId,
                'fields': fields,
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
}
