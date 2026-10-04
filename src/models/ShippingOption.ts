/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One way a shopper can receive the order — a delivery option or a pickup location — priced for the destination and basket.
 */
export type ShippingOption = {
    /**
     * The option's id, passed as `shipping_option_id` on `POST /v1/orders`. `place` is the store's standard rate for the address; `opt:<id>` is a further named option on the same rate (Express, Next day); `pickup:<location id>` is collection at a location.
     */
    id: string;
    method: ShippingOption.method;
    /**
     * The name to show the shopper.
     */
    name: string;
    /**
     * The charge for this option, in `currency`, after any free-delivery threshold and surcharge.
     */
    fee: number;
    currency: string;
    /**
     * True when `fee` is 0.
     */
    is_free: boolean;
    /**
     * When the shopper can expect the order — a delivery estimate, or when a pickup order is ready — as the store wrote it. Null when the store has not given one.
     */
    estimate: string | null;
    /**
     * False when the option exists but does not apply to this basket — a pickup location whose `minimum_order` is above `order_total`. An unavailable option cannot be ordered with.
     */
    available: boolean;
    /**
     * The order total from which this option is free. Absent when it has none.
     */
    free_threshold?: number | null;
    /**
     * For a pickup option, the smallest order total it accepts. Absent when there is none.
     */
    minimum_order?: number | null;
    /**
     * For a pickup option, the location to collect from. Fields the store has not filled in are omitted.
     */
    location?: {
        id?: string;
        name?: string;
        address?: {
            line1?: string;
            line2?: string;
            city?: string;
            state?: string;
            postal_code?: string;
            country?: string;
        };
        latitude?: number;
        longitude?: number;
        hours?: string;
        instructions?: string;
        /**
         * Distance from the shopper's location, when the location was sent.
         */
        distance_meters?: number;
    };
};
export namespace ShippingOption {
    export enum method {
        DELIVERY = 'delivery',
        PICKUP = 'pickup',
    }
}

