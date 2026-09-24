/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A choice for one merchant's delivery. `parcel` asks for that merchant's carrier options in a quote; `rate_id` chooses one of the options a quote returned. The amount is never sent: the option is checked again against the merchant's carrier account and charged at its current price.
 */
export type MarketplaceShippingSelection = {
    merchant_store_id: string;
    /**
     * The parcel for this merchant's items, needed for carrier options.
     */
    parcel?: {
        length: string;
        width: string;
        height: string;
        distance_unit: string;
        weight: string;
        mass_unit: string;
    };
    /**
     * A `rate_id` from this merchant's `rates` in a quote.
     */
    rate_id?: string;
    /**
     * The `source` of the chosen rate, as the quote returned it.
     */
    rate_source?: MarketplaceShippingSelection.rate_source;
};
export namespace MarketplaceShippingSelection {
    /**
     * The `source` of the chosen rate, as the quote returned it.
     */
    export enum rate_source {
        SHIPPO = 'shippo',
        CUSTOM = 'custom',
    }
}

