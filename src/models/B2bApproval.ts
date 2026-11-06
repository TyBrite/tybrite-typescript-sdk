/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A purchase held for the buyer's approver. `can_decide` is false for the person who placed the order and once the approval is decided.
 */
export type B2bApproval = {
    approval_id: string;
    subject_type: B2bApproval.subject_type;
    subject_id: string;
    po_number?: string | null;
    /**
     * Major currency units: 2500 is 2500.00 in `currency`.
     */
    amount?: number | null;
    currency?: string | null;
    status: B2bApproval.status;
    requested_at?: string;
    can_decide: boolean;
};
export namespace B2bApproval {
    export enum subject_type {
        PURCHASE_ORDER = 'purchase_order',
        QUOTE = 'quote',
        BUYER_ONBOARDING = 'buyer_onboarding',
    }
    export enum status {
        PENDING = 'pending',
        APPROVED = 'approved',
        REJECTED = 'rejected',
    }
}

