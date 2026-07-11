/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type B2bQuote = {
    id?: string;
    rfq_id?: string | null;
    version?: number;
    status?: B2bQuote.status;
    line_items?: Array<Record<string, any>>;
    currency?: string;
    subtotal?: number;
    tax_amount?: number;
    total?: number;
    valid_until?: string | null;
    created_at?: string;
};
export namespace B2bQuote {
    export enum status {
        DRAFT = 'draft',
        SENT = 'sent',
        ACCEPTED = 'accepted',
        REJECTED = 'rejected',
        EXPIRED = 'expired',
    }
}

