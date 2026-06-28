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
     * address and includes a per-jurisdiction `tax_breakdown`. When automatic tax is not
     * configured, the response is `{ "tax_source": "fallback" }` and you should apply the store's
     * own tax rate (the same amount the order endpoint would use). The estimate is never recorded
     * for filing — it is a quote only.
     *
     * Publishable keys are accepted, so the call can be made directly from the browser during
     * checkout. Use the returned `tax_amount` to compute `total_amount` (`subtotal + tax_amount +
     * shipping − discount`) and pass that same total to `createOrder`.
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
             * ISO 4217 currency code. Defaults to the store currency.
             */
            currency?: string;
        },
    }): CancelablePromise<{
        tax_amount?: number;
        taxable?: number;
        currency?: string;
        tax_source?: 'automatic' | 'fallback';
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
