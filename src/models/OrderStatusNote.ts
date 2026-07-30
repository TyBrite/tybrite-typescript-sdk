/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A customer-visible update on an order. One-way (store to shopper) and tied to the order itself —
 * distinct from a messaging thread, which is a two-way conversation.
 *
 */
export type OrderStatusNote = {
    id?: string;
    /**
     * The status the order moved from, when the note accompanied a transition.
     */
    from_status?: string | null;
    /**
     * The status the order moved to, when the note accompanied a transition.
     */
    to_status?: string | null;
    /**
     * The message shown to the shopper.
     */
    body?: string;
    created_at?: string;
};

