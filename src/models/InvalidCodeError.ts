/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The code or link was not accepted. On `POST /v1/auth/register/verify`, `details.reason` states why. The other endpoints that take a code never add a reason, because an address without an account receives no code and a reason would show which addresses have accounts.
 */
export type InvalidCodeError = {
    error: {
        code: InvalidCodeError.code;
        message: string;
        details?: {
            /**
             * `expired` is a code past its 15 minutes, `too_many_attempts` is a code that has been tried 5 times, and `wrong` is any other mismatch.
             */
            reason: InvalidCodeError.reason;
        };
    };
};
export namespace InvalidCodeError {
    export enum code {
        INVALID_CODE = 'invalid_code',
    }
    /**
     * `expired` is a code past its 15 minutes, `too_many_attempts` is a code that has been tried 5 times, and `wrong` is any other mismatch.
     */
    export enum reason {
        EXPIRED = 'expired',
        TOO_MANY_ATTEMPTS = 'too_many_attempts',
        WRONG = 'wrong',
    }
}

