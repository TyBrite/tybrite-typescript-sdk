/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingCalculationByCoordinates } from './ShippingCalculationByCoordinates';
import type { ShippingCalculationByPlace } from './ShippingCalculationByPlace';
/**
 * Input for a shipping fee calculation. Provide either GPS coordinates (latitude + longitude) or a place_name to geocode.
 */
export type ShippingCalculationRequest = (ShippingCalculationByCoordinates | ShippingCalculationByPlace);

