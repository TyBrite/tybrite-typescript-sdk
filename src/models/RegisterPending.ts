/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The answer to a sign-up request. It is identical whether or not the address already has an account, and it carries no session: a session is issued by `POST /v1/auth/register/verify`.
 */
export type RegisterPending = {
    status: RegisterPending.status;
    /**
     * The address exactly as it was submitted.
     */
    email: string;
    /**
     * Seconds for which the emailed code and link remain valid (900).
     */
    expires_in: number;
};
export namespace RegisterPending {
    export enum status {
        VERIFICATION_REQUIRED = 'verification_required',
    }
}

