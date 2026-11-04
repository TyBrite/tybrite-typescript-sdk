/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StorefrontExperiment } from '../models/StorefrontExperiment';
import type { StorefrontExperimentConversions } from '../models/StorefrontExperimentConversions';
import type { StorefrontExperimentInput } from '../models/StorefrontExperimentInput';
import type { StorefrontSite } from '../models/StorefrontSite';
import type { StorefrontSiteReport } from '../models/StorefrontSiteReport';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StorefrontStudioService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Report the storefront's address and routes
     * Tells the store where its website lives and which pages it has. The report replaces the app's
     * previous one for this store and environment, so repeating a request is safe.
     *
     * The store never starts using a reported address on its own. The merchant is asked to accept it;
     * until they do, `merchant_review` is `pending` and the address is not used for links, sign-in
     * redirects or payment-wallet domains. A new address reported after an acceptance is a new
     * request. Send `base_url: null` when the storefront has been taken down.
     *
     * `routes` names the page templates by purpose. `product`, `collection` (or `category`), `policy`
     * and `account` are accepted. Each is a relative path beginning with `/` and may contain
     * `{slug}`. `category` is understood as the collection page when `collection` is not sent.
     *
     * **Authentication:** the connection's secret key (`tybrite_sk_*`). The connection must have been
     * granted the `storefront_site:write` scope at consent; otherwise `403 insufficient_scope` is
     * returned. A publishable key is refused with `403 forbidden`.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontSite The report as GC now holds it
     * @throws ApiError
     */
    public putStorefrontSite({
        requestBody,
    }: {
        requestBody: StorefrontSiteReport,
    }): CancelablePromise<StorefrontSite> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/storefront/site',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions for this key. A GC Connect key that was not granted the operation's scope (for example \`agent:read\` or \`orders:write\`) receives \`insufficient_scope\`; a request that needs a secret key, or a marketplace operator key calling a single-store operation, receives \`forbidden\`.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * Read the reported storefront address and routes
     * Returns what the app last reported for this store and environment, with where the merchant's
     * review of the address stands. `404` means the app has not reported a site yet.
     *
     * **Authentication:** the connection's secret key, with the `storefront_site:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontSite The app's current report
     * @throws ApiError
     */
    public getStorefrontSite(): CancelablePromise<StorefrontSite> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/site',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions for this key. A GC Connect key that was not granted the operation's scope (for example \`agent:read\` or \`orders:write\`) receives \`insufficient_scope\`; a request that needs a secret key, or a marketplace operator key calling a single-store operation, receives \`forbidden\`.`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * List the app's A/B experiments
     * Returns the experiments this app registered for the store and environment. Another app's
     * experiments are never listed.
     *
     * **Authentication:** the connection's secret key. The connection must have been granted the
     * `ab_attribution:write` scope at consent; otherwise `403 insufficient_scope` is returned. The
     * merchant is told on the consent screen that this scope shows the app the sales of its own tests.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns any The app's experiments, newest first
     * @throws ApiError
     */
    public listStorefrontExperiments(): CancelablePromise<{
        data: Array<StorefrontExperiment>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/experiments',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions for this key. A GC Connect key that was not granted the operation's scope (for example \`agent:read\` or \`orders:write\`) receives \`insufficient_scope\`; a request that needs a secret key, or a marketplace operator key calling a single-store operation, receives \`forbidden\`.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * Register or update an A/B experiment
     * Registers an experiment and its variants, or updates one the app already owns. Register it
     * before it takes traffic: the first app to register an `experiment_id` in a store and environment
     * owns it, and a later request for the same id from another app returns `409 conflict`. An id whose
     * orders were already counted elsewhere cannot be registered.
     *
     * A shopper's order is attributed to a variant when it carries the experiment id and the variant id
     * in its `attribution` (`ab_test_id` and `variation_id`). Only orders for the variants registered
     * here are counted.
     *
     * An app can register up to 100 experiments per store and environment, each with 2 to 20 variants.
     *
     * **Authentication:** the connection's secret key, with the `ab_attribution:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontExperiment The experiment as registered
     * @throws ApiError
     */
    public putStorefrontExperiment({
        experimentId,
        requestBody,
    }: {
        /**
         * The experiment id you chose, 1 to 100 letters, digits, dots, dashes, colons or underscores.
         */
        experimentId: string,
        requestBody: StorefrontExperimentInput,
    }): CancelablePromise<StorefrontExperiment> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/storefront/experiments/{experiment_id}',
            path: {
                'experiment_id': experimentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions for this key. A GC Connect key that was not granted the operation's scope (for example \`agent:read\` or \`orders:write\`) receives \`insufficient_scope\`; a request that needs a secret key, or a marketplace operator key calling a single-store operation, receives \`forbidden\`.`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * Read the paid orders for each variant of an experiment
     * Returns, for each variant the app registered, the number of paid orders and their total, in the
     * store's currency and in major units (12.50 means 12.50). `daily` breaks the same figures down by
     * day, with the sum of each order's squared value so the variance of the order value can be
     * computed. Unpaid orders, orders for unregistered variants and orders outside the window are not
     * counted.
     *
     * The window is the last 30 days unless `from` and `to` are sent, and is at most 92 days.
     *
     * An experiment that does not exist, belongs to another app or was registered in the other
     * environment returns the same `404`.
     *
     * **Authentication:** the connection's secret key, with the `ab_attribution:write` scope.
     *
     * **Rate limit:** 120 requests/hour per API key.
     *
     * @returns StorefrontExperimentConversions Paid orders per variant
     * @throws ApiError
     */
    public getStorefrontExperimentConversions({
        experimentId,
        from,
        to,
    }: {
        /**
         * The experiment id you registered.
         */
        experimentId: string,
        /**
         * First day of the window (UTC). Defaults to 29 days before `to`.
         */
        from?: string,
        /**
         * Last day of the window (UTC). Defaults to today.
         */
        to?: string,
    }): CancelablePromise<StorefrontExperimentConversions> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/experiments/{experiment_id}/conversions',
            path: {
                'experiment_id': experimentId,
            },
            query: {
                'from': from,
                'to': to,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions for this key. A GC Connect key that was not granted the operation's scope (for example \`agent:read\` or \`orders:write\`) receives \`insufficient_scope\`; a request that needs a secret key, or a marketplace operator key calling a single-store operation, receives \`forbidden\`.`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
}
