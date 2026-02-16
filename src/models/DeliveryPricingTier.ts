/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Distance-based delivery pricing tier
 */
export type DeliveryPricingTier = {
    /**
     * Display name for the pricing tier
     */
    tier_name?: string;
    /**
     * Minimum distance in meters (inclusive)
     */
    min_distance_meters?: number;
    /**
     * Maximum distance in meters (inclusive)
     */
    max_distance_meters?: number;
    /**
     * Delivery fee for this tier
     */
    delivery_fee?: number;
    /**
     * Minimum order amount for free delivery (null = no free delivery)
     */
    free_delivery_threshold?: number | null;
    is_active?: boolean;
    /**
     * Tier priority (lower number = higher priority)
     */
    priority?: number;
};

