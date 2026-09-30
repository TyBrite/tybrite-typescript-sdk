/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A postal address. Members the merchant left blank are null.
 */
export type StoreAddress = {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    /**
     * State, province or county.
     */
    region?: string | null;
    postal_code?: string | null;
    /**
     * ISO 3166-1 alpha-2 country code.
     */
    country?: string | null;
};

