/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The result of a direct wholesale order. `settlement` is `terms` (a terms invoice was issued — `invoice_id`, `invoice_number`, and `due_date` are present) or `pay_now` (the order awaits payment — `order_id`, `order_number`, and `amount` are present; complete payment through the standard payment flow using `order_id`). `purchase_order_id`, `po_number`, and `currency` are always present.
 */
export type B2bDirectOrderResponse = {
    /**
     * How the order settles — on terms (invoice) or pay now (awaiting payment).
     */
    settlement: B2bDirectOrderResponse.settlement;
    purchase_order_id: string;
    po_number: string;
    currency?: string;
    /**
     * The order total, tax included (present on a terms order).
     */
    total?: number;
    /**
     * The tax on the order, resolved server-side — jurisdiction-accurate when a shipping address is supplied, otherwise the store's configured rate, and zero for a tax-exempt buyer.
     */
    tax_amount?: number;
    /**
     * The issued invoice (terms only).
     */
    invoice_id?: string | null;
    /**
     * The issued invoice number (terms only).
     */
    invoice_number?: string | null;
    /**
     * When the invoice is due (terms only).
     */
    due_date?: string | null;
    /**
     * The order to pay (pay-now only).
     */
    order_id?: string | null;
    /**
     * The order number (pay-now only).
     */
    order_number?: string | null;
    /**
     * The amount to pay, tax included (present on a pay-now order).
     */
    amount?: number;
};
export namespace B2bDirectOrderResponse {
    /**
     * How the order settles — on terms (invoice) or pay now (awaiting payment).
     */
    export enum settlement {
        TERMS = 'terms',
        PAY_NOW = 'pay_now',
    }
}

