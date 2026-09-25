/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingCalculationByCarrierAddress } from './ShippingCalculationByCarrierAddress';
import type { ShippingCalculationByCoordinates } from './ShippingCalculationByCoordinates';
import type { ShippingCalculationByPlace } from './ShippingCalculationByPlace';
/**
 * Input for a shipping fee calculation. Provide GPS coordinates (latitude + longitude), a place_name to geocode, or — for carrier options only — address_to with a parcel.
 */
export type ShippingCalculationRequest = (ShippingCalculationByCoordinates | ShippingCalculationByPlace | ShippingCalculationByCarrierAddress);

