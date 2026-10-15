/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Error body returned when a request is refused for its email address or password. `invalid_email`
 * refuses a malformed, disposable or example address. `weak_password` refuses a password that breaks
 * the password rule; `details.rule` names the rule. The body is the same whether or not the email
 * already has an account.
 *
 */
export type PasswordPolicyError = {
    error: {
        /**
         * `invalid_request` when `email` or `password` is missing, `invalid_email` for an unusable address,
         * `weak_password` for a password that breaks the rule.
         *
         */
        code: PasswordPolicyError.code;
        message: string;
        /**
         * Present when `code` is `weak_password`.
         */
        details?: {
            /**
             * `too_short` is fewer than 8 characters, `too_long` is more than 72 characters, and `common`
             * is a password found on the list of commonly used passwords (compared without regard to case).
             *
             */
            rule: PasswordPolicyError.rule;
        };
    };
};
export namespace PasswordPolicyError {
    /**
     * `invalid_request` when `email` or `password` is missing, `invalid_email` for an unusable address,
     * `weak_password` for a password that breaks the rule.
     *
     */
    export enum code {
        INVALID_REQUEST = 'invalid_request',
        INVALID_EMAIL = 'invalid_email',
        WEAK_PASSWORD = 'weak_password',
    }
    /**
     * `too_short` is fewer than 8 characters, `too_long` is more than 72 characters, and `common`
     * is a password found on the list of commonly used passwords (compared without regard to case).
     *
     */
    export enum rule {
        TOO_SHORT = 'too_short',
        TOO_LONG = 'too_long',
        COMMON = 'common',
    }
}

