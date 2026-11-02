/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type B2bApprovalDecisionResponse = {
    data: {
        approval_id: string;
        status: B2bApprovalDecisionResponse.status;
        decided_by?: string;
        /**
         * Present and true when the approval had been decided before this request.
         */
        already_decided?: boolean;
    };
};
export namespace B2bApprovalDecisionResponse {
    export enum status {
        PENDING = 'pending',
        APPROVED = 'approved',
        REJECTED = 'rejected',
    }
}

