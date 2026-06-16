/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReturnReason = {
    /**
     * Machine value to send as reason_code when lodging a return.
     */
    code: ReturnReason.code;
    /**
     * Human-readable label suitable for a storefront dropdown.
     */
    label: string;
};
export namespace ReturnReason {
    /**
     * Machine value to send as reason_code when lodging a return.
     */
    export enum code {
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

