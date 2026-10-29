/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscribeSaveInterval } from './SubscribeSaveInterval';
/**
 * The price per delivery of a set of items under one Subscribe & Save offer. All amounts are in the
 * smallest unit of the store's currency (cents for a two-decimal currency).
 *
 * `available` is `false` when the offer is not live or covers none of the items; no prices are returned
 * then. Only the items the offer covers are listed in `covered_items` and priced; the other items of a
 * basket are charged normally.
 *
 */
export type SubscribeSaveQuote = {
    available: boolean;
    offer_id?: string;
    /**
     * ISO 4217 currency code.
     */
    currency?: string;
    covered_items?: Array<{
        product_id: string;
        variant_id: string | null;
        quantity: number;
        /**
         * The catalogue price of one unit before the offer's discount.
         */
        unit_cents: number;
    }>;
    /**
     * The covered items' total before any discount.
     */
    subtotal_cents?: number;
    /**
     * The discount on the first delivery.
     */
    first_order_discount_cents?: number;
    /**
     * The discount on each later delivery.
     */
    renewal_discount_cents?: number;
    /**
     * What the covered items cost on the first delivery.
     */
    first_order_price_cents?: number;
    /**
     * What the covered items cost on each later delivery, at today's catalogue prices.
     */
    renewal_price_cents?: number;
    free_shipping?: boolean;
    min_cycles?: number;
    intervals?: Array<SubscribeSaveInterval>;
    stacks_with_promotions?: boolean;
    /**
     * The interval that was asked about, echoed when `interval_unit` and `interval_count` were sent.
     */
    interval?: SubscribeSaveInterval;
};

