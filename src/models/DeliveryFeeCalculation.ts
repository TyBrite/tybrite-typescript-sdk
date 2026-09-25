/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The store's delivery charge for a location and order total. An address is priced by the first zone that contains it, otherwise by the distance rate for its distance from the store, otherwise by the store's "everywhere else" rate. A store with no delivery rates at all charges nothing (`applied_rule: none`). A store whose rates do not reach the address answers `400 shipping_not_deliverable` instead.
 */
export type DeliveryFeeCalculation = {
    /**
     * The delivery charge, in `currency`. Null only on a carrier-options-only request (no location was sent).
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
     * The address's coordinates (geocoded when a place_name was sent).
     */
    coordinates?: {
        latitude?: number;
        longitude?: number;
    };
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

