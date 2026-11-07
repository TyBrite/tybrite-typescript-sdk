/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A copy of the personal data a store holds about one shopper, as JSON. `tables` maps each kind of record to the
 * shopper's rows (their profile, addresses, orders and their lines, returns, reviews, messages, wishlist, store
 * credit, consents and the store's custom fields about them). Secrets, access tokens and the store's own cost
 * figures are not included.
 *
 */
export type CustomerDataExport = {
    format: CustomerDataExport.format;
    version: number;
    generated_at: string;
    store_name?: string | null;
    customer_id: string;
    environment?: CustomerDataExport.environment;
    tables: Record<string, Array<Record<string, any>>>;
};
export namespace CustomerDataExport {
    export enum format {
        CUSTOMER_DATA_EXPORT = 'customer-data-export',
    }
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

