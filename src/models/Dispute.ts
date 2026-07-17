/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Dispute = {
    /**
     * The dispute id.
     */
    id: string;
    /**
     * The order the dispute is about.
     */
    order_id?: string | null;
    /**
     * The dispute reason code.
     */
    reason: Dispute.reason;
    /**
     * Free-text detail the shopper provided.
     */
    description?: string | null;
    /**
     * Current dispute status.
     */
    status: Dispute.status;
    /**
     * The resolution the operator applied, once resolved.
     */
    resolution?: Dispute.resolution;
    /**
     * The monetary amount of the resolution, where applicable.
     */
    resolution_amount?: number | null;
    /**
     * The conversation thread for this dispute.
     */
    thread_id?: string | null;
    created_at: string;
    resolved_at?: string | null;
};
export namespace Dispute {
    /**
     * The dispute reason code.
     */
    export enum reason {
        NOT_RECEIVED = 'not_received',
        NOT_AS_DESCRIBED = 'not_as_described',
        DAMAGED = 'damaged',
        WRONG_ITEM = 'wrong_item',
        QUALITY = 'quality',
        UNAUTHORIZED = 'unauthorized',
        OTHER = 'other',
    }
    /**
     * Current dispute status.
     */
    export enum status {
        OPEN = 'open',
        UNDER_REVIEW = 'under_review',
        AWAITING_BUYER = 'awaiting_buyer',
        AWAITING_SELLER = 'awaiting_seller',
        RESOLVED = 'resolved',
        REJECTED = 'rejected',
        CANCELLED = 'cancelled',
    }
    /**
     * The resolution the operator applied, once resolved.
     */
    export enum resolution {
        REFUND_FULL = 'refund_full',
        REFUND_PARTIAL = 'refund_partial',
        STORE_CREDIT = 'store_credit',
        RELEASE_TO_SELLER = 'release_to_seller',
        PENALTY = 'penalty',
        NO_ACTION = 'no_action',
    }
}

