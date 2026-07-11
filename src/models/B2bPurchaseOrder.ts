/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type B2bPurchaseOrder = {
    id?: string;
    quote_id?: string | null;
    po_number?: string;
    status?: B2bPurchaseOrder.status;
    line_items?: Array<Record<string, any>>;
    currency?: string;
    subtotal?: number;
    tax_amount?: number;
    total?: number;
    payment_terms?: B2bPurchaseOrder.payment_terms;
    created_at?: string;
};
export namespace B2bPurchaseOrder {
    export enum status {
        ISSUED = 'issued',
        CONFIRMED = 'confirmed',
        PARTIALLY_FULFILLED = 'partially_fulfilled',
        FULFILLED = 'fulfilled',
        CANCELLED = 'cancelled',
    }
    export enum payment_terms {
        PREPAID = 'prepaid',
        NET15 = 'net15',
        NET30 = 'net30',
        NET60 = 'net60',
    }
}

