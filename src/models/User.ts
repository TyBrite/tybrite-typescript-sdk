/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The shopper's sign-in identity.
 */
export type User = {
    /**
     * The shopper identity. It is the `sub` of the store's sign-in token.
     */
    id: string;
    email: string;
    /**
     * Whether the shopper has proven control of the address with a one-time code or link.
     */
    email_confirmed: boolean;
    /**
     * Same value as `email_confirmed`. A marketplace links purchases made as a guest with this address to the account only when this is true.
     */
    email_verified: boolean;
    /**
     * Whether the account has a password. An account created without one signs in by emailed code and can set a password with `POST /v1/auth/password/change`.
     */
    has_password: boolean;
};

