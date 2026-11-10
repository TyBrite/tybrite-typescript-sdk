/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgencyPricing } from '../models/AgencyPricing';
import type { AutomaticOffer } from '../models/AutomaticOffer';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AgencySignupService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get an agency's plans and its active automatic offers
     * Returns the plans a merchant can subscribe to under the calling agency, with the agency's active automatic offers.
     * Call it from the agency's own signup or pricing page to show current prices and any running campaign without a rebuild.
     *
     * **No API key.** The agency is resolved from the `Origin` or `Referer` of the browser call (the host maps to exactly one agency),
     * or from the `x-agency-signup-key` header for a server-side call. A request that resolves to no agency receives the same
     * `404 not_found` answer whatever the reason.
     *
     * **What is returned.** `plans` lists the agency's visible tiers (or the platform plans when the agency's merchants are billed by the
     * platform, in which case `billed_by` is `platform` and `offers` is empty). `offers` lists active offers that apply automatically:
     * each carries the discount, how long it lasts, its window, and for every plan and billing period the price, the discount and the
     * final price. Offers that need a code are never listed.
     *
     * **Money.** Every amount is a decimal in major units of the plan currency (`12.50`).
     *
     * **Caching.** The answer may be cached for up to a minute. Rate limited per caller address.
     *
     * @returns AgencyPricing The agency's plans and active automatic offers
     * @throws ApiError
     */
    public getAgencyPricing({
        xAgencySignupKey,
    }: {
        /**
         * The agency's signup key, for a server-side call that has no browser Origin.
         */
        xAgencySignupKey?: string,
    }): CancelablePromise<AgencyPricing> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agency/pricing',
            headers: {
                'x-agency-signup-key': xAgencySignupKey,
            },
            errors: {
                404: `No pricing is available for this request`,
                429: `Too many requests from this address`,
                500: `Pricing is temporarily unavailable`,
            },
        });
    }
    /**
     * Get the platform's active automatic offers
     * Returns the active offers that apply automatically to the platform's own plans, so a pricing page can show the current price
     * next to the list price. No API key. Offers that need a code are never listed. Every amount is a decimal in major units.
     * The answer may be cached for up to a minute.
     *
     * @returns any Active automatic offers
     * @throws ApiError
     */
    public getPlatformOffers(): CancelablePromise<{
        offers: Array<AutomaticOffer>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/pricing/offers',
            errors: {
                429: `Too many requests from this address`,
                500: `Pricing is temporarily unavailable`,
            },
        });
    }
    /**
     * Sign a merchant up under an agency (send code, verify, create the store)
     * The three steps an agency's own signup page performs, selected by `action`:
     *
     * 1. `send` — emails a six-digit code to the merchant's address.
     * 2. `verify` — checks the code and confirms the address.
     * 3. `provision` — creates the store with its defaults and returns a session, so the merchant lands in the admin signed in.
     *
     * **No API key.** The agency is resolved from the `Origin` or `Referer` of the browser call, or from the `x-agency-signup-key`
     * header on a server-side call (which may also pass the end user's address in `x-end-user-ip`). A body-supplied agency id is ignored.
     *
     * **Plan, period and offer code.** `provision` accepts an optional `plan` (one of the agency's plan or tier slugs), `period`
     * (`monthly` or `annual`) and `offer_code`. They are carried to the merchant's first checkout, which opens on that plan and period with the
     * code applied. The price and any discount are resolved when the merchant checks out; a value the agency does not sell is ignored.
     * The response returns the values that were kept in `checkout_intent`.
     *
     * Rate limited per address, per mailbox and per agency.
     *
     * @returns any The step succeeded
     * @throws ApiError
     */
    public agencyMerchantSignup({
        requestBody,
        xAgencySignupKey,
        xEndUserIp,
    }: {
        requestBody: {
            action: 'send' | 'verify' | 'provision';
            email: string;
            /**
             * Required for `send` and `provision`
             */
            password?: string;
            name?: string;
            /**
             * The six-digit code, for `verify`
             */
            code?: string;
            /**
             * Required for `provision`
             */
            store_name?: string;
            /**
             * Six letters or digits; derived from the store name when omitted
             */
            store_code?: string;
            business_type?: string;
            country?: string;
            currency?: string;
            phone?: string;
            address?: string;
            store_email?: string;
            /**
             * Plan or tier slug the merchant chose on the agency's page (`provision`)
             */
            plan?: string;
            period?: 'monthly' | 'annual';
            /**
             * An offer code the merchant entered (`provision`)
             */
            offer_code?: string;
        },
        /**
         * The agency's signup key, for a server-side call that has no browser Origin.
         */
        xAgencySignupKey?: string,
        /**
         * The end user's address, accepted only together with a valid signup key.
         */
        xEndUserIp?: string,
    }): CancelablePromise<{
        ok?: boolean;
        /**
         * Present after `verify`
         */
        verified?: boolean;
        /**
         * The created store, after `provision`
         */
        store?: {
            id?: string;
            store_name?: string;
            store_code?: string;
        };
        /**
         * The plan, period and offer code kept for the first checkout, after `provision`
         */
        checkout_intent?: any | null;
        /**
         * A signed-in session for the new merchant, after `provision`
         */
        session?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agency/merchant-signup',
            headers: {
                'x-agency-signup-key': xAgencySignupKey,
                'x-end-user-ip': xEndUserIp,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request was invalid`,
                401: `The signup key is not valid`,
                429: `Too many attempts`,
            },
        });
    }
}
