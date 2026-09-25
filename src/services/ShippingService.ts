/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryFeeCalculation } from '../models/DeliveryFeeCalculation';
import type { DeliveryPricingTier } from '../models/DeliveryPricingTier';
import type { DeliveryZone } from '../models/DeliveryZone';
import type { ShippingCalculationRequest } from '../models/ShippingCalculationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ShippingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get shipping zones and pricing tiers
     * The store's delivery rates: its active distance-based pricing tiers, its active delivery zones,
     * and its "everywhere else" rate.
     *
     * **How an address is priced** (see `POST /v1/shipping/calculate`):
     * 1. The first zone that contains it — lowest `priority` first, then the zone created first.
     * 2. Otherwise, the tier whose range contains its distance from the store. A range includes its
     * `min_distance_meters` and stops just before its `max_distance_meters`.
     * 3. Otherwise, `everywhere_else`. When that is null and the store has zones or tiers, an address
     * outside them is not delivered to.
     *
     * Every amount is in `currency`. A store with no tiers, zones or `everywhere_else` rate charges
     * nothing for delivery through these rates.
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
         * The rate for any address outside the zones and tiers. Null when the store has none.
         */
        everywhere_else?: any | null;
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
     * The store's delivery charge for a shopper's location and order total, plus carrier options when
     * a destination address and parcel are sent.
     *
     * **Location:** `latitude` + `longitude`, or a `place_name` (geocoded). With neither, `address_to`
     * + `parcel` returns carrier options only, with `fee` null.
     *
     * **Pricing:** the first zone containing the location; otherwise the distance tier matching its
     * distance from the store (a range includes its start and stops just before its end); otherwise
     * the store's "everywhere else" rate. A matched rate is free when `order_total` — the merchandise
     * after discounts, before tax and shipping — reaches its free-delivery threshold. A store with no
     * rates at all charges nothing (`applied_rule: none`). When the store has zones or tiers but none
     * covers the location and it has no "everywhere else" rate, the answer is
     * `400 shipping_not_deliverable`.
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
                400: `The request is invalid (\`invalid_request\`: a location outside -90..90 / -180..180, an \`order_total\` that is not a number of zero or more, or no location at all), a \`place_name\` could not be found (\`geocoding_failed\`), the store does not deliver to the location (\`shipping_not_deliverable\`), or a carrier-options-only request was sent to a store with no carrier connected (\`provider_not_configured\`).`,
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
