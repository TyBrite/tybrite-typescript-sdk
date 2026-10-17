/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A shopper's session with the store: a short-lived sign-in token and a refresh token. Store both values and replace them on every refresh.
 */
export type ShopperSession = {
    /**
     * The store's sign-in token. Sent as the `x-auth-token` header on customer-self endpoints. It is accepted only by the store (and environment) that issued it.
     */
    access_token: string;
    /**
     * Opaque token that begins with `gcsr_`. It is valid for 30 days from its last use and for one use: `POST /v1/auth/refresh` returns a replacement, and presenting an earlier one again ends the whole session.
     */
    refresh_token: string;
    /**
     * Lifetime of `access_token` in seconds (900).
     */
    expires_in: number;
    /**
     * Unix time at which `access_token` stops being accepted.
     */
    expires_at: number;
    /**
     * Always `shopper`.
     */
    token_type: ShopperSession.token_type;
};
export namespace ShopperSession {
    /**
     * Always `shopper`.
     */
    export enum token_type {
        SHOPPER = 'shopper',
    }
}

