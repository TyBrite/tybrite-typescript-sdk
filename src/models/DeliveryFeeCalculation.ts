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
}

