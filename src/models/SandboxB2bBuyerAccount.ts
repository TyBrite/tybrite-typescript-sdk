/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A B2B buyer account created in the sandbox. Its presence is what makes the `/v1/b2b*` endpoints
 * reachable for that customer with a test key.
 *
 */
export type SandboxB2bBuyerAccount = {
    id?: string;
    customer_id?: string;
    payment_terms?: SandboxB2bBuyerAccount.payment_terms;
    credit_limit?: number;
    /**
     * Rises as the buyer places orders on terms.
     */
    credit_used?: number;
    tax_exempt?: boolean;
    /**
     * A buyer on hold cannot place new orders.
     */
    on_hold?: boolean;
    checkout_policy?: SandboxB2bBuyerAccount.checkout_policy;
    environment?: SandboxB2bBuyerAccount.environment;
};
export namespace SandboxB2bBuyerAccount {
    export enum payment_terms {
        PREPAID = 'prepaid',
        NET15 = 'net15',
        NET30 = 'net30',
        NET60 = 'net60',
    }
    export enum checkout_policy {
        PAY_NOW = 'pay_now',
        TERMS = 'terms',
        UPFRONT_THEN_TERMS = 'upfront_then_terms',
    }
    export enum environment {
        SANDBOX = 'sandbox',
    }
}

