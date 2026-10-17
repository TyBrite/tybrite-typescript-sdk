/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * An authentication refusal. `invalid_credentials` is the single answer to a sign-in with an unknown address, a wrong password, or an account that cannot sign in. `password_reset_required` is returned only after the correct password and means the account must set a new one. `invalid_token` means the `x-auth-token` is not a valid sign-in token for this store. `invalid_refresh_token` means the session has ended. `passwordless_disabled` means the store does not offer sign-in by emailed code.
 */
export type AuthError = {
    error: {
        code: AuthError.code;
        message: string;
    };
};
export namespace AuthError {
    export enum code {
        INVALID_CREDENTIALS = 'invalid_credentials',
        PASSWORD_RESET_REQUIRED = 'password_reset_required',
        INVALID_TOKEN = 'invalid_token',
        INVALID_REFRESH_TOKEN = 'invalid_refresh_token',
        PASSWORDLESS_DISABLED = 'passwordless_disabled',
    }
}

