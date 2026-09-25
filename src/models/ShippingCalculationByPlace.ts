/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingAddressInput } from './ShippingAddressInput';
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
     * Optional ISO 3166-1 alpha-2 country code (improves geocoding accuracy)
     */
    country_code?: string;
    /**
     * The order's merchandise after discounts, before tax and shipping. A free-delivery threshold is compared against this figure. Must be a number of zero or more; defaults to 0.
     */
    order_total?: number;
    address_to?: ShippingAddressInput;
    address_from?: ShippingAddressInput;
    parcel?: ShippingParcelInput;
};

