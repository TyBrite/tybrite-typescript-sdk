/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type B2bRfq = {
    id?: string;
    status?: B2bRfq.status;
    line_items?: Array<Record<string, any>>;
    note?: string | null;
    expires_at?: string | null;
    created_at?: string;
};
export namespace B2bRfq {
    export enum status {
        OPEN = 'open',
        QUOTED = 'quoted',
        DECLINED = 'declined',
        EXPIRED = 'expired',
    }
}

