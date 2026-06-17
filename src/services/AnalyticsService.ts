/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AnalyticsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Record a storefront analytics event
     * Records a first-party storefront analytics event — a page view or the start of a
     * browsing session. These events power Store Analytics: traffic, audience, the
     * conversion funnel, and revenue-by-source reporting that the merchant views in
     * their dashboard.
     *
     * Fire this from the storefront on each route change. Send `session_start` for the
     * first event of a new browsing session and `page_view` for each page thereafter.
     * Provide a stable `visitor_id` (persisted in the browser, e.g. localStorage) so
     * returning visitors are recognised, and a `session_id` per browsing session (the
     * same identifier you use for an anonymous cart) so events group into a session.
     *
     * The device, browser, operating system, and approximate location (country/region)
     * are derived automatically from the request — you do not send them. Pass only the
     * `path` (the pathname; query strings are ignored), the `referrer`, and any UTM
     * campaign parameters present on the landing URL. Publishable keys are accepted, so
     * the call can be made directly from the browser. The request is processed
     * best-effort and returns immediately; it never blocks the page.
     *
     * @returns any The event was accepted.
     * @throws ApiError
     */
    public collectAnalyticsEvent({
        requestBody,
    }: {
        requestBody: {
            /**
             * `session_start` for the first event of a session, `page_view` on each route
             * change, and `page_close` (with `duration_ms`) fired on page hide to capture
             * dwell time — send it with `navigator.sendBeacon` from a `visibilitychange` /
             * `pagehide` handler so it survives the page unload.
             *
             */
            event_type: 'page_view' | 'session_start' | 'page_close';
            /**
             * A stable per-visitor identifier persisted in the browser (e.g. localStorage). Used to distinguish new vs returning visitors.
             */
            visitor_id: string;
            /**
             * The shopper's browsing-session identifier (same concept as the anonymous cart session). May also be sent as the `x-session-id` header.
             */
            session_id: string;
            /**
             * The page path being viewed. Only the pathname is stored; any query string is discarded.
             */
            path?: string;
            /**
             * The document referrer, when present.
             */
            referrer?: string;
            utm_source?: string;
            utm_medium?: string;
            utm_campaign?: string;
            utm_term?: string;
            utm_content?: string;
            /**
             * Time spent on the page in milliseconds. Send with a `page_close` event to power average time-on-page and session-duration metrics.
             */
            duration_ms?: number;
            /**
             * The signed-in shopper, when known.
             */
            customer_id?: string;
        },
    }): CancelablePromise<{
        recorded?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/analytics/collect',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
