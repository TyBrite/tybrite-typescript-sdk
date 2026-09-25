/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TaxService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Preview tax for a cart before checkout
     * Estimates the tax for a shipping destination and a set of cart lines **without creating an
     * order**, so a storefront can show the shopper the final, tax-inclusive total before they pay.
     *
     * When the store has automatic tax enabled, the response is calculated for the `ship_to`
     * address and includes a per-jurisdiction `breakdown`. A positive `shipping_amount` is rated as
     * its own shipping line, so the destination's rules decide whether shipping is taxed.
     *
     * When automatic tax is not configured, `tax_source` is `fallback` and the response carries the
     * tax the order endpoint charges at the store's own rate: `tax_amount`, the `rate`, whether the
     * store's prices already include tax (`prices_include_tax`), and whether the shipping charge was
     * taxed (`shipping_taxed`, which follows the store's "Charge tax on shipping" setting). A store
     * with no rate returns a `tax_amount` of `0`.
     *
     * The estimate is never recorded for filing — it is a quote only. Publishable keys are accepted,
     * so the call can be made directly from the browser during checkout.
     *
     * **Building the order total from the estimate.** Send the same `shipping_amount` (and, for a
     * store whose prices include tax, the same `discount_amount`) that the order will carry, so the
     * estimate matches the order to the cent.
     *
     * - Prices exclude tax (`prices_include_tax` false, or any `automatic` response):
     * `total_amount = subtotal + tax_amount + shipping − discount`, where `subtotal` is the sum of
     * the line totals.
     * - Prices include tax (`prices_include_tax` true): the tax is already inside the line totals, so
     * `total_amount = line totals + shipping − discount` and `subtotal = line totals − tax_amount`.
     *
     * Pass that `total_amount` to `createOrder`; `tax_amount` may be omitted there, and the order
     * records the same figure.
     *
     * @returns any The tax estimate. `tax_source` is `fallback` when automatic tax is not configured.
     * @throws ApiError
     */
    public previewTax({
        requestBody,
    }: {
        requestBody: {
            /**
             * The shipping destination the tax is calculated for.
             */
            ship_to: {
                line1?: string;
                line2?: string;
                city?: string;
                /**
                 * State / province / region code.
                 */
                region?: string;
                /**
                 * ISO 3166-1 alpha-2 country code.
                 */
                country: string;
                postal_code?: string;
            };
            /**
             * The cart lines to estimate tax for.
             */
            lines: Array<{
                quantity?: number;
                /**
                 * The line total (unit price × quantity).
                 */
                amount: number;
                /**
                 * Your SKU / line reference.
                 */
                item_code?: string;
                /**
                 * The product's category, used to pick the right tax code.
                 */
                category_name?: string;
                description?: string;
            }>;
            /**
             * The origin the goods ship from. Which jurisdictions may tax a sale depends on where it ships from as well as where it ships to, so send this when fulfilling from a location other than the store's own address. Defaults to the store's address.
             */
            ship_from?: {
                line1?: string;
                city?: string;
                /**
                 * State / province / region code.
                 */
                region?: string;
                /**
                 * ISO 3166-1 alpha-2 country code.
                 */
                country?: string;
                postal_code?: string;
            };
            /**
             * Your identifier for the buyer. Send it when the buyer holds a tax exemption, so the estimate reflects it. Omitted, the cart is priced as an ordinary retail sale.
             */
            customer_code?: string;
            /**
             * Your own reference for this estimate, echoed back so you can tie it to a cart or quote in your system.
             */
            doc_code?: string;
            /**
             * ISO 4217 currency code. Defaults to the store currency.
             */
            currency?: string;
            /**
             * The shipping charge the order will carry. With automatic tax it is rated as its own shipping line; at the store's own rate it is taxed when the store charges tax on shipping. Defaults to 0.
             */
            shipping_amount?: number;
            /**
             * The discount the order will carry. Only affects the estimate for a store whose prices include tax, where the tax is taken from what the shopper pays after the discount. Defaults to 0.
             */
            discount_amount?: number;
        },
    }): CancelablePromise<{
        tax_amount?: number;
        taxable?: number;
        currency?: string;
        /**
         * `automatic` when the tax was calculated for the destination; `fallback` when automatic tax is not configured and the store's own rate applies.
         */
        tax_source?: 'automatic' | 'fallback';
        /**
         * The store's own tax rate as a fraction (`fallback` responses only).
         */
        rate?: number;
        /**
         * Whether the store's prices already include tax (`fallback` responses only). When true, `tax_amount` is the tax contained in the line totals, not an amount to add.
         */
        prices_include_tax?: boolean;
        /**
         * Whether the shipping charge is part of the taxed amount (`fallback` responses only).
         */
        shipping_taxed?: boolean;
        /**
         * Per-jurisdiction detail (present when `tax_source` is `automatic`).
         */
        breakdown?: Array<{
            country?: string;
            region?: string;
            jurisName?: string;
            taxName?: string;
            rate?: number;
            taxable?: number;
            tax?: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/tax/preview',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
            },
        });
    }
}
