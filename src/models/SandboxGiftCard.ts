/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A gift card created in the sandbox. The code is unknown to a live key.
 */
export type SandboxGiftCard = {
    id?: string;
    code?: string;
    value?: number;
    /**
     * Remaining balance. Equals `value` on a freshly created card.
     */
    balance?: number;
    status?: string;
    type?: string;
    expiry_date?: string | null;
    environment?: SandboxGiftCard.environment;
};
export namespace SandboxGiftCard {
    export enum environment {
        SANDBOX = 'sandbox',
    }
}

