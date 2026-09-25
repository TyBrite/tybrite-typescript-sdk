/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingAddressInput } from './ShippingAddressInput';
import type { ShippingParcelInput } from './ShippingParcelInput';
/**
 * Carrier options only: a destination address and a parcel with no coordinates or place name. The store's own delivery rate is not priced (there is no location to price it from); the response carries the carrier options from the store's connected carrier account and its custom shipping extension, with `fee` null.
 */
export type ShippingCalculationByCarrierAddress = {
    address_to: ShippingAddressInput;
    address_from?: ShippingAddressInput;
    parcel: ShippingParcelInput;
};

