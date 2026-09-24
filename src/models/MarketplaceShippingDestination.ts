/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Where the basket is going, used to price each merchant's delivery rates. Send coordinates, or a place name. When omitted, the `shipping_address` is located instead.
 */
export type MarketplaceShippingDestination = {
    latitude?: number;
    longitude?: number;
    /**
     * A place to locate when coordinates are not known, such as a city or a full address.
     */
    place_name?: string;
    /**
     * ISO 3166-1 alpha-2 country code narrowing `place_name`.
     */
    country_code?: string;
};

