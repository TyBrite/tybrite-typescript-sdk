/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ConnectTokenResponse = {
    /**
     * Secret key. Store this securely server-side — it will not be shown again.
     * Use it for all server-side API calls on behalf of the merchant.
     *
     */
    sk: string;
    /**
     * Publishable key. Safe to use client-side (browser/mobile).
     * Use it for read-only catalog and cart operations.
     *
     */
    pk: string;
    /**
     * Request-signing secret for THIS connection. Store it securely server-side alongside the
     * secret key — it will not be shown again. Use it to sign write requests that require a
     * signature (creating/updating orders, initializing payments): set `X-Timestamp` to the
     * current Unix time and `X-Signature` to the HMAC-SHA256 of `{timestamp}.{request_body}`
     * using this secret. Scoped to this connection, so it can be rotated or revoked
     * independently of any other integration.
     *
     */
    signing_secret?: string | null;
    /**
     * Unique identifier for this key pair. Store it — required to call `POST /v1/connect/revoke`.
     */
    pair_id: string;
    /**
     * The UUID of the store the merchant authorized access to.
     */
    store_id: string;
    /**
     * Environment the key pair is scoped to.
     */
    environment: ConnectTokenResponse.environment;
    /**
     * The permission scopes granted by the merchant.
     */
    scopes: Array<string>;
    /**
     * Your application's client identifier.
     */
    client_id: string;
    /**
     * Present only if your application registered a webhook URL. When it did, connecting a merchant
     * automatically creates a signed webhook subscription for their store — you do not need to call
     * `createWebhookEndpoint` yourself. The subscription starts receiving events immediately.
     *
     * Verify each inbound event POST with `webhook_endpoint.signing_secret` (this is a **different**
     * secret from `signing_secret` above: `signing_secret` signs YOUR outbound write requests, while
     * `webhook_endpoint.signing_secret` verifies Galactic Core's inbound event POSTs to you). The
     * secret is returned only once, here.
     *
     */
    webhook_endpoint?: {
        /**
         * The webhook endpoint's id.
         */
        id?: string;
        /**
         * The receiver URL events are delivered to (the one your app registered).
         */
        url?: string;
        /**
         * The event types this subscription receives.
         */
        events?: Array<string>;
        /**
         * Secret for verifying inbound event signatures. Store it securely — shown only once.
         *
         */
        signing_secret?: string;
    };
};
export namespace ConnectTokenResponse {
    /**
     * Environment the key pair is scoped to.
     */
    export enum environment {
        SANDBOX = 'sandbox',
        PRODUCTION = 'production',
    }
}

