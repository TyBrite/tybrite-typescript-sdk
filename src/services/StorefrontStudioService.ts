/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StorefrontExperiment } from '../models/StorefrontExperiment';
import type { StorefrontExperimentConversions } from '../models/StorefrontExperimentConversions';
import type { StorefrontExperimentInput } from '../models/StorefrontExperimentInput';
import type { StorefrontSite } from '../models/StorefrontSite';
import type { StorefrontSiteReport } from '../models/StorefrontSiteReport';
import type { StorefrontSupportRequest } from '../models/StorefrontSupportRequest';
import type { StorefrontSupportRequestInput } from '../models/StorefrontSupportRequestInput';
import type { StorefrontSupportRequestList } from '../models/StorefrontSupportRequestList';
import type { StorefrontTemplate } from '../models/StorefrontTemplate';
import type { StorefrontTemplateInput } from '../models/StorefrontTemplateInput';
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
    /**
     * Open a support request for the store
     * Opens a support request with the merchant's support team on the merchant's behalf, for something
     * the app cannot resolve itself. The request appears in the merchant's Support list marked with the
     * app's name, the merchant is told by email and in the app, and the support team's replies go to the
     * merchant, not to the app.
     *
     * Send an idempotency key (`idempotency_key` in the body or the `Idempotency-Key` header). Repeating
     * a request with the same key returns the request already opened with `200` and notifies no one; a new
     * key opens a new request with `201`.
     *
     * An app can open 5 requests an hour and 20 a day per store. Beyond that the call returns `429` with
     * `Retry-After`. A sandbox connection records the request and returns it but reaches no support team
     * and no merchant.
     *
     * **Authentication:** the connection's secret key (`tybrite_sk_*`). The connection must have been
     * granted the `support_tickets:write` scope at consent; otherwise `403 insufficient_scope` is
     * returned. A publishable key is refused with `403 forbidden`.
     *
     * **Rate limit:** 30 requests/hour per API key.
     *
     * @returns StorefrontSupportRequest The request this key already opened
     * @throws ApiError
     */
    public createStorefrontSupportRequest({
        requestBody,
        idempotencyKey,
    }: {
        requestBody: StorefrontSupportRequestInput,
        /**
         * Names this attempt. Required here or as `idempotency_key` in the body.
         */
        idempotencyKey?: string,
    }): CancelablePromise<StorefrontSupportRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/storefront/tickets',
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    /**
     * List the support requests the app opened
     * Returns the requests this app opened for the store and environment, newest first. Requests the
     * merchant or another app opened are never listed, and a reply from the support team is not
     * returned: the app sees only where each request stands.
     *
     * **Authentication:** the connection's secret key, with the `support_tickets:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontSupportRequestList A page of requests
     * @throws ApiError
     */
    public listStorefrontSupportRequests({
        status,
        limit = 20,
        cursor,
    }: {
        /**
         * Only requests with this status, for example `Open` or `Resolved`.
         */
        status?: string,
        /**
         * Requests per page.
         */
        limit?: number,
        /**
         * The `next_cursor` of the previous page.
         */
        cursor?: string,
    }): CancelablePromise<StorefrontSupportRequestList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/tickets',
            query: {
                'status': status,
                'limit': limit,
                'cursor': cursor,
            },
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
     * Read one support request the app opened
     * Returns where one of the app's requests stands. A request that does not exist, was opened by the
     * merchant or another app, or belongs to the other environment returns the same `404`.
     *
     * **Authentication:** the connection's secret key, with the `support_tickets:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontSupportRequest The request
     * @throws ApiError
     */
    public getStorefrontSupportRequest({
        ticketId,
    }: {
        /**
         * The `id` returned when the request was opened.
         */
        ticketId: string,
    }): CancelablePromise<StorefrontSupportRequest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/tickets/{ticket_id}',
            path: {
                'ticket_id': ticketId,
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
    /**
     * List the templates the app offered
     * Returns the templates this app offered the store in this environment, newest first, including
     * withdrawn ones. Another app's templates are never listed.
     *
     * **Authentication:** the connection's secret key. The connection must have been granted the
     * `storefront_template:write` scope at consent; otherwise `403 insufficient_scope` is returned.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns any The app's templates
     * @throws ApiError
     */
    public listStorefrontTemplates(): CancelablePromise<{
        data: Array<StorefrontTemplate>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/templates',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions for this key. A GC Connect key that was not granted the operation's scope (for example \`agent:read\` or \`orders:write\`) receives \`insufficient_scope\`; a request that needs a secret key, or a marketplace operator key calling a single-store operation, receives \`forbidden\`.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
    /**
     * Offer a template for the store
     * Offers a template to the merchant, or updates one the app already offered. The merchant is told
     * and chooses to accept or decline; nothing changes in the store until they accept, and GC does not
     * move the template itself. `status` reports the merchant's answer, and `confirmed_version` is the
     * version they accepted.
     *
     * A new `template_id`, a new `version` of an existing one, or a template the app had withdrawn is
     * offered to the merchant again. Repeating the same `version` only refreshes the name, summary and
     * preview, and the merchant's answer to that version stands.
     *
     * An app can have up to 50 templates on offer per store and environment. A sandbox connection records
     * the offer but no merchant is asked.
     *
     * **Authentication:** the connection's secret key, with the `storefront_template:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontTemplate The template as GC now holds it
     * @throws ApiError
     */
    public putStorefrontTemplate({
        templateId,
        requestBody,
    }: {
        /**
         * The template id you chose, 1 to 100 letters, digits, dots, dashes, colons or underscores.
         */
        templateId: string,
        requestBody: StorefrontTemplateInput,
    }): CancelablePromise<StorefrontTemplate> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/storefront/templates/{template_id}',
            path: {
                'template_id': templateId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    /**
     * Read a template the app offered
     * Returns the template and the merchant's answer. A template that does not exist, belongs to another
     * app or to the other environment returns the same `404`.
     *
     * **Authentication:** the connection's secret key, with the `storefront_template:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontTemplate The template
     * @throws ApiError
     */
    public getStorefrontTemplate({
        templateId,
    }: {
        /**
         * The template id you offered.
         */
        templateId: string,
    }): CancelablePromise<StorefrontTemplate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storefront/templates/{template_id}',
            path: {
                'template_id': templateId,
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
    /**
     * Withdraw a template offer
     * Takes the offer back. The merchant is no longer asked about it, and the record stays with
     * `status: withdrawn`. Withdrawing twice is the same as once. Offering the template again asks the
     * merchant again.
     *
     * **Authentication:** the connection's secret key, with the `storefront_template:write` scope.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns StorefrontTemplate The template, withdrawn
     * @throws ApiError
     */
    public withdrawStorefrontTemplate({
        templateId,
    }: {
        /**
         * The template id you offered.
         */
        templateId: string,
    }): CancelablePromise<StorefrontTemplate> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/storefront/templates/{template_id}',
            path: {
                'template_id': templateId,
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
