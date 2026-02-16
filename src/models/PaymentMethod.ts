/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentMethod = {
    provider?: PaymentMethod.provider;
    display_name?: string;
    type?: PaymentMethod.type;
    supported_currencies?: Array<string>;
    environment?: PaymentMethod.environment;
    is_configured?: boolean;
};
export namespace PaymentMethod {
    export enum provider {
        CASH = 'cash',
        BANK_TRANSFER = 'bank_transfer',
        STRIPE = 'stripe',
        PAYSTACK = 'paystack',
        MPESA = 'mpesa',
        AIRTEL = 'airtel',
    }
    export enum type {
        MANUAL = 'manual',
        REDIRECT = 'redirect',
        POPUP = 'popup',
        STK_PUSH = 'stk_push',
    }
    export enum environment {
        PRODUCTION = 'production',
        TEST = 'test',
        SANDBOX = 'sandbox',
        STAGING = 'staging',
    }
}

