/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Custom polygon delivery zone with specific pricing
 */
export type DeliveryZone = {
    /**
     * Display name for the delivery zone
     */
    zone_name?: string;
    /**
     * Delivery fee for this zone
     */
    delivery_fee?: number;
    /**
     * Minimum order amount for free delivery (null = no free delivery)
     */
    free_delivery_threshold?: number | null;
    is_active?: boolean;
    /**
     * Zone priority (lower number = higher priority when zones overlap)
     */
    priority?: number;
    /**
     * Hex color code for map visualization
     */
    color?: string;
};

