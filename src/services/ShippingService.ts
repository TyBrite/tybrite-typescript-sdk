/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryFeeCalculation } from '../models/DeliveryFeeCalculation';
import type { DeliveryPricingTier } from '../models/DeliveryPricingTier';
import type { DeliveryZone } from '../models/DeliveryZone';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ShippingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get shipping zones and pricing tiers
     * Retrieve available delivery zones and distance-based pricing tiers for the store.
     *
     * **Returns:**
     * - **pricing_tiers**: Distance-based pricing (e.g., 0-5km: KES 50, 5-10km: KES 100)
     * - **delivery_zones**: Custom polygon zones (e.g., CBD Zone: KES 150)
     *
     * **Dual Pricing System:**
     * - Distance-based tiers are automatically applied based on calculated distance
     * - Custom zones override tiers when customer is inside a defined zone
     * - Both can have free delivery thresholds based on order total
     *
     * **Caching:**
     * - This endpoint uses ETag caching (60 seconds)
     * - Supports If-None-Match header for conditional requests
     * @returns any Shipping zones and pricing tiers
     * @throws ApiError
     */
    public getShippingZones(): CancelablePromise<{
        pricing_tiers?: Array<DeliveryPricingTier>;
        delivery_zones?: Array<DeliveryZone>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/shipping/zones',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Calculate shipping fee
     * Calculate the delivery fee for a customer based on their location and order total.
     *
     * **Location Input Options:**
     * - **Option 1:** Provide `latitude` and `longitude` (GPS coordinates)
     * - **Option 2:** Provide `place_name` (e.g., "Westlands, Nairobi, Kenya") - automatically geocoded using Nominatim
     *
     * **Calculation Logic:**
     * 1. If `place_name` provided, geocode to coordinates internally
     * 2. Check if customer is within any active delivery zone (by priority)
     * 3. If in zone: Apply zone fee (unless order reaches free_delivery_threshold)
     * 4. If not in zone: Calculate distance and match to pricing tier
     * 5. Apply tier fee (unless order reaches free_delivery_threshold)
     * 6. Return detailed breakdown with applied rule and coordinates
     *
     * **Response Fields:**
     * - applied_rule: Indicates which pricing system was used (zone, distance, or default)
     * - zone_name: Populated if zone-based, null otherwise
     * - tier_name: Populated if distance-based, null otherwise
     * - distance_meters: Calculated distance (null if zone-based)
     * - is_free: Whether free delivery was applied
     * - coordinates: Always returned (latitude/longitude) for frontend caching
     *
     * This is a **read-only operation** (safe for publishable keys).
     * @returns DeliveryFeeCalculation Shipping fee calculated successfully
     * @throws ApiError
     */
    public calculateShipping({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer latitude (WGS84)
             */
            latitude?: number;
            /**
             * Customer longitude (WGS84)
             */
            longitude?: number;
            /**
             * Total order amount (used for free delivery threshold check)
             */
            order_total?: number;
        },
    }): CancelablePromise<DeliveryFeeCalculation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/shipping/calculate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `No shipping configuration available`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
