/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketplaceShippingRate } from './MarketplaceShippingRate';
/**
 * One merchant's shipping line, as the shopper sees it.
 */
export type MarketplaceShippingLine = {
    merchant_store_id?: string;
    /**
     * What the shopper pays to deliver this merchant's items.
     */
    amount?: number;
    pricing?: MarketplaceShippingLine.pricing;
    /**
     * Who ships these items.
     */
    fulfilled_by?: MarketplaceShippingLine.fulfilled_by;
    is_free?: boolean;
    /**
     * The marketplace's free-shipping threshold: a merchant's items totalling at least this much ship free. Null when the marketplace has none.
     */
    free_threshold?: number | null;
    /**
     * The delivery rate or carrier option that priced this line.
     */
    description?: string | null;
    /**
     * The carrier option charged, when the shopper chose one.
     */
    selected_rate_id?: string | null;
    /**
     * Carrier options for this merchant (quote only), present when the request carried a street address and a `parcel` for this merchant and the merchant ships the items.
     */
    rates?: Array<MarketplaceShippingRate>;
};
export namespace MarketplaceShippingLine {
    export enum pricing {
        SELLER_RATE = 'seller_rate',
        CARRIER_RATE = 'carrier_rate',
        FLAT = 'flat',
        FREE = 'free',
    }
    /**
     * Who ships these items.
     */
    export enum fulfilled_by {
        SELLER = 'seller',
        MARKETPLACE = 'marketplace',
    }
}

