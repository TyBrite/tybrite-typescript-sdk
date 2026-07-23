/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Dispute } from '../models/Dispute';
import type { DisputeReason } from '../models/DisputeReason';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DisputesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List dispute reason codes
     * Returns the set of reason codes accepted when opening a dispute, each with
     * a human-readable label suitable for a dropdown in your storefront UI.
     *
     * **No customer session required** — only a valid API key. Use it to build
     * the reason picker before the shopper is asked to sign in.
     *
     * @returns any Dispute reasons retrieved successfully
     * @throws ApiError
     */
    public listDisputeReasons(): CancelablePromise<{
        data: Array<DisputeReason>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/disputes/reasons',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List the shopper's disputes
     * Lists the disputes opened by the authenticated shopper, newest first.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` (a session token from
     * `POST /v1/auth/login` or `POST /v1/auth/verify-otp`) or `x-external-auth`
     * (a bring-your-own-auth assertion).
     *
     * @returns any Disputes retrieved successfully
     * @throws ApiError
     */
    public listDisputes({
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        status,
        limit = 20,
        storeId,
    }: {
        /**
         * Customer session token from `POST /v1/auth/login` or
         * `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of
         * `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it and returns the identity.
         *
         * Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        /**
         * Filter to disputes in this status.
         */
        status?: 'open' | 'under_review' | 'awaiting_buyer' | 'awaiting_seller' | 'resolved' | 'rejected' | 'cancelled',
        /**
         * Maximum number of disputes to return.
         */
        limit?: number,
        /**
         * **Marketplace operator key only — and required for operator keys.** On a
         * marketplace storefront (which holds the operator key, not a single
         * merchant's key), pass the merchant the shopper is acting at, so the call
         * resolves their disputes at that merchant. Ignored for single-store keys.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: Array<Dispute>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/disputes',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'status': status,
                'limit': limit,
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Open a dispute
     * Opens a dispute against one of the authenticated shopper's own marketplace
     * orders. The dispute is created with `status: "open"` for the operator to
     * review, and a message thread is started so the shopper, merchant, and
     * operator can communicate.
     *
     * A shopper may have only one open dispute per order at a time.
     *
     * **Authentication:** API key in the `Authorization: Bearer` header **and** a
     * customer session — either `x-auth-token` or `x-external-auth`.
     *
     * @returns any Dispute opened successfully
     * @throws ApiError
     */
    public openDispute({
        requestBody,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        storeId,
    }: {
        requestBody: {
            /**
             * The shopper's own order the dispute is about.
             */
            order_id: string;
            /**
             * The dispute reason code (see `GET /v1/disputes/reasons`).
             */
            reason: 'not_received' | 'not_as_described' | 'damaged' | 'wrong_item' | 'quality' | 'unauthorized' | 'other';
            /**
             * Free-text detail. **Required when `reason` is `other`.**
             *
             */
            description?: string;
        },
        /**
         * Customer session token. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it and returns the identity.
         *
         * Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        /**
         * **Marketplace operator key only.** The merchant the shopper is acting at.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        data: {
            id?: string;
            status?: string;
            thread_id?: string | null;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/disputes',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
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
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a dispute
     * Retrieves one of the authenticated shopper's own disputes, including its
     * current status and resolution (once the operator has resolved it).
     *
     * **Authentication:** API key **and** a customer session (`x-auth-token` or
     * `x-external-auth`).
     *
     * @returns any Dispute retrieved successfully
     * @throws ApiError
     */
    public getDispute({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        storeId,
    }: {
        /**
         * The dispute id.
         */
        id: string,
        /**
         * Customer session token. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it and returns the identity.
         *
         * Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        /**
         * **Marketplace operator key only.** The merchant the shopper is acting at.
         */
        storeId?: string,
    }): CancelablePromise<{
        data: Dispute;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/disputes/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Cancel a dispute
     * Cancels one of the authenticated shopper's own disputes while it is still
     * open (before the operator resolves it) — for example if the parcel turned
     * up after all. Once a dispute is resolved or rejected it can no longer be
     * cancelled.
     *
     * **Authentication:** API key **and** a customer session (`x-auth-token` or
     * `x-external-auth`).
     *
     * @returns any Dispute cancelled successfully
     * @throws ApiError
     */
    public cancelDispute({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        storeId,
    }: {
        /**
         * The dispute id.
         */
        id: string,
        /**
         * Customer session token. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it and returns the identity.
         *
         * Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        /**
         * **Marketplace operator key only.** The merchant the shopper is acting at.
         */
        storeId?: string,
    }): CancelablePromise<{
        data: {
            id?: string;
            status?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/disputes/{id}/cancel',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Add a message to a dispute
     * Adds a message from the shopper to the dispute's conversation thread, so
     * the shopper can add detail or respond to the operator or merchant while the
     * dispute is being reviewed. Messages cannot be added once the dispute is
     * closed.
     *
     * **Authentication:** API key **and** a customer session (`x-auth-token` or
     * `x-external-auth`).
     *
     * @returns any Message added successfully
     * @throws ApiError
     */
    public addDisputeMessage({
        id,
        requestBody,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        storeId,
    }: {
        /**
         * The dispute id.
         */
        id: string,
        requestBody: {
            /**
             * The message body.
             */
            message: string;
        },
        /**
         * Customer session token. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it and returns the identity.
         *
         * Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        /**
         * **Marketplace operator key only.** The merchant the shopper is acting at.
         */
        storeId?: string,
    }): CancelablePromise<{
        data: {
            thread_id?: string;
            sent?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/disputes/{id}/messages',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'store_id': storeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                500: `Internal server error`,
            },
        });
    }
}
