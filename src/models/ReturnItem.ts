/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReturnItem = {
    id: string;
    /**
     * The order line this returned item came from.
     */
    order_item_id: string;
    /**
     * Name of the returned product at the time of the order.
     */
    product_name: string;
    /**
     * Number of units being returned from this line.
     */
    quantity: number;
    /**
     * Unit price of the item on the original order.
     */
    unit_price: number;
    /**
     * Amount attributed to this line in the return.
     */
    return_amount: number;
    /**
     * Condition the item is being returned in.
     */
    condition: ReturnItem.condition;
    /**
     * Per-item review status. Items start `pending`; the merchant approves or
     * rejects each line in their admin.
     *
     */
    status: ReturnItem.status;
    /**
     * Reason the merchant rejected this line, when rejected.
     */
    rejection_reason?: string | null;
    /**
     * Photo or video URLs the customer attached as evidence.
     */
    media?: Array<string>;
};
export namespace ReturnItem {
    /**
     * Condition the item is being returned in.
     */
    export enum condition {
        SELLABLE = 'sellable',
        DAMAGED = 'damaged',
        DEFECTIVE = 'defective',
        EXPIRED = 'expired',
    }
    /**
     * Per-item review status. Items start `pending`; the merchant approves or
     * rejects each line in their admin.
     *
     */
    export enum status {
        PENDING = 'pending',
        APPROVED = 'approved',
        REJECTED = 'rejected',
    }
}

