/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontSupportRequest = {
    id: string;
    subject: string;
    /**
     * Where the request stands with the support team, for example `Open`, `Replied`, `Resolved` or `Closed`.
     */
    status: string;
    support_type?: string | null;
    /**
     * When the support team last replied. The reply itself is for the merchant and is not returned.
     */
    last_reply_at?: string | null;
    resolved_at?: string | null;
    created_at: string;
    updated_at: string;
};

