/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A promotion created in the sandbox. Only ever resolved by a test key.
 */
export type SandboxPromotion = {
    id?: string;
    name?: string;
    type?: SandboxPromotion.type;
    /**
     * Percentage points for `percentage`, else a cash amount.
     */
    value?: string;
    min_purchase?: number;
    start_date?: string | null;
    end_date?: string | null;
    status?: string;
    environment?: SandboxPromotion.environment;
};
export namespace SandboxPromotion {
    export enum type {
        PERCENTAGE = 'percentage',
        FIXED = 'fixed',
        BOGO = 'bogo',
        BUNDLE = 'bundle',
    }
    export enum environment {
        SANDBOX = 'sandbox',
    }
}

