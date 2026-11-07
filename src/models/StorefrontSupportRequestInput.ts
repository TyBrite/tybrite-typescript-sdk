/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontSupportRequestInput = {
    /**
     * One line, as the merchant will read it in their Support list.
     */
    subject: string;
    /**
     * What happened and what the app already tried. The merchant's support team reads it.
     */
    body: string;
    /**
     * What the request is about. Omit it when none fits.
     */
    support_type?: StorefrontSupportRequestInput.support_type;
    /**
     * Names this attempt, so a retry returns the request already opened instead of opening another. Required, here or in the `Idempotency-Key` header (the same value if both are sent).
     */
    idempotency_key?: string;
};
export namespace StorefrontSupportRequestInput {
    /**
     * What the request is about. Omit it when none fits.
     */
    export enum support_type {
        PAYMENTS_BILLING = 'payments_billing',
        ORDERS_FULFILMENT = 'orders_fulfilment',
        PRODUCTS_CATALOGUE = 'products_catalogue',
        INTEGRATIONS_SYNC = 'integrations_sync',
        ACCOUNT_ACCESS = 'account_access',
        SOMETHING_ELSE = 'something_else',
    }
}

