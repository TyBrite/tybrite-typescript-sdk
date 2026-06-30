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

