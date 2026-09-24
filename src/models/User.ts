/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    id?: string;
    email?: string;
    email_confirmed?: boolean;
    /**
     * Whether the account has proven control of its email address by verifying a one-time code or a sign-in link. Returned on marketplace keys. A marketplace links purchases made as a guest with this address to the account only when this is true.
     */
    email_verified?: boolean;
    created_at?: string;
};

