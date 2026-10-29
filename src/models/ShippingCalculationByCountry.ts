/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingBasketItem } from './ShippingBasketItem';
/**
 * Calculate shipping from a country alone, with no coordinates and no geocoding. Prices zones that cover the country (narrowed by `postal_code` where the zone uses postcode prefixes) and the store's "everywhere else" rate; zones drawn on a map and distance rates need coordinates and are skipped.
 */
export type ShippingCalculationByCountry = {
    /**
     * ISO 3166-1 alpha-2 country code of the destination.
     */
    country_code: string;
    /**
     * Postcode of the destination, for zones narrowed to postcode prefixes.
     */
    postal_code?: string;
    /**
     * The basket's lines. Optional.
     */
    items?: Array<ShippingBasketItem>;
    /**
     * The order's merchandise after discounts, before tax and shipping. Defaults to 0.
     */
    order_total?: number;
};

