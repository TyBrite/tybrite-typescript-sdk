/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A delivery zone with its own fee. A zone covers either an area drawn on a map (`match_kind: area`) or whole countries, optionally narrowed to postcode prefixes (`match_kind: region`).
 */
export type DeliveryZone = {
    /**
     * Display name for the delivery zone
     */
    zone_name?: string;
    /**
     * Delivery fee for this zone
     */
    delivery_fee?: number;
    /**
     * Minimum order amount for free delivery (null = no free delivery)
     */
    free_delivery_threshold?: number | null;
    is_active?: boolean;
    /**
     * Where zones overlap, the lowest number wins; on a tie, the zone created first.
     */
    priority?: number;
    /**
     * Hex color code for map visualization
     */
    color?: string;
    /**
     * How the zone decides whether it covers an address:
     * - area: the address lies inside the area drawn on the zone's map
     * - region: the address is in one of `countries` and, when `postcodes` is not empty, its postcode
     * starts with one of the listed prefixes (compared without spaces, ignoring case)
     */
    match_kind?: DeliveryZone.match_kind;
    /**
     * ISO 3166-1 alpha-2 country codes a `region` zone covers. Empty for an `area` zone.
     */
    countries?: Array<string>;
    /**
     * Postcode prefixes a `region` zone is narrowed to. Empty means every postcode in its countries.
     */
    postcodes?: Array<string>;
};
export namespace DeliveryZone {
    /**
     * How the zone decides whether it covers an address:
     * - area: the address lies inside the area drawn on the zone's map
     * - region: the address is in one of `countries` and, when `postcodes` is not empty, its postcode
     * starts with one of the listed prefixes (compared without spaces, ignoring case)
     */
    export enum match_kind {
        AREA = 'area',
        REGION = 'region',
    }
}

