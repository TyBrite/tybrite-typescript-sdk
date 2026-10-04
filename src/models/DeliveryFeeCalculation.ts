/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingOption } from './ShippingOption';
/**
 * The store's delivery charge for a location and order total. An address is priced by the first zone that contains it, otherwise by the distance rate for its distance from the store, otherwise by the store's "everywhere else" rate. A store with no delivery rates at all charges nothing (`applied_rule: none`). `options` lists every delivery option and pickup location the shopper can choose between. When the store does not deliver to the address but offers pickup, `deliverable` is false, `fee` is null and `options` holds the pickup locations only; when it offers neither, the answer is `400 shipping_not_deliverable` instead.
 */
export type DeliveryFeeCalculation = {
    /**
     * The standard delivery charge (the `place` option's fee), in `currency`. Null on a carrier-options-only request (no location was sent) and when the store does not deliver to the address but offers pickup (`deliverable: false`).
     */
    fee?: number | null;
    /**
     * The currency of `fee` and `free_threshold` — the store's own currency.
     */
    currency?: string | null;
    /**
     * The zone that priced the address, when a zone did.
     */
    zone_name?: string | null;
    /**
     * The distance rate that priced the address, when one did.
     */
    tier_name?: string | null;
    /**
     * Distance from the store to the address in meters, when it was measured.
     */
    distance_meters?: number | null;
    /**
     * True when no delivery charge applies to this order (`fee` is 0).
     */
    is_free?: boolean;
    /**
     * The order total from which the matched rate delivers free, or null when it has none.
     */
    free_threshold?: number | null;
    /**
     * Whether the store has any delivery rates. False means delivery is not charged through the store's rates at all.
     */
    configured?: boolean | null;
    /**
     * A short, shopper-readable explanation of the charge.
     */
    reason?: string;
    /**
     * Which of the store's rates priced the address:
     * - zone: a delivery zone contains it
     * - distance: a distance rate matched its distance from the store
     * - fallback: the store's "everywhere else" rate
     * - none: the store has no delivery rates (fee 0), or a carrier-options-only request
     */
    applied_rule?: DeliveryFeeCalculation.applied_rule;
    /**
     * The address's coordinates (geocoded when a place_name was sent), with the country and postcode used to match zones when known.
     */
    coordinates?: {
        latitude?: number;
        longitude?: number;
        country_code?: string | null;
        postal_code?: string | null;
    };
    /**
     * Whether the store delivers to the address. False when only pickup is offered for it — because the address is outside the store's delivery area, or because an item in the basket can only be collected.
     */
    deliverable?: boolean;
    /**
     * A limit the basket's items place on how the order can be received, from the store's rules for
     * product categories:
     * - none: no limit
     * - local_only: delivered only within the store's map zones and distance tiers, not to country or
     * postcode zones or the "everywhere else" rate
     * - pickup_only: collection only; no delivery option is offered
     */
    restriction?: DeliveryFeeCalculation.restriction;
    /**
     * Every way the shopper can receive the order: the delivery options first (`place`, then any named options), then the pickup locations, nearest first when the location is known. Absent on a carrier-options-only request.
     */
    options?: Array<ShippingOption>;
    /**
     * When the store delivers from whichever of its locations is nearest the shopper, the location this order would leave from; distance tiers are measured from it. Null otherwise.
     */
    fulfilled_from?: any | null;
    /**
     * Which source produced the result — the store's `zone`, distance `tier` or `fallback` rate, a connected carrier account (`shippo`), the store's custom shipping extension (`custom`), or `none`.
     */
    rate_source?: DeliveryFeeCalculation.rate_source;
    /**
     * Carrier options, present when the store has a carrier account or a custom shipping extension AND a destination address + parcel were sent. Each is a real quote. To order with one, pass its `rate_id` and `source` as `shipping_rate_id` / `shipping_rate_source` on createOrder, where the option is fetched again from its source before it is charged.
     */
    rates?: Array<{
        /**
         * The carrier option's id, as issued by its source.
         */
        rate_id?: string;
        provider?: string | null;
        service?: string | null;
        amount?: number;
        currency?: string;
        estimated_days?: number | null;
        /**
         * Where the option came from — the store's carrier account, or its custom shipping extension.
         */
        source?: 'shippo' | 'custom';
    }>;
};
export namespace DeliveryFeeCalculation {
    /**
     * Which of the store's rates priced the address:
     * - zone: a delivery zone contains it
     * - distance: a distance rate matched its distance from the store
     * - fallback: the store's "everywhere else" rate
     * - none: the store has no delivery rates (fee 0), or a carrier-options-only request
     */
    export enum applied_rule {
        ZONE = 'zone',
        DISTANCE = 'distance',
        FALLBACK = 'fallback',
        NONE = 'none',
    }
    /**
     * A limit the basket's items place on how the order can be received, from the store's rules for
     * product categories:
     * - none: no limit
     * - local_only: delivered only within the store's map zones and distance tiers, not to country or
     * postcode zones or the "everywhere else" rate
     * - pickup_only: collection only; no delivery option is offered
     */
    export enum restriction {
        NONE = 'none',
        LOCAL_ONLY = 'local_only',
        PICKUP_ONLY = 'pickup_only',
    }
    /**
     * Which source produced the result — the store's `zone`, distance `tier` or `fallback` rate, a connected carrier account (`shippo`), the store's custom shipping extension (`custom`), or `none`.
     */
    export enum rate_source {
        ZONE = 'zone',
        TIER = 'tier',
        FALLBACK = 'fallback',
        SHIPPO = 'shippo',
        CUSTOM = 'custom',
        NONE = 'none',
    }
}

