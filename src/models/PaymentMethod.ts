/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentMethod = {
    /**
     * Machine identifier for the payment method — pass this back as `provider` when initializing a payment. The built-in methods are `cash`, `stripe`, `paypal`, `paystack`, `mpesa` and `mpesa_c2b`, but this is **not a closed set**: a store can offer its own payment provider, which appears here under whatever identifier that provider uses (with `custom_provider: true`). Treat the value as an opaque string rather than matching against a fixed list, or a store's own provider will be dropped from your checkout.
     */
    provider?: string;
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
    /**
     * Present and `true` when this method is the store's own payment provider rather than one of the built-in ones. It is initialized and verified through exactly the same endpoints; the flag is there so a storefront can label or order it differently if it wants to.
     */
    custom_provider?: boolean;
};
export namespace PaymentMethod {
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

