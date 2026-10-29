/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CustomerAddress } from '../models/CustomerAddress';
import type { ShopperFulfilment } from '../models/ShopperFulfilment';
import type { ShopperPaymentMethod } from '../models/ShopperPaymentMethod';
import type { ShopperSubscription } from '../models/ShopperSubscription';
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
             * Customer full name. Defaults to the part of the email address before the `@` when omitted.
             */
            name?: string;
            /**
             * Customer phone number. Stored as an empty string when omitted.
             */
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
            /**
             * Whether the customer has opted in to marketing email. Defaults to false
             * (opt-in). Pass the state of your storefront's email opt-in checkbox. When
             * true, the customer is eligible for email subscription in the store's
             * connected marketing tools. It does not cover SMS; see `sms_consent`.
             *
             */
            marketing_consent?: boolean;
            /**
             * Whether the customer has opted in to marketing text messages. A separate
             * opt-in from `marketing_consent`. Defaults to false. Requires a `phone`;
             * the request is rejected with 400 when `true` and no phone number is given.
             *
             */
            sms_consent?: boolean;
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
     * - `x-idp-token` — a raw token from the store's own identity provider.
     * Galactic Core forwards it to the store's configured Auth verifier, which
     * validates it and returns the identity; the resolved customer must equal
     * the `{id}` path parameter. Verification is fail-closed — if the verifier
     * rejects the token or is unreachable, the request is unauthenticated
     * (`401`). Requires the store to have an Auth verifier configured.
     *
     * Mismatch returns `403`. Providing more than one of these headers returns `400`.
     *
     * @returns Customer Success
     * @throws ApiError
     */
    public getCustomer({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        fields,
    }: {
        id: string,
        /**
         * Galactic Core customer session access_token from `/v1/auth/login` or `/v1/auth/verify-otp`. The resolved customer must match the `{id}` path parameter. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO).
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; the resolved customer must match the `{id}` path parameter.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
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
                'x-idp-token': xIdpToken,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
     * - `x-idp-token` — a raw token from the store's own identity provider,
     * which Galactic Core forwards to the store's Auth verifier (fail-closed).
     *
     * Mismatch returns `403`. Providing more than one of these headers returns
     * `400`.
     *
     * Only the profile fields listed in the request body are writable. Any other
     * field on the customer record (for example `tier`, `total_spent`,
     * `total_purchases` or `external_id`) is ignored. A body naming no writable
     * field leaves the customer unchanged and returns it.
     *
     * `email` is writable only when the request is made with a secret key, from
     * the storefront's server after it has verified the new address. With a
     * publishable key, `email` is ignored like any other non-writable field,
     * because guest orders are linked to a customer by email address. Changing
     * `email` to an address another customer of the store already uses returns
     * `409`.
     *
     * @returns any Customer updated successfully
     * @throws ApiError
     */
    public updateCustomer({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        requestBody,
    }: {
        id: string,
        /**
         * Galactic Core customer session access_token. The resolved customer must match the `{id}` path parameter. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion. Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` signed with the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it and returns the identity; the resolved customer must match the `{id}` path parameter.
         *
         * Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        requestBody?: {
            /**
             * Writable with a secret key only; ignored when the request uses a publishable key.
             */
            email?: string;
            phone?: string;
            name?: string;
            address?: string;
            status?: 'active' | 'inactive';
            /**
             * Whether the shopper agrees to receive marketing email from the store.
             */
            marketing_consent?: boolean;
            /**
             * Whether the shopper agrees to receive marketing text messages from the store. Requires the customer to have a phone number; the request is rejected with 400 otherwise.
             */
            sms_consent?: boolean;
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
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
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
     * List a shopper's saved addresses
     * Return the saved addresses in the signed-in shopper's address book.
     * Defaults are returned first.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header; it must resolve to the customer in the `{id}` path parameter,
     * otherwise the request returns `403`.
     *
     * @returns any The shopper's saved addresses.
     * @throws ApiError
     */
    public listAddresses({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose addresses are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose addresses are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        addresses: Array<CustomerAddress>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}/addresses',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Save a new address
     * Add an address to the signed-in shopper's address book. Setting an
     * address as the default for shipping or billing automatically clears any
     * previous default of the same kind, so there is always at most one default
     * per kind.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header; it must resolve to the customer in the `{id}` path parameter,
     * otherwise the request returns `403`.
     *
     * @returns any The saved address.
     * @throws ApiError
     */
    public createAddress({
        id,
        xAuthToken,
        requestBody,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        requestBody: {
            full_name: string;
            line1: string;
            city: string;
            country: string;
            /**
             * Whether this address is usable for shipping, billing, or both.
             */
            address_type?: 'shipping' | 'billing' | 'both';
            /**
             * An optional friendly name, e.g. "Home" or "Office".
             */
            label?: string;
            phone?: string;
            line2?: string;
            state?: string;
            postal_code?: string;
            /**
             * Set as the default address pre-selected for shipping at checkout.
             */
            is_default_shipping?: boolean;
            /**
             * Set as the default address pre-selected for billing at checkout.
             */
            is_default_billing?: boolean;
        },
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose addresses are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose addresses are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        address: CustomerAddress;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/addresses',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update a saved address
     * Update one of the signed-in shopper's saved addresses. Only the fields
     * provided in the request body are changed. Setting an address as the
     * default for shipping or billing automatically clears any previous default
     * of the same kind.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header; it must resolve to the customer in the `{id}` path parameter,
     * otherwise the request returns `403`.
     *
     * @returns any The updated address.
     * @throws ApiError
     */
    public updateAddress({
        id,
        addressId,
        xAuthToken,
        requestBody,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the saved address to update.
         */
        addressId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        requestBody: {
            full_name?: string;
            line1?: string;
            city?: string;
            country?: string;
            address_type?: 'shipping' | 'billing' | 'both';
            label?: string;
            phone?: string;
            line2?: string;
            state?: string;
            postal_code?: string;
            is_default_shipping?: boolean;
            is_default_billing?: boolean;
        },
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose addresses are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose addresses are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        address: CustomerAddress;
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/customers/{id}/addresses/{addressId}',
            path: {
                'id': id,
                'addressId': addressId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete a saved address
     * Remove an address from the signed-in shopper's address book.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header; it must resolve to the customer in the `{id}` path parameter,
     * otherwise the request returns `403`.
     *
     * @returns any The address was deleted.
     * @throws ApiError
     */
    public deleteAddress({
        id,
        addressId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the saved address to delete.
         */
        addressId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose addresses are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose addresses are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        success: boolean;
        message: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/customers/{id}/addresses/{addressId}',
            path: {
                'id': id,
                'addressId': addressId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List a shopper's Subscribe & Save subscriptions
     * Return the signed-in shopper's Subscribe & Save subscriptions at this store, newest first
     * (at most 100). Each subscription lists its items, the interval, the date of the next delivery, the
     * saved card that is charged (when there is one) and the terms the shopper accepted.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The shopper's subscriptions.
     * @throws ApiError
     */
    public listShopperSubscriptions({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        subscriptions: Array<ShopperSubscription>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}/shopper-subscriptions',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a Subscribe & Save subscription
     * Return one of the signed-in shopper's subscriptions.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The subscription.
     * @throws ApiError
     */
    public getShopperSubscription({
        id,
        subscriptionId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        subscription: ShopperSubscription;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Change a Subscribe & Save subscription
     * Change one thing about the shopper's subscription per request: the delivery interval, the
     * items, or where the deliveries go. A change to the items applies from the next delivery; a change to
     * the interval restarts the schedule from today. A change the offer or the store does not allow is refused with `400` or `409`
     * and a message the shopper can read: an interval the offer does not list, an item the offer does not
     * cover, or item changes the store has turned off.
     *
     * Send exactly one group of fields:
     *
     * - `interval_unit` with `interval_count`: the delivery interval, one of the offer's intervals.
     * - `items`: the full list of items for each delivery, 1 to 50 entries. Items left out are removed.
     * - `fulfillment_method` with `shipping_address_id` (one of the shopper's saved addresses) for delivery, or
     * with `pickup_location_id` for pickup, and optionally `shipping_option_id`.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The subscription after the change.
     * @throws ApiError
     */
    public updateShopperSubscription({
        id,
        subscriptionId,
        xAuthToken,
        requestBody,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        requestBody: {
            interval_unit?: 'week' | 'month';
            interval_count?: number;
            items?: Array<{
                product_id: string;
                variant_id?: string;
                quantity: number;
            }>;
            fulfillment_method?: 'delivery' | 'pickup';
            /**
             * One of the shopper's saved addresses. Used with `fulfillment_method` `delivery`.
             */
            shipping_address_id?: string;
            /**
             * A pickup location of the store. Used with `fulfillment_method` `pickup`.
             */
            pickup_location_id?: string;
            shipping_option_id?: string;
        },
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        subscription: ShopperSubscription;
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The subscription cannot be changed in its current state or under the store's settings: it has ended, or the store does not let shoppers change items. The \`message\` says which.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Pause a Subscribe & Save subscription
     * Pause the subscription so no delivery is created while it is paused. Send `until` to resume
     * automatically on that date, from tomorrow up to a year ahead; omit it to stay paused until the shopper
     * resumes. Only an active subscription can be paused, and not while a delivery is being prepared.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The subscription after the change.
     * @throws ApiError
     */
    public pauseShopperSubscription({
        id,
        subscriptionId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        requestBody,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        requestBody?: {
            /**
             * The date to resume on, as `YYYY-MM-DD`, in the store's time zone.
             */
            until?: string;
        },
    }): CancelablePromise<{
        subscription: ShopperSubscription;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}/pause',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The change is not allowed in the subscription's current state. The \`message\` says why.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Resume a paused Subscribe & Save subscription
     * Resume a paused subscription. The next delivery date is calculated from today on the
     * subscription's interval.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The subscription after the change.
     * @throws ApiError
     */
    public resumeShopperSubscription({
        id,
        subscriptionId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        subscription: ShopperSubscription;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}/resume',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The change is not allowed in the subscription's current state. The \`message\` says why.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Skip the next Subscribe & Save delivery
     * Skip the next scheduled delivery. The following delivery keeps the subscription's interval. A
     * delivery that is already being prepared cannot be skipped, and an offer may limit how many deliveries a
     * shopper skips in a year.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The subscription after the change.
     * @throws ApiError
     */
    public skipNextShopperDelivery({
        id,
        subscriptionId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        subscription: ShopperSubscription;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}/skip-next',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The change is not allowed in the subscription's current state. The \`message\` says why.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Cancel a Subscribe & Save subscription
     * Cancel the subscription in one step. The cancellation takes effect today unless the offer requires
     * a minimum number of deliveries that have not yet been made, in which case it takes effect on the date of
     * the last committed delivery and `cancel_effective_on` says when. Send `preview: true` to read that date,
     * and how many deliveries remain, without cancelling, so the shopper is told before they confirm.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The subscription after the cancellation, or the cancellation preview when `preview` is `true`. A subscription whose offer requires a minimum number of deliveries stays active until `cancel_effective_on`, and no later delivery is created after it.
     * @throws ApiError
     */
    public cancelShopperSubscription({
        id,
        subscriptionId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        requestBody,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
        requestBody?: {
            /**
             * Why the shopper is leaving. Optional.
             */
            reason?: string;
            /**
             * Return the effective date without cancelling.
             */
            preview?: boolean;
        },
    }): CancelablePromise<({
        subscription: ShopperSubscription;
    } | {
        preview: boolean;
        /**
         * The date the cancellation would take effect.
         */
        cancel_effective_on: string;
        /**
         * How many deliveries are still owed before the shopper can leave.
         */
        deliveries_remaining: number;
    })> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}/cancel',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The change is not allowed in the subscription's current state. The \`message\` says why.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Add a card to a Subscribe & Save subscription
     * Start adding a replacement card for a subscription. The response is the payment processor's own
     * hosted page; the shopper enters the card there. When the processor confirms the card it is saved and
     * the subscription charges it for every later delivery, and a delivery that was waiting on a declined
     * card is retried with it. The shopper returns to the subscription's manage page afterwards.
     *
     * A store whose processor cannot save cards answers `409`. At most 10 sessions can be started per
     * shopper per hour (`429`).
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any Where to send the shopper to add the card.
     * @throws ApiError
     */
    public startShopperCardUpdate({
        id,
        subscriptionId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the Subscribe & Save subscription.
         */
        subscriptionId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose subscriptions are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose subscriptions are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        /**
         * The payment processor's hosted page for adding a card. Redirect the shopper to it; the card details never pass through your site or this API.
         */
        checkout_url: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/shopper-subscriptions/{subscriptionId}/payment-method',
            path: {
                'id': id,
                'subscriptionId': subscriptionId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The change is not allowed in the subscription's current state. The \`message\` says why.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                503: `Adding a card is not available right now (\`service_unavailable\`). Retry shortly.`,
            },
        });
    }
    /**
     * List a shopper's saved cards
     * Return the cards the signed-in shopper has saved for Subscribe & Save deliveries, newest first.
     * Each card shows its brand, last four digits and expiry; the card number and the processor's references
     * are never returned. Removed and replaced cards are not listed.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The shopper's saved cards.
     * @throws ApiError
     */
    public listShopperPaymentMethods({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose saved cards are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose saved cards are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        payment_methods: Array<ShopperPaymentMethod>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}/payment-methods',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Remove a saved card
     * Remove one of the signed-in shopper's saved cards. The store can no longer charge it. A
     * subscription that was charging this card switches to confirm-and-pay: the shopper is sent a link to pay
     * each delivery until a new card is added.
     *
     * **Customer-self access.** Works with a publishable key (safe from the
     * browser). Provide the shopper's session token in the `x-auth-token`
     * header (or the store's bring-your-own-auth assertion in `x-external-auth`);
     * it must resolve to the customer in the `{id}` path parameter, otherwise the
     * request returns `403`. A subscription that belongs to another shopper reads
     * as `404`.
     *
     * @returns any The card was removed.
     * @throws ApiError
     */
    public deleteShopperPaymentMethod({
        id,
        paymentMethodId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The id of the saved card.
         */
        paymentMethodId: string,
        /**
         * The signed-in shopper's session token, obtained when the shopper logs in. Must resolve to the customer in the `{id}` path parameter.
         */
        xAuthToken: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider (Auth0, Clerk, Cognito, Firebase, NextAuth, SSO). Resolves the shopper whose saved cards are managed.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider (e.g. a Firebase ID token). Galactic Core forwards it to the store's configured Auth verifier, which validates it against the provider and returns the identity; resolves the shopper whose saved cards are managed.
         *
         * Use this when the store wants Galactic Core to verify tokens on its behalf rather than signing an assertion itself. Verification is fail-closed: if the verifier rejects the token or is unreachable, the request is unauthenticated (`401`). Requires an Auth verifier to be configured for the store. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         *
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        success: boolean;
        message: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/customers/{id}/payment-methods/{paymentMethodId}',
            path: {
                'id': id,
                'paymentMethodId': paymentMethodId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List a shopper's delivered items
     * Return the downloads, codes, event tickets and services the shopper has bought, across their
     * orders, newest first. Each purchased unit is one entry, so an order line of three event tickets
     * lists three entries. An entry is `preparing` until the item is delivered, then `delivered`, and
     * `voided` after a refund or return.
     *
     * A `digital` entry lists its files, each with a `download_url`. A `code` entry shows its codes
     * masked and a `reveal_url`; read the codes themselves with
     * `POST /v1/customers/{id}/fulfilments/{fulfilment_id}/reveal`. An `event_ticket` entry lists its
     * tickets with the text to encode as the QR code. A `service` entry carries the merchant's
     * confirmation note.
     *
     * **Customer-self access.** Works with a publishable key (safe from the browser). Provide the
     * shopper's session token in the `x-auth-token` header (or the store's bring-your-own-auth
     * assertion in `x-external-auth`, never both); it must resolve to the customer in the `{id}` path
     * parameter, otherwise the request returns `403`. A Connect key needs the `fulfilment:read` scope.
     *
     * @returns any The shopper's delivered items.
     * @throws ApiError
     */
    public listShopperFulfilments({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        limit = 50,
        orderId,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The signed-in shopper's session token. Must resolve to the customer in the `{id}` path parameter. Send exactly one shopper credential.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Send exactly one shopper credential.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified through the store's Auth verifier (fail-closed). Resolves the same shopper as `x-auth-token`. Send exactly one shopper credential.
         */
        xIdpToken?: string,
        /**
         * Number of entries to return, from 1 to 100.
         */
        limit?: number,
        /**
         * Return only the entries of this order.
         */
        orderId?: string,
    }): CancelablePromise<{
        fulfilments: Array<ShopperFulfilment>;
        /**
         * Whether the shopper has older entries than the ones returned.
         */
        has_more: boolean;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}/fulfilments',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'limit': limit,
                'order_id': orderId,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Reveal the codes of a delivered item
     * Return the codes of one `code` entry in clear, for example a licence key or a voucher code. Each
     * reveal is recorded and is limited per shopper and per address; the response is never cached. An
     * entry that is not the shopper's reads as `404`, and an entry that was refunded or whose codes are
     * not available answers `409` or `410` with a sentence for the shopper.
     *
     * **Customer-self access.** Works with a publishable key (safe from the browser). Provide the
     * shopper's session token in the `x-auth-token` header (or the store's bring-your-own-auth
     * assertion in `x-external-auth`, never both); it must resolve to the customer in the `{id}` path
     * parameter, otherwise the request returns `403`. A Connect key needs the `fulfilment:read` scope.
     *
     * @returns any The entry's codes.
     * @throws ApiError
     */
    public revealShopperFulfilmentCodes({
        id,
        fulfilmentId,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The shopper's customer id.
         */
        id: string,
        /**
         * The entry's `id` from the list of delivered items.
         */
        fulfilmentId: string,
        /**
         * The signed-in shopper's session token. Must resolve to the customer in the `{id}` path parameter. Send exactly one shopper credential.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Send exactly one shopper credential.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified through the store's Auth verifier (fail-closed). Resolves the same shopper as `x-auth-token`. Send exactly one shopper credential.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        codes: Array<{
            /**
             * What the code is for, when the merchant named it.
             */
            label?: string;
            code: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers/{id}/fulfilments/{fulfilment_id}/reveal',
            path: {
                'id': id,
                'fulfilment_id': fulfilmentId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `The codes cannot be shown for this entry, for example because it is not delivered yet.`,
                410: `The entry was refunded or returned, so its codes are no longer available.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                503: `Codes cannot be shown right now. Retry later.`,
            },
        });
    }
    /**
     * Download a file the shopper bought
     * Answer `302` with a short-lived link to one file of a delivered `digital` entry. The response has
     * no body; follow the `Location` header to receive the file. Each request counts towards the
     * download limit and the access period the merchant set for the product.
     *
     * Two ways to call it:
     *
     * - **Link from the delivery email or the entry's `download_url`.** Pass the link token as the `t`
     * query parameter. No API key and no shopper header is sent; the token is the credential, and
     * sending a shopper header with it returns `400`. Requests are limited per address and per entry.
     * - **Shopper credentials.** Omit `t`, send the API key, and send the shopper's session token in
     * `x-auth-token` (or the store's assertion in `x-external-auth`, never both). The shopper must be
     * the buyer of the entry. A Connect key needs the `fulfilment:read` scope.
     *
     * An entry or file that does not exist, a token that does not match and a shopper who is not the
     * buyer all answer the same `404`.
     *
     * @returns void
     * @throws ApiError
     */
    public downloadShopperFulfilmentFile({
        fulfilmentId,
        assetId,
        t,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The entry's `id` from the list of delivered items.
         */
        fulfilmentId: string,
        /**
         * The file's `asset_id` from the entry's `downloads`.
         */
        assetId: string,
        /**
         * The link token from the delivery email or the entry's `download_url`. 16 to 64 characters of letters, digits, `-` and `_`.
         */
        t?: string,
        /**
         * The signed-in shopper's session token. Must be the buyer of the entry. Send exactly one shopper credential, and only when `t` is omitted.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion for stores that manage authentication in an external identity provider.
         *
         * Format: `<base64url(JSON)>.<base64url(HMAC-SHA256(JSON))>` where the JSON is `{ "external_id": "...", "iat": <unix>, "exp": <unix> }` and the HMAC is keyed on the store's `hmac_secret`. Claim lifetime capped at 300 seconds. Send exactly one shopper credential, and only when `t` is omitted.
         *
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified through the store's Auth verifier (fail-closed). Resolves the same shopper as `x-auth-token`. Send exactly one shopper credential, and only when `t` is omitted.
         */
        xIdpToken?: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/fulfilment/downloads/{fulfilment_id}/{asset_id}',
            path: {
                'fulfilment_id': fulfilmentId,
                'asset_id': assetId,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                't': t,
            },
            errors: {
                302: `Redirect to a short-lived link to the file.`,
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed. \`unauthorized\` means the API key is missing or invalid, or the \`x-auth-token\` header is absent. \`invalid_token\` means the \`x-auth-token\` is not a valid sign-in token for this store and environment: expired, revoked, issued by another store, or malformed. A storefront refreshes the session once with \`POST /v1/auth/refresh\` and treats the shopper as signed out if that fails.`,
                404: `The link, the entry or the file is not valid.`,
                410: `The download is over: the purchase was refunded (\`voided\`), the access period ended (\`link_expired\`), the download limit was reached (\`limit_reached\`), or the merchant removed the file (\`asset_unavailable\`).`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                503: `Downloads are not available right now. Retry later.`,
            },
        });
    }
}
