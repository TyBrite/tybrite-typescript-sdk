/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * Total order value (before shipping)
     */
    order_total?: number;
};

