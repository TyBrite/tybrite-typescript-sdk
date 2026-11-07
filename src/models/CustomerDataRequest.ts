/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A shopper's request for a copy of their data (`export`) or for the deletion of their account and the personal
 * data the store holds about them (`erasure`). The store decides how requests are handled: either each request
 * waits for the store to approve or decline it, or it completes as soon as it is made.
 *
 */
export type CustomerDataRequest = {
    id: string;
    kind: CustomerDataRequest.kind;
    /**
     * `requested` waits for the store. `approved` (export) means the copy is ready to download. `completed` means
     * the copy was downloaded at least once, or the erasure has been carried out. `declined` carries the store's
     * reason in `decline_reason`.
     *
     */
    status: CustomerDataRequest.status;
    /**
     * How the store handled requests when this one was made. `self_service` requests complete at once.
     */
    handling: CustomerDataRequest.handling;
    requested_at: string;
    decided_at?: string | null;
    completed_at?: string | null;
    /**
     * The store's reason, written for the shopper. Present only when the request was declined.
     */
    decline_reason?: string | null;
    /**
     * For an export, the end of the download window (seven days after approval).
     */
    download_expires_at?: string | null;
    /**
     * True while an approved export can be downloaded.
     */
    download_available: boolean;
};
export namespace CustomerDataRequest {
    export enum kind {
        EXPORT = 'export',
        ERASURE = 'erasure',
    }
    /**
     * `requested` waits for the store. `approved` (export) means the copy is ready to download. `completed` means
     * the copy was downloaded at least once, or the erasure has been carried out. `declined` carries the store's
     * reason in `decline_reason`.
     *
     */
    export enum status {
        REQUESTED = 'requested',
        APPROVED = 'approved',
        DECLINED = 'declined',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
    /**
     * How the store handled requests when this one was made. `self_service` requests complete at once.
     */
    export enum handling {
        REQUEST = 'request',
        SELF_SERVICE = 'self_service',
    }
}

