/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketplaceShippingLine } from './MarketplaceShippingLine';
/**
 * What a unified checkout will charge, per merchant, before the shopper pays.
 */
export type MarketplaceCheckoutQuote = {
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

