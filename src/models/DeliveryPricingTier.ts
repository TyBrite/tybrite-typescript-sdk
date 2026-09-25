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
     * Start of the range in meters. An address at exactly this distance is in the range.
     */
    min_distance_meters?: number;
    /**
     * End of the range in meters. An address at exactly this distance belongs to the next range, so adjacent ranges can share an end point (0–10,000 and 10,000–50,000).
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

