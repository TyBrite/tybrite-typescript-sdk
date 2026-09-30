/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The legal identity behind a store.
 */
export type StoreBusinessIdentity = {
    legal_name?: string | null;
    /**
     * Company or business registration number.
     */
    registration_number?: string | null;
    /**
     * VAT, GST or tax identification number.
     */
    tax_number?: string | null;
    /**
     * ISO 3166-1 alpha-2 code of the country whose law the store's policies are written under.
     */
    country?: string | null;
};

