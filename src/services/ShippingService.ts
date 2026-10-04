/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryFeeCalculation } from '../models/DeliveryFeeCalculation';
import type { DeliveryPricingTier } from '../models/DeliveryPricingTier';
import type { DeliveryZone } from '../models/DeliveryZone';
import type { PickupLocation } from '../models/PickupLocation';
import type { ShippingCalculationRequest } from '../models/ShippingCalculationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ShippingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get shipping zones and pricing tiers
     * The store's delivery rates and pickup locations: its active distance-based pricing tiers, its
     * active delivery zones, its "everywhere else" rate, and the locations where shoppers can collect
     * an order.
     *
     * **How an address is priced** (see `POST /v1/shipping/calculate`):
     * 1. The first zone that contains it — lowest `priority` first, then the zone created first. An
     * `area` zone contains the addresses inside the area drawn on its map; a `region` zone contains
     * the addresses in one of its `countries`, narrowed to `postcodes` that start with one of the
     * listed prefixes when it has any.
     * 2. Otherwise, the tier whose range contains its distance from the store. A range includes its
     * `min_distance_meters` and stops just before its `max_distance_meters`.
     * 3. Otherwise, `everywhere_else`. When it is null, or `refuse` is true, and the store has zones or
     * tiers, an address outside them is not delivered to.
     *
     * Every amount is in `currency`. A store with no tiers, zones or `everywhere_else` rate charges
     * nothing for delivery through these rates.
     *
     * **Pickup:** each entry in `pickup_locations` is a location where an order can be collected
     * instead of delivered, with its own `pickup_fee` and, when set, a `minimum_order`. The store's
     * primary location is listed first.
     *
     * **Caching:** the response is cached for up to 60 seconds and carries an ETag (send
     * `If-None-Match` for a `304`). Changes to the store's rates appear here within that window;
     * `POST /v1/shipping/calculate` and order creation always read the current rates.
     * @returns any The store's delivery rates
     * @throws ApiError
     */
    public getShippingZones(): CancelablePromise<{
        /**
         * The currency every fee and threshold here is in — the store's own.
         */
        currency?: string | null;
        pricing_tiers?: Array<DeliveryPricingTier>;
        delivery_zones?: Array<DeliveryZone>;
        /**
         * The rate for any address outside the zones and tiers. Null when the store has not set one. When `refuse` is true the store has chosen not to deliver outside its zones and distance rates, and both amounts are null.
         */
        everywhere_else?: any | null;
        /**
         * The store's locations that offer pickup, primary location first. Empty when the store does not offer pickup.
         */
        pickup_locations?: Array<PickupLocation>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/shipping/zones',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Calculate shipping fee
     * The ways a shopper can receive an order — the store's delivery options and pickup locations —
     * priced for their location and basket, plus carrier options when a destination address and parcel
     * are sent.
     *
     * **Location:** `latitude` + `longitude`, or a `place_name` (geocoded). `country_code` and
     * `postal_code` may accompany either; they match zones defined by country and postcode, and a value
     * sent here takes precedence over the one found by geocoding. With no location, `address_to` +
     * `parcel` returns carrier options only, with `fee` null.
     *
     * **Basket:** `order_total` is the merchandise after discounts, before tax and shipping; free-delivery
     * thresholds and minimum orders are measured against it. `items` lists the basket's variants and
     * quantities. It is optional, and is what lets the store apply rates that depend on the parcel's
     * weight and rules it sets for particular product categories — a surcharge, delivery only to nearby
     * addresses (`restriction: local_only`), or collection only (`restriction: pickup_only`).
     *
     * **Pricing:** the first zone containing the location — a zone drawn on a map, or a zone covering
     * whole countries or postcode prefixes; otherwise the distance tier matching its distance from the
     * store (a range includes its start and stops just before its end); otherwise the store's
     * "everywhere else" rate. A matched rate is free when `order_total` reaches its free-delivery
     * threshold. A store with no rates at all charges nothing (`applied_rule: none`).
     *
     * **Options:** `options[]` lists everything the shopper can choose between. The first delivery
     * option, `id: place`, is the matched rate itself ("Standard delivery"); its fee is also returned as
     * `fee`. The store may add named options to the same rate — Express, Next day — with ids of the form
     * `opt:<id>`, each with its own fee and estimate. Pickup options (`method: pickup`, ids of the form
     * `pickup:<location id>`) follow, nearest first when the location is known. An option with
     * `available: false` exists but does not apply to this basket yet, usually because `order_total` is
     * below its `minimum_order`. To order with an option, pass its `id` as `shipping_option_id` on
     * `POST /v1/orders`.
     *
     * **No delivery to the address:** when the store does not deliver there but does offer pickup, the
     * response is `200` with `deliverable: false`, `fee: null` and only the pickup options. When it offers
     * neither, the answer is `400 shipping_not_deliverable`.
     *
     * **Multiple locations:** when the store delivers from whichever of its locations is nearest the
     * shopper, `fulfilled_from` names that location, and distance tiers are measured from it.
     *
     * **Carrier options** (`rates[]`) come from the store's connected carrier account and its custom
     * shipping extension. To order with one, pass its `rate_id` and `source` on `POST /v1/orders` as
     * `shipping_rate_id` and `shipping_rate_source`.
     *
     * This is a **read-only operation** (safe for publishable keys).
     * @returns DeliveryFeeCalculation The delivery charge for the location
     * @throws ApiError
     */
    public calculateShipping({
        requestBody,
    }: {
        requestBody: ShippingCalculationRequest,
    }): CancelablePromise<DeliveryFeeCalculation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/shipping/calculate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid (\`invalid_request\`: a location outside -90..90 / -180..180, an \`order_total\` that is not a number of zero or more, a \`country_code\` that is not two letters, a \`postal_code\` longer than 16 characters, \`items\` that is not an array of at most 500 lines each with a \`variant_id\` and a positive \`quantity\`, or no location at all), a \`place_name\` could not be found (\`geocoding_failed\`), the store neither delivers to the location nor offers pickup (\`shipping_not_deliverable\`), or a carrier-options-only request was sent to a store with no carrier connected (\`provider_not_configured\`).`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Track a shipment
     * Returns the live tracking status for a parcel by carrier + tracking number. Requires the
     * store to have multi-carrier shipping connected.
     *
     * A secret key tracks any parcel on the store's carrier account. A publishable key tracks only a
     * tracking number that is on one of the store's own orders (in the key's environment), so a
     * storefront can show a shopper their own parcel; any other number answers `404`.
     * @returns any Tracking status
     * @throws ApiError
     */
    public trackShipment({
        carrier,
        number,
    }: {
        /**
         * Carrier token (e.g. usps, ups, fedex).
         */
        carrier: string,
        /**
         * The tracking number.
         */
        number: string,
    }): CancelablePromise<{
        carrier?: string;
        tracking_number?: string;
        status?: string | null;
        status_details?: string | null;
        eta?: string | null;
        history?: Array<{
            status?: string;
            status_details?: string;
            status_date?: string;
            location?: Record<string, any>;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/shipping/tracking/{carrier}/{number}',
            path: {
                'carrier': carrier,
                'number': number,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `With a publishable key, the tracking number is not on any of this store's orders.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                502: `The carrier's tracking service could not be reached (\`tracking_unavailable\`).`,
            },
        });
    }
}
