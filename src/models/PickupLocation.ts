/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A store location where shoppers can collect an order instead of having it delivered.
 */
export type PickupLocation = {
    /**
     * The location's id. Pass it as `pickup_location_id` on `POST /v1/orders`.
     */
    id?: string;
    name?: string;
    /**
     * The location's street address.
     */
    address?: any | null;
    latitude?: number | null;
    longitude?: number | null;
    /**
     * Opening hours, as the store wrote them.
     */
    hours?: string | null;
    /**
     * The charge for collecting here, in the store's currency.
     */
    pickup_fee?: number;
    /**
     * The smallest order total accepted for pickup here, or null when there is none.
     */
    minimum_order?: number | null;
    /**
     * When an order is usually ready to collect, as the store wrote it.
     */
    ready_text?: string | null;
    /**
     * What the shopper does on arrival.
     */
    instructions?: string | null;
};

