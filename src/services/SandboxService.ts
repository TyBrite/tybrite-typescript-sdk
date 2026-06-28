/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SandboxService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Reset your sandbox data
     * Wipes all of your store's **sandbox** test data immediately — orders, customers, carts,
     * wishlists, returns, store credits, reviews, messages, analytics events, webhook events and
     * more — so you can start a test run from a clean slate without waiting for the automatic
     * 30-day cleanup. Your **live** data and your store configuration are never touched.
     *
     * **Requires a secret test key** (`tybrite_sk_test_*`). Publishable keys and live keys are
     * rejected. Returns `204 No Content` on success. `DELETE /v1/sandbox/data` does the same thing.
     *
     * @returns void
     * @throws ApiError
     */
    public resetSandbox(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/reset',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Reset your sandbox data (alias)
     * Alias of `POST /v1/sandbox/reset` — wipes all of your store's sandbox test data immediately.
     * Requires a secret test key (`tybrite_sk_test_*`). Returns `204 No Content`.
     *
     * @returns void
     * @throws ApiError
     */
    public deleteSandboxData(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/sandbox/data',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Fast-forward sandbox time
     * Advances time for your **sandbox** data so time-dependent behavior happens now instead of
     * after a real wait. Back-dates your sandbox abandoned carts, stock reservations and analytics
     * events by `advance_days`, then runs the expiry/rollup jobs — so, for example, abandoned-cart
     * windows elapse, reserved stock is released, and analytics roll forward, all without waiting.
     *
     * Only your sandbox data is affected; live data is never touched. The response reports what was
     * shifted and what was intentionally not (see `not_shifted`).
     *
     * Requires a secret test key (`tybrite_sk_test_*`).
     *
     * @returns any Sandbox time advanced.
     * @throws ApiError
     */
    public advanceSandboxTime({
        requestBody,
    }: {
        requestBody: {
            /**
             * Number of days to fast-forward (1–3650).
             */
            advance_days: number;
        },
    }): CancelablePromise<{
        advanced_days?: number;
        /**
         * Per-area count of sandbox rows moved.
         */
        shifted?: Record<string, any>;
        /**
         * Areas intentionally not affected, with the reason.
         */
        not_shifted?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/time',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Replay a sandbox webhook event
     * Re-sends a previously-recorded **sandbox** webhook event to all of your matching, enabled
     * webhook endpoints — so you can re-test your handler without recreating the underlying order,
     * customer, etc. Identify the event either by `event_id`, or by `type` to replay the most
     * recent sandbox event of that type for your store. The original event is unchanged.
     *
     * Requires a secret test key (`tybrite_sk_test_*`).
     *
     * @returns any Replay delivered (per-endpoint results returned).
     * @throws ApiError
     */
    public replaySandboxWebhook({
        requestBody,
    }: {
        requestBody: {
            /**
             * The id of the sandbox webhook event to replay. Provide this or `type`.
             */
            event_id?: string;
            /**
             * Replay the most recent sandbox event of this type (e.g. `order.created`). Provide this or `event_id`.
             */
            type?: string;
        },
    }): CancelablePromise<{
        replayed_event_id?: string;
        results?: Array<Record<string, any>>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sandbox/webhooks/replay',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
