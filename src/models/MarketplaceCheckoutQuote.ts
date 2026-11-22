/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketplaceShippingLine } from './MarketplaceShippingLine';
/**
 * What a unified checkout will charge, per merchant, before the shopper pays.
 */
export type MarketplaceCheckoutQuote = {
    /**
     * The part of `discount_total` the marketplace funds through its own offers (in `offers`).
     */
    operator_funded_discount?: number;
    /**
     * The marketplace's own offers that priced this basket, so a storefront can name each one and count down to its end.
     */
    offers?: Array<{
        id?: string;
        name?: string;
        type?: 'percentage' | 'fixed' | 'bogo' | 'bundle';
        value?: number | null;
        /**
         * When the offer starts (UTC).
         */
        starts_at?: string | null;
        /**
         * When the offer ends (UTC).
         */
        ends_at?: string | null;
        funded_by?: 'marketplace';
    }>;
    currency?: string;
    /**
     * The basket's merchandise before any discount.
     */
    subtotal?: number;
    discount_total?: number;
    /**
     * Shipping across every merchant.
     */
    shipping_total?: number;
    /**
     * What the checkout will charge before any wallet balance: merchandise after discounts plus shipping.
     */
    total_amount?: number;
    sellers?: Array<{
        merchant_store_id?: string;
        /**
         * This merchant's items after every discount.
         */
        merchandise_total?: number;
        shipping?: MarketplaceShippingLine;
    }>;
};

