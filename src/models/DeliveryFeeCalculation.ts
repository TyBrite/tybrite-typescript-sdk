/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Calculated delivery fee based on customer location and order total
 */
export type DeliveryFeeCalculation = {
    /**
     * Calculated delivery fee
     */
    fee?: number;
    /**
     * Name of delivery zone if customer is in a zone
     */
    zone_name?: string | null;
    /**
     * Name of pricing tier if distance-based pricing was applied
     */
    tier_name?: string | null;
    /**
     * Distance from store to customer in meters (null if zone-based)
     */
    distance_meters?: number | null;
    /**
     * Whether delivery is free due to order threshold
     */
    is_free?: boolean;
    /**
     * Human-readable explanation of the fee
     */
    reason?: string;
    /**
     * Pricing rule that was applied:
     * - zone: Customer is within a custom delivery zone
     * - distance: Distance-based tier pricing was used
     * - default: Fallback pricing (no zone or tier matched)
     */
    applied_rule?: DeliveryFeeCalculation.applied_rule;
    /**
     * Customer coordinates (geocoded if place_name was provided)
     */
    coordinates?: {
        /**
         * Customer latitude
         */
        latitude?: number;
        /**
         * Customer longitude
         */
        longitude?: number;
    };
    /**
     * Which source produced the result — the store's delivery `zone`/`tier` rules, live carrier `shippo` rates, or `none` (unconfigured).
     */
    rate_source?: DeliveryFeeCalculation.rate_source;
    /**
     * Live multi-carrier rate options, present only when the store has carrier shipping connected AND a destination address + parcel were supplied. Each entry is a real carrier quote; pass a chosen `rate_id` to buy a label or place an order with that rate.
     */
    rates?: Array<{
        /**
         * The chosen carrier rate. Pass as shippo_rate_id on createOrder so the order's shipping amount is validated against this real quote.
         */
        rate_id?: string;
        provider?: string;
        service?: string | null;
        amount?: number;
        currency?: string;
        estimated_days?: number | null;
    }>;
};
export namespace DeliveryFeeCalculation {
    /**
     * Pricing rule that was applied:
     * - zone: Customer is within a custom delivery zone
     * - distance: Distance-based tier pricing was used
     * - default: Fallback pricing (no zone or tier matched)
     */
    export enum applied_rule {
        ZONE = 'zone',
        DISTANCE = 'distance',
        DEFAULT = 'default',
    }
    /**
     * Which source produced the result — the store's delivery `zone`/`tier` rules, live carrier `shippo` rates, or `none` (unconfigured).
     */
    export enum rate_source {
        ZONE = 'zone',
        TIER = 'tier',
        SHIPPO = 'shippo',
        NONE = 'none',
    }
}

