/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReturnItem } from './ReturnItem';
export type Return = {
    id: string;
    /**
     * Human-readable reference for the return.
     */
    return_number: string;
    /**
     * The online order this return is against.
     */
    order_id: string;
    /**
     * Sales channel of the order. Returns through this API are always online orders.
     */
    channel: Return.channel;
    /**
     * Lifecycle of the return. New returns are `pending`; the merchant moves
     * them to `approved`, `processed`, or `cancelled` in their admin.
     *
     */
    status: Return.status;
    /**
     * The resolution requested for the return.
     */
    return_type: Return.return_type;
    /**
     * Why the items were returned.
     */
    reason_code: Return.reason_code;
    /**
     * Free-text explanation, when the customer provided one.
     */
    reason_description?: string | null;
    /**
     * Total value of the items in the return.
     */
    total_return_amount: number;
    /**
     * Amount refunded so far. Zero until the merchant processes the return.
     */
    refund_amount: number;
    /**
     * How the refund was issued, once processed.
     */
    refund_method?: string | null;
    created_at: string;
    /**
     * When the merchant processed the return, when applicable.
     */
    processed_at?: string | null;
    /**
     * Store-credit offer state for this return. When a merchant offers store
     * credit instead of a refund, `status` is `pending` and the shopper can
     * accept it (`POST /v1/returns/{id}/accept-credit`) or request a refund
     * instead (`POST /v1/returns/{id}/request-refund`).
     *
     */
    credit_offer?: {
        /**
         * Current state of the store-credit offer.
         */
        status?: Return.status;
        /**
         * The offered store-credit amount, when an offer is present.
         */
        amount?: number | null;
    };
    items: Array<ReturnItem>;
};
export namespace Return {
    /**
     * Sales channel of the order. Returns through this API are always online orders.
     */
    export enum channel {
        ONLINE = 'online',
    }
    /**
     * Lifecycle of the return. New returns are `pending`; the merchant moves
     * them to `approved`, `processed`, or `cancelled` in their admin.
     *
     */
    export enum status {
        PENDING = 'pending',
        APPROVED = 'approved',
        PROCESSED = 'processed',
        CANCELLED = 'cancelled',
    }
    /**
     * The resolution requested for the return.
     */
    export enum return_type {
        FULL_REFUND = 'full_refund',
        PARTIAL_REFUND = 'partial_refund',
        EXCHANGE = 'exchange',
        STORE_CREDIT = 'store_credit',
    }
    /**
     * Why the items were returned.
     */
    export enum reason_code {
        DAMAGED = 'damaged',
        DEFECTIVE = 'defective',
        WRONG_ITEM = 'wrong_item',
        NOT_AS_DESCRIBED = 'not_as_described',
        WRONG_SIZE = 'wrong_size',
        NO_LONGER_NEEDED = 'no_longer_needed',
        ARRIVED_LATE = 'arrived_late',
        OTHER = 'other',
    }
}

