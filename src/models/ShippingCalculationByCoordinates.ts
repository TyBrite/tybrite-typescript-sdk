/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingAddressInput } from './ShippingAddressInput';
import type { ShippingParcelInput } from './ShippingParcelInput';
/**
 * Calculate shipping using the customer's GPS coordinates.
 */
export type ShippingCalculationByCoordinates = {
    /**
     * Customer's GPS latitude
     */
    latitude: number;
    /**
     * Customer's GPS longitude
     */
    longitude: number;
    /**
     * The order's merchandise after discounts, before tax and shipping. A free-delivery threshold is compared against this figure. Must be a number of zero or more; defaults to 0.
     */
    order_total?: number;
    address_to?: ShippingAddressInput;
    address_from?: ShippingAddressInput;
    parcel?: ShippingParcelInput;
};

