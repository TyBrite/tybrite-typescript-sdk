/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One carrier option for a merchant's delivery.
 */
export type MarketplaceShippingRate = {
    rate_id?: string;
    provider?: string;
    service?: string | null;
    amount?: number;
    currency?: string;
    estimated_days?: number | null;
    source?: MarketplaceShippingRate.source;
};
export namespace MarketplaceShippingRate {
    export enum source {
        SHIPPO = 'shippo',
        CUSTOM = 'custom',
    }
}

