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
     * **Rate limit:** 60 requests/hour and 30 per 10 minutes per IP address.
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
        storeHint,
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
         * Space-separated list of permission scopes your application is requesting. Scopes are
         * **enforced per request** — a token is rejected with `403 insufficient_scope` if it calls an
         * endpoint it wasn't granted the matching scope for. Request only what your app needs.
         *
         * Available scopes: `read`, `write`, `products:read`, `categories:read`, `pricing:read`,
         * `orders:read`, `orders:write`, `customers:read`, `customers:write`, `payments:read`,
         * `cart:write`, `cms:read`, `shipping:read`, `reviews:read`, `reviews:write`,
         * `gift_cards:read`, `messaging:read`, `messaging:write`, `returns:read`, `returns:write`,
         * `promotions:read`, `recommendations:read`, `search:read`, `store:read`,
         * `shopper_subscriptions:read`, `shopper_subscriptions:write`, `fulfilment:read`
         *
         * Sign-in scopes: `openid`, `email`, `profile` return the signed-in person in the token
         * response. With no other scope the request is identity-only: any user can approve it, no store
         * is linked and no keys are issued. Combined with store scopes the person must own the store
         * they link, and a user who owns none is redirected with `error=access_denied` and
         * `error_description=no_owned_store`. `team:read` lets the key pair call `GET /v1/connect/team`
         * and must accompany another store scope.
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
        /**
         * A store the consent screen preselects. Honoured only when the signed-in user owns that store;
         * otherwise ignored.
         *
         */
        storeHint?: string,
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
                'store_hint': storeHint,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
     * An agency-scoped application can be authorized only by a store that
     * belongs to that agency; a store outside the agency receives `403`.
     *
     * **Authentication:** The merchant's active Galactic Core session JWT in
     * the `Authorization: Bearer` header. This is not an API key — it is the
     * session token issued by the GC login flow.
     *
     * **Rate limit:** 20 requests/hour per IP address, and 20 approvals per hour per merchant.
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
             * Identity-only requests only. When true the request is approved only if the person already
             * agreed to share the same identity scopes with this application; otherwise `409
             * consent_required` is returned so the page shows the consent screen. A request with store
             * scopes is never approved silently.
             *
             */
            silent?: boolean;
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
             * Environment for the provisioned key pair. Required with store scopes.
             */
            environment?: 'sandbox' | 'production';
            /**
             * UUID of the store the merchant is authorizing access to. Required with store scopes. When the
             * request includes the sign-in scopes or `team:read`, the signed-in user must own the store;
             * otherwise `403 access_denied` is returned.
             *
             */
            store_id?: string;
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
                409: `The request needs an explicit approval (\`consent_required\`).`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
     * **Store `sk` and `signing_secret` — both are returned only once.** The
     * `sk` authenticates every request you make for that merchant. The
     * `signing_secret` signs the writes that require a signature (creating and
     * updating orders, initializing payments): set `X-Timestamp` to the current
     * Unix time and `X-Signature` to the base64 HMAC-SHA256 of
     * `{timestamp}.{requestBody}`. Neither value can be retrieved later.
     *
     * **Rate limit:** 60 requests/minute per IP address.
     *
     * **Security:** Always verify that the `state` value in the callback
     * matches what you sent before calling this endpoint.
     *
     * **Attempt limits:** 30 exchanges per `client_id` from one calling address, and 5 per authorization
     * code, in any 10 minutes; beyond that the call returns `429 rate_limited` with a `Retry-After` header.
     * Past 200 exchanges for one `client_id` across all addresses, it is slowed to one every 2 seconds.
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
     * their store's **Integrations → Developer → Connected Apps** panel.
     * Galactic Core handles that automatically — you do not need to call this
     * endpoint for merchant-initiated disconnects.
     *
     * **Rate limit:** 60 requests/hour per IP address.
     *
     * **Attempt limits:** 60 revocations per `client_id` from one calling address in any 10 minutes;
     * beyond that the call returns `429 rate_limited` with a `Retry-After` header. Past 300 for one
     * `client_id` across all addresses, it is slowed to one every 2 seconds.
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List active store connections
     * Returns all active third-party tool connections for the authenticated
     * store. Powers the **Integrations → Developer → Connected Apps** panel.
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List the linked store's team
     * Returns the owner and the active team members of the store the key belongs to, with each person's
     * role. Use it to offer the store's team a place in your application.
     *
     * **Authentication:** The connection's secret key (`tybrite_sk_*`). The connection must have been
     * granted the `team:read` scope at consent; otherwise `403 insufficient_scope` is returned.
     *
     * **Rate limit:** 120 requests/hour per API key.
     *
     * @returns any The store's team
     * @throws ApiError
     */
    public getConnectTeam(): CancelablePromise<{
        members: Array<{
            /**
             * The person's stable user id, the same value as `user.sub` in the token response.
             */
            sub: string;
            email?: string | null;
            name?: string | null;
            /**
             * `owner`, or the member's role on the store (for example `manager` or `cashier`).
             */
            role: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/connect/team',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
