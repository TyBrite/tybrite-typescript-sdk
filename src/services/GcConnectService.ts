/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectAuthorizeResponse } from '../models/ConnectAuthorizeResponse';
import type { ConnectSession } from '../models/ConnectSession';
import type { ConnectTokenResponse } from '../models/ConnectTokenResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GcConnectService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Validate an authorization request
     * Entry point for the Connect your GC Store flow. Validates the
     * `client_id`, `redirect_uri`, and requested `scope` and returns the
     * information the consent page needs to render.
     *
     * **Authentication:** None required — this is a public endpoint.
     * Validation errors are returned as JSON error responses, never
     * as redirects (prevents open redirect attacks).
     *
     * **Rate limit:** 60 requests/hour per IP address.
     *
     * @returns ConnectAuthorizeResponse Request is valid — consent page can render
     * @throws ApiError
     */
    public getConnectAuthorize({
        clientId,
        redirectUri,
        scope,
        state,
        environment = 'sandbox',
    }: {
        /**
         * Registered client identifier assigned when your application was approved.
         */
        clientId: string,
        /**
         * Must exactly match one of your application's registered redirect URIs.
         */
        redirectUri: string,
        /**
         * Space-separated list of permission scopes your application is requesting.
         *
         * Available scopes: `read`, `write`, `orders:read`, `orders:write`,
         * `customers:read`, `customers:write`, `payments:read`, `cart:write`,
         * `cms:read`, `shipping:read`, `pricing:read`
         *
         */
        scope: string,
        /**
         * A random value you generate and store. Galactic Core returns it
         * unchanged in the callback so you can verify it and prevent CSRF attacks.
         *
         */
        state: string,
        /**
         * Whether to connect to the merchant's live store data or test data.
         * Defaults to `sandbox`. Pass `production` once your integration is
         * ready for live data. Merchants see this clearly on the consent screen.
         *
         */
        environment?: 'sandbox' | 'production',
    }): CancelablePromise<ConnectAuthorizeResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/connect/authorize',
            query: {
                'client_id': clientId,
                'redirect_uri': redirectUri,
                'scope': scope,
                'state': state,
                'environment': environment,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Approve the authorization (merchant consent)
     * Called by the Galactic Core consent page after the merchant clicks
     * **Authorize**. Provisions a key pair for the selected store, records the
     * connection, and returns the redirect URL the browser should follow to
     * complete the flow.
     *
     * **Authentication:** The merchant's active Galactic Core session JWT in
     * the `Authorization: Bearer` header. This is not an API key — it is the
     * session token issued by the GC login flow.
     *
     * **Rate limit:** 20 requests/hour per IP address.
     *
     * This endpoint is called by the hosted consent page — you do not call
     * it directly from your integration.
     *
     * @returns any Authorization approved — redirect the browser to `redirect_to`
     * @throws ApiError
     */
    public postConnectAuthorize({
        requestBody,
    }: {
        requestBody: {
            /**
             * Registered client identifier.
             */
            client_id: string;
            /**
             * Must match the URI from the original GET request.
             */
            redirect_uri: string;
            /**
             * Space-separated list of scopes from the original GET request.
             */
            scope: string;
            /**
             * CSRF token from the original GET request.
             */
            state: string;
            /**
             * Environment for the provisioned key pair.
             */
            environment: 'sandbox' | 'production';
            /**
             * UUID of the store the merchant is authorizing access to.
             */
            store_id: string;
        },
    }): CancelablePromise<{
        /**
         * The URL to redirect the merchant's browser to. Contains a
         * short-lived one-time `code` and the original `state` value.
         *
         */
        redirect_to: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/connect/authorize',
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
    /**
     * Exchange authorization code for API keys
     * Exchanges the one-time authorization code (received in the callback
     * redirect) for the merchant's API key pair. Call this from your **server**
     * — never from a browser.
     *
     * **Authentication:** `client_id` and `client_secret` in the request body.
     * Your `client_secret` is issued when your application is approved. Store
     * it securely server-side and never expose it client-side.
     *
     * **The code is single-use and expires after 10 minutes.** Attempting to
     * exchange an already-used or expired code returns an error.
     *
     * **Rate limit:** 10 requests/minute per IP address.
     *
     * **Security:** Always verify that the `state` value in the callback
     * matches what you sent before calling this endpoint.
     *
     * @returns ConnectTokenResponse Code exchanged successfully — store the `sk` securely server-side
     * @throws ApiError
     */
    public connectToken({
        requestBody,
    }: {
        requestBody: {
            /**
             * The one-time authorization code from the callback `?code=` parameter.
             */
            code: string;
            /**
             * Your application's client identifier.
             */
            client_id: string;
            /**
             * Your application's client secret. Never send this from a browser.
             */
            client_secret: string;
            /**
             * Must exactly match the redirect URI used in the original authorization request.
             */
            redirect_uri: string;
        },
    }): CancelablePromise<ConnectTokenResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/connect/token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid code, expired code, already-used code, or mismatched redirect URI.
                Error codes:
                - \`invalid_code\` — code not found or expired
                - \`code_already_used\` — code has already been exchanged
                - \`redirect_uri_mismatch\` — redirect_uri does not match the original request
                - \`invalid_request\` — missing required field
                `,
                401: `Invalid \`client_id\` or \`client_secret\`.`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Revoke a store connection
     * Programmatically revokes a store connection — deactivates the key pair
     * and marks the session as disconnected. Use this when a merchant
     * disconnects your application from their end (e.g. cancels their
     * subscription on your platform).
     *
     * **Authentication:** `client_id` and `client_secret` in the request body.
     *
     * **Note:** Merchants can also disconnect your application at any time from
     * their store's **Settings → Integrations → Connected Apps** panel.
     * Galactic Core handles that automatically — you do not need to call this
     * endpoint for merchant-initiated disconnects.
     *
     * **Rate limit:** 60 requests/hour per IP address.
     *
     * @returns any Connection revoked (or was already revoked)
     * @throws ApiError
     */
    public connectRevoke({
        requestBody,
    }: {
        requestBody: {
            /**
             * The `pair_id` returned by `POST /v1/connect/token`.
             */
            pair_id: string;
            /**
             * Your application's client identifier.
             */
            client_id: string;
            /**
             * Your application's client secret.
             */
            client_secret: string;
            /**
             * Optional reason for revocation. Recorded in the connection log.
             * Common values: `user_disconnected`, `subscription_cancelled`.
             *
             */
            revoke_reason?: string;
        },
    }): CancelablePromise<{
        success?: boolean;
        /**
         * Present only when the connection was already revoked.
         */
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/connect/revoke',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Invalid \`client_id\` or \`client_secret\`.`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List active store connections
     * Returns all active third-party tool connections for the authenticated
     * store. Powers the **Settings → Integrations → Connected Apps** panel.
     *
     * **Authentication:** Secret key (`tybrite_sk_*`) required.
     * Publishable keys return 403.
     *
     * **Rate limit:** 120 requests/hour per API key.
     *
     * @returns any Active connections for this store
     * @throws ApiError
     */
    public listConnectSessions(): CancelablePromise<{
        sessions: Array<ConnectSession>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/connect/sessions',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
