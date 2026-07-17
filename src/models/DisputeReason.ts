/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DisputeReason = {
    /**
     * Machine value to send as `reason` when opening a dispute.
     */
    code: DisputeReason.code;
    /**
     * Human-readable label suitable for a storefront dropdown.
     */
    label: string;
};
export namespace DisputeReason {
    /**
     * Machine value to send as `reason` when opening a dispute.
     */
    export enum code {
        NOT_RECEIVED = 'not_received',
        NOT_AS_DESCRIBED = 'not_as_described',
        DAMAGED = 'damaged',
        WRONG_ITEM = 'wrong_item',
        QUALITY = 'quality',
        UNAUTHORIZED = 'unauthorized',
        OTHER = 'other',
    }
}

