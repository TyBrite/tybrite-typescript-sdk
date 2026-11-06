/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StorefrontSupportRequest } from './StorefrontSupportRequest';
export type StorefrontSupportRequestList = {
    data: Array<StorefrontSupportRequest>;
    /**
     * Pass as `cursor` for the next page; `null` on the last page.
     */
    next_cursor: string | null;
};

