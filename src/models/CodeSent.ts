/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The answer to a request for an emailed code. It is identical whether or not the address has an account; an address without an account receives no email.
 */
export type CodeSent = {
    status: CodeSent.status;
    /**
     * Seconds for which the emailed code and link remain valid (900).
     */
    expires_in: number;
};
export namespace CodeSent {
    export enum status {
        CODE_SENT = 'code_sent',
    }
}

