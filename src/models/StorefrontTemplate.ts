/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontTemplate = {
    template_id: string;
    name: string;
    summary?: string | null;
    /**
     * The version most recently offered.
     */
    version: string;
    preview_url?: string | null;
    /**
     * `offered` awaits the merchant. `accepted` and `declined` are the merchant's answer to the version offered. `withdrawn` means the app took the offer back.
     */
    status: StorefrontTemplate.status;
    /**
     * The version the merchant last accepted. It stays the same while a newer version awaits an answer.
     */
    confirmed_version?: string | null;
    /**
     * When the merchant answered the current offer.
     */
    decided_at?: string | null;
    offered_at: string;
    updated_at: string;
};
export namespace StorefrontTemplate {
    /**
     * `offered` awaits the merchant. `accepted` and `declined` are the merchant's answer to the version offered. `withdrawn` means the app took the offer back.
     */
    export enum status {
        OFFERED = 'offered',
        ACCEPTED = 'accepted',
        DECLINED = 'declined',
        WITHDRAWN = 'withdrawn',
    }
}

