/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingAddressInput } from './ShippingAddressInput';
import type { ShippingBasketItem } from './ShippingBasketItem';
import type { ShippingParcelInput } from './ShippingParcelInput';
/**
 * Calculate shipping using a place name or address that will be geocoded.
 */
export type ShippingCalculationByPlace = {
    /**
     * Address or place name to geocode (e.g., "SoHo, New York, USA")
     */
    place_name: string;
    /**
     * ISO 3166-1 alpha-2 country code of the destination. Narrows the geocoding search and matches zones defined by country; it takes precedence over the country found by geocoding.
     */
    country_code?: string;
    /**
     * Postcode of the destination. Matches zones narrowed to postcode prefixes; it takes precedence over the postcode found by geocoding.
     */
    postal_code?: string;
    /**
     * The basket's lines. Optional; with it, the store's weight-based rates and its rules for product categories (surcharges, local-only delivery, collection only) apply.
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

