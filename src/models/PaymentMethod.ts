/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentMethod = {
    /**
     * Machine identifier for the payment method — use this in code (e.g. when initializing a payment).
     */
    provider?: PaymentMethod.provider;
    /**
     * Human-friendly label to show the shopper on a "choose payment method" control.
     */
    display_name?: string;
    /**
     * How the method completes, so a storefront knows what to render: `redirect` (send the shopper to a hosted page), `popup` (render an in-page popup such as PayPal Buttons or Paystack inline), `stk_push` (a prompt is pushed to the customer's phone), or `manual` (handled out of band, e.g. cash on delivery or paying a Till/Paybill directly).
     */
    type?: PaymentMethod.type;
    environment?: PaymentMethod.environment;
    is_configured?: boolean;
};
export namespace PaymentMethod {
    /**
     * Machine identifier for the payment method — use this in code (e.g. when initializing a payment).
     */
    export enum provider {
        CASH = 'cash',
        STRIPE = 'stripe',
        PAYPAL = 'paypal',
        PAYSTACK = 'paystack',
        MPESA = 'mpesa',
        MPESA_C2B = 'mpesa_c2b',
    }
    /**
     * How the method completes, so a storefront knows what to render: `redirect` (send the shopper to a hosted page), `popup` (render an in-page popup such as PayPal Buttons or Paystack inline), `stk_push` (a prompt is pushed to the customer's phone), or `manual` (handled out of band, e.g. cash on delivery or paying a Till/Paybill directly).
     */
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

