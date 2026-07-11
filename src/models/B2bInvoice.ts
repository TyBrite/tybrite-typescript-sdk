/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type B2bInvoice = {
    id?: string;
    purchase_order_id?: string;
    invoice_number?: string;
    status?: B2bInvoice.status;
    currency?: string;
    amount?: number;
    amount_paid?: number;
    tax_amount?: number;
    due_date?: string | null;
    created_at?: string;
};
export namespace B2bInvoice {
    export enum status {
        ISSUED = 'issued',
        PARTIALLY_PAID = 'partially_paid',
        PAID = 'paid',
        OVERDUE = 'overdue',
        VOID = 'void',
    }
}

