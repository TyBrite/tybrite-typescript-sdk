/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A payment opened for one of the buyer's invoices. `payment_url` is the hosted page where the buyer pays through one of the supplier's payment providers; it carries its own credential in the fragment and is valid until `expires_at`.
 */
export type B2bInvoicePayment = {
    payment_session_id: string;
    /**
     * The amount this payment is for.
     */
    amount: number;
    currency: string;
    payment_url: string;
    expires_at: string;
};

