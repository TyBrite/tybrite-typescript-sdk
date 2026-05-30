/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create customer
     * Requires secret key
     * @returns any Customer created
     * @throws ApiError
     */
    public createCustomer({
        requestBody,
    }: {
        requestBody: {
            email: string;
            /**
             * Customer full name
             */
            name?: string;
            phone?: string;
            address?: string;
            status?: 'active' | 'inactive';
            join_date?: string;
            /**
             * Optional identifier from an external identity provider (Auth0, Clerk,
             * Cognito, Firebase, NextAuth, etc). Must be unique within the store +
             * environment. Use this to map your upstream user to a Galactic Core
             * customer record without keeping a side-table.
             *
             */
            external_id?: string;
        },
    }): CancelablePromise<{
        customer: Customer;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get customer details
     * Returns the authenticated customer's profile + store-level metrics.
     *
     * **Customer-self authentication required.** Provide **exactly one** of:
     *
     * - `x-auth-token` — Galactic Core customer session JWT (issued by
     * `/v1/auth/login` or `/v1/auth/verify-otp`). The token must resolve to a
     * customer whose `id` equals the `{id}` path parameter.
     * - `x-external-auth` — bring-your-own-auth assertion: a base64url-encoded
     * JSON claim `{external_id, iat, exp}` followed by `.` and the base64url
     * HMAC-SHA256 signature of the claim using the store's `hmac_secret`. The
     * `external_id` must resolve to a customer whose `id` equals the `{id}`
     * path parameter. The claim's lifetime (`exp - iat`) must not exceed 300s.
     *
     * Mismatch on either path returns `403`. Providing both headers returns `400`.
     *
     * @returns Customer Success
     * @throws ApiError
     */
    public getCustomer({
        id,
        xAuthToken,
        xExternalAuth,
        fields,
    }: {
        id: string,
        /**
         * Galactic Core customer session access_token from `/v1/auth/login` or `/v1/auth/verify-otp`. The resolved customer must match the `{id}` path parameter. Provide this OR `x-external-auth`, not both.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO).
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide this OR `x-auth-token`, not both.
         *
         */
        xExternalAuth?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `email`, `phone`, `address`, `status`
         * - `join_date`, `total_purchases`, `last_purchase`
         * - `created_at`, `updated_at`
         * - `store_metrics`, `store_metrics.*`
         *
         */
        fields?: string,
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            query: {
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
     * Update customer
     * Partially update the authenticated customer's profile. Only the fields
     * provided in the request body are updated.
     *
     * **Customer-self authentication required.** Provide **exactly one** of:
     *
     * - `x-auth-token` — Galactic Core customer session JWT.
     * - `x-external-auth` — bring-your-own-auth assertion (HMAC-signed claim
     * carrying `external_id` and a `(iat, exp)` window ≤ 300 seconds).
     *
     * Mismatch returns `403`. Providing both headers returns `400`. Protected
     * fields (`store_id`, `auth_user_id`, `environment`) cannot be modified.
     *
     * @returns any Customer updated successfully
     * @throws ApiError
     */
    public updateCustomer({
        id,
        xAuthToken,
        xExternalAuth,
        requestBody,
    }: {
        id: string,
        /**
         * Galactic Core customer session access_token. The resolved customer must match the `{id}` path parameter. Provide this OR `x-external-auth`, not both.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` signed with the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide this OR `x-auth-token`, not both.
         *
         */
        xExternalAuth?: string,
        requestBody?: {
            email?: string;
            phone?: string;
            name?: string;
            address?: string;
            status?: 'active' | 'inactive';
            /**
             * Optional identifier from an external identity provider. Set or update
             * the link between this Galactic Core customer and your upstream user.
             *
             */
            external_id?: string;
        },
    }): CancelablePromise<{
        customer: Customer;
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/customers/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            body: requestBody,
            mediaType: 'application/json',
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
