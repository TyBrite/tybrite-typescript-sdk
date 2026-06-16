/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Return } from '../models/Return';
import type { ReturnReason } from '../models/ReturnReason';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ReturnsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List return reason codes
     * Returns the set of return reason codes accepted when lodging a return,
     * each with a human-readable label suitable for a dropdown in your
     * storefront UI.
     *
     * **No customer session required** — only a valid API key. Use it to build
     * the reason picker before the shopper is asked to sign in.
     *
     * @returns any Return reasons retrieved successfully
     * @throws ApiError
     */
    public listReturnReasons(): CancelablePromise<{
        data: Array<ReturnReason>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/returns/reasons',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the customer's store credit balance
     * Returns the authenticated customer's total redeemable store credit balance.
     * Store credit is issued when a customer accepts a store-credit offer on a
     * return, and can be applied at checkout (see `apply_store_credit` on
     * `POST /v1/orders`).
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` or `x-external-auth`.
     *
     * @returns any Store credit balance retrieved
     * @throws ApiError
     */
    public getStoreCredit({
        xAuthToken,
        xExternalAuth,
        storeId,
    }: {
        /**
         * Customer session token. Provide this **or** `x-external-auth`.
         *
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Provide this **or** `x-auth-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * **Marketplace operator key only — and required for operator keys.** The
         * merchant whose store-credit balance to read for the shopper. Ignored for
         * single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: {
            /**
             * Total redeemable store credit balance.
             */
            balance: number;
            /**
             * Currency of the balance, if known.
             */
            currency?: string | null;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/returns/store-credit',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List the signed-in customer's returns
     * Returns the authenticated customer's own return requests, newest first.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` (a session token from
     * `POST /v1/auth/login` or `POST /v1/auth/verify-otp`) or `x-external-auth`
     * (a bring-your-own-auth assertion).
     *
     * A customer only ever sees their own returns; there is no way to read another
     * shopper's returns through this API.
     *
     * @returns any Returns retrieved successfully
     * @throws ApiError
     */
    public listReturns({
        xAuthToken,
        xExternalAuth,
        status,
        limit = 20,
        storeId,
    }: {
        /**
         * Customer session token from `POST /v1/auth/login` or
         * `POST /v1/auth/verify-otp`. Provide this **or** `x-external-auth`.
         *
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide this
         * **or** `x-auth-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * Filter to returns in this status.
         */
        status?: 'pending' | 'approved' | 'processed' | 'cancelled',
        /**
         * Maximum number of returns to return.
         */
        limit?: number,
        /**
         * **Marketplace operator key only — and required for operator keys.** On a
         * marketplace storefront (which holds the operator key, not a single
         * merchant's key), pass the merchant the shopper is acting at, so the call
         * resolves their returns at that merchant. Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: Array<Return>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/returns',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
                'status': status,
                'limit': limit,
                'store_id': storeId,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Lodge a return
     * Lodges a return request against one of the authenticated customer's own
     * online orders. The return is created with `status: "pending"` for the
     * merchant to review.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` or `x-external-auth`.
     *
     * **Order ownership:** `order_id` must reference an online order belonging to
     * the authenticated customer, and each `items[].order_item_id` must be a line
     * on that order. An order that does not exist or does not belong to the
     * customer returns `404`.
     *
     * **Reason description:** `reason_description` is required only when
     * `reason_code` is `other`; for every other reason it is optional.
     *
     * **Returns availability:** if the store has returns turned off, the request
     * returns `422` with code `returns_disabled`.
     *
     * After lodging a return the customer can only track its status — approving,
     * issuing refunds or store credit, restocking, and rejecting items are
     * handled by the merchant in their admin.
     *
     * @returns any Return lodged
     * @throws ApiError
     */
    public createReturn({
        requestBody,
        xAuthToken,
        xExternalAuth,
        storeId,
    }: {
        requestBody: {
            /**
             * The customer's online order the return is for.
             */
            order_id: string;
            /**
             * Why the items are being returned.
             */
            reason_code: 'damaged' | 'defective' | 'wrong_item' | 'not_as_described' | 'wrong_size' | 'no_longer_needed' | 'arrived_late' | 'other';
            /**
             * Free-text explanation. **Required when `reason_code` is `other`**;
             * optional otherwise.
             *
             */
            reason_description?: string;
            /**
             * The resolution the customer is requesting.
             */
            return_type?: 'full_refund' | 'partial_refund' | 'exchange' | 'store_credit';
            /**
             * The order lines being returned.
             */
            items: Array<{
                /**
                 * A line item on the referenced order.
                 */
                order_item_id: string;
                /**
                 * How many units of this line are being returned.
                 */
                quantity: number;
                /**
                 * The condition the item is being returned in.
                 */
                condition?: 'sellable' | 'damaged' | 'defective' | 'expired';
                /**
                 * Optional photo or video URLs evidencing the return.
                 */
                media?: Array<string>;
            }>;
        },
        /**
         * Customer session token from `POST /v1/auth/login` or
         * `POST /v1/auth/verify-otp`. Provide this **or** `x-external-auth`.
         *
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide this
         * **or** `x-auth-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * **Marketplace operator key only — and required for operator keys.** On a
         * marketplace storefront, the merchant the order belongs to. Ignored for
         * single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: Return;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/returns',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
                'store_id': storeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                422: `Returns are not enabled for this store.`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get one of the customer's returns
     * Returns a single return request by ID, including its line items and current
     * status. A return that does not exist or does not belong to the
     * authenticated customer returns `404`.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` or `x-external-auth`.
     *
     * @returns any Return found
     * @throws ApiError
     */
    public getReturn({
        id,
        xAuthToken,
        xExternalAuth,
        storeId,
    }: {
        /**
         * Return UUID.
         */
        id: string,
        /**
         * Customer session token from `POST /v1/auth/login` or
         * `POST /v1/auth/verify-otp`. Provide this **or** `x-external-auth`.
         *
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide this
         * **or** `x-auth-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * **Marketplace operator key only — and required for operator keys.** The
         * merchant the return belongs to. Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: Return;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/returns/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
                'store_id': storeId,
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
     * Accept a store credit offer
     * Accepts a pending store-credit offer on one of the customer's own returns.
     * The store credit is issued to the customer's balance (spendable at checkout)
     * and the return is finalized.
     *
     * Only valid while the return has a pending store-credit offer
     * (`credit_offer.status` is `pending`); otherwise returns `409`.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` or `x-external-auth`.
     *
     * @returns any Store credit accepted and issued
     * @throws ApiError
     */
    public acceptReturnCredit({
        id,
        xAuthToken,
        xExternalAuth,
        storeId,
    }: {
        /**
         * Return UUID.
         */
        id: string,
        /**
         * Provide this **or** `x-external-auth`.
         */
        xAuthToken?: string,
        /**
         * Provide this **or** `x-auth-token`.
         */
        xExternalAuth?: string,
        /**
         * **Marketplace operator key only — and required for operator keys.** The
         * merchant the return belongs to. Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: {
            /**
             * The issued store credit record.
             */
            store_credit_id?: string | null;
            /**
             * Amount of store credit issued.
             */
            amount?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/returns/{id}/accept-credit',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `There is no pending store-credit offer to accept on this return.`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Request a refund instead of store credit
     * Declines a pending store-credit offer on one of the customer's own returns
     * and requests a refund instead. The merchant then handles the refund outside
     * of this API.
     *
     * Only valid while the return has a pending store-credit offer
     * (`credit_offer.status` is `pending`); otherwise returns `409`.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` or `x-external-auth`.
     *
     * @returns any Refund requested
     * @throws ApiError
     */
    public requestReturnRefund({
        id,
        xAuthToken,
        xExternalAuth,
        storeId,
    }: {
        /**
         * Return UUID.
         */
        id: string,
        /**
         * Provide this **or** `x-external-auth`.
         */
        xAuthToken?: string,
        /**
         * Provide this **or** `x-auth-token`.
         */
        xExternalAuth?: string,
        /**
         * **Marketplace operator key only — and required for operator keys.** The
         * merchant the return belongs to. Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: {
            status?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/returns/{id}/request-refund',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `There is no pending store-credit offer on this return.`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
