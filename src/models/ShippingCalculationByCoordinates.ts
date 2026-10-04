/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingAddressInput } from './ShippingAddressInput';
import type { ShippingBasketItem } from './ShippingBasketItem';
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
     * ISO 3166-1 alpha-2 country code of the destination. Matches zones defined by country; a value sent here takes precedence over the one found from the location.
     */
    country_code?: string;
    /**
     * Postcode of the destination. Matches zones narrowed to postcode prefixes; a value sent here takes precedence over the one found from the location.
     */
    postal_code?: string;
    /**
     * The basket's lines. Optional; with it, the store's weight-based rates and its rules for product categories (surcharges, local-only delivery, collection only) apply. A rate that depends on weight applies only when every line's variant has a weight.
     */
    items?: Array<ShippingBasketItem>;
    /**
     * The order's merchandise after discounts, before tax and shipping. A free-delivery threshold is compared against this figure. Must be a number of zero or more; defaults to 0.
     */
    order_total?: number;
    address_to?: ShippingAddressInput;
    address_from?: ShippingAddressInput;
    parcel?: ShippingParcelInput;
};

