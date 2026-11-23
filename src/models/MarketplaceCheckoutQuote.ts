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
         * What the offer took off this basket in total. An offer applies once to the basket and is shared across the sellers it covers.
         */
        amount?: number;
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
         * This merchant's items before any discount.
         */
        merchandise_subtotal?: number;
        /**
         * Each discount on this merchant's items. A merchant's own promotions apply automatically; a marketplace offer appears with its share of the basket-wide amount.
         */
        discounts?: Array<{
            promotion_id: string;
            name?: string | null;
            amount: number;
            /**
             * Who pays for the discount, the merchant or the marketplace.
             */
            funded_by: 'seller' | 'marketplace';
        }>;
        /**
         * Amount redeemed from a gift card against this merchant's items.
         */
        gift_card_amount?: number;
        /**
         * This merchant's items after every discount.
         */
        merchandise_total?: number;
        shipping?: MarketplaceShippingLine;
    }>;
};

