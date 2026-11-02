/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The result of a direct wholesale order. `settlement` is `terms` (a terms invoice was issued — `invoice_id`, `invoice_number`, and `due_date` are present) or `pay_now` (the order awaits payment — `order_id`, `order_number`, and `amount` are present; complete payment through the standard payment flow using `order_id`) or `pending_approval` (the total reaches the store's approval threshold, so no order or invoice exists until a second approver signs it off — `approval_id` is present). A pay-now order held for approval gets its payable order, with `order_id`, once the buyer's approver approves it. Sending the same `Idempotency-Key` again returns the same fields with `idempotent_replay` true, including a purchase order that has since been cancelled. A line may hold at most the store's per-line quantity limit (1,000,000 unless the store sets another); more is refused. `purchase_order_id`, `po_number`, and `currency` are always present.
 */
export type B2bDirectOrder = {
    /**
     * How the order settles — on terms (invoice), pay now (awaiting payment), or held for approval. `awaiting_confirmation` and `rejected` appear only when an `Idempotency-Key` is replayed: the order was approved and waits for the supplier to confirm it, or the buyer's approver rejected it.
     */
    settlement: B2bDirectOrder.settlement;
    /**
     * True when this answer repeats an earlier request with the same Idempotency-Key.
     */
    idempotent_replay?: boolean;
    /**
     * The approval request (pending_approval only).
     */
    approval_id?: string | null;
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
export namespace B2bDirectOrder {
    /**
     * How the order settles — on terms (invoice), pay now (awaiting payment), or held for approval. `awaiting_confirmation` and `rejected` appear only when an `Idempotency-Key` is replayed: the order was approved and waits for the supplier to confirm it, or the buyer's approver rejected it.
     */
    export enum settlement {
        TERMS = 'terms',
        PAY_NOW = 'pay_now',
        PENDING_APPROVAL = 'pending_approval',
        AWAITING_CONFIRMATION = 'awaiting_confirmation',
        REJECTED = 'rejected',
    }
}

