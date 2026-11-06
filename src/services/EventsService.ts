/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EventsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Record a storefront product event
     * Records a shopper interaction with a product — a product view, an add-to-cart, or an
     * add-to-wishlist. These events power the "next-likely-item" recommendation (the `next`
     * recommendation type): the products a shopper is most likely to view or add next, given
     * what they have done in the current session.
     *
     * Send the event as the shopper interacts with the storefront. Provide a stable `session_id`
     * per browsing session (the same identifier you use for an anonymous cart) so events can be
     * grouped into a session path; include `customer_id` when the shopper is signed in.
     *
     * The event references a product by `variant_id` (resolved to its product automatically) or
     * directly by `product_id`. Publishable keys are accepted, so the call can be made from the
     * browser. The request is processed best-effort and returns immediately; it never blocks
     * the page.
     *
     * @returns any Accepted for processing. `recorded` is `false` when the event was not stored (a crawler user agent or an internal failure); the status is 202 either way, so a beacon never blocks the page.
     * @throws ApiError
     */
    public recordEvent({
        requestBody,
        xTybriteChannel,
    }: {
        requestBody: {
            event_type: 'view' | 'add_to_cart' | 'add_to_wishlist';
            /**
             * The product variant the shopper interacted with. Either `variant_id` or `product_id` is required.
             */
            variant_id?: string;
            /**
             * The product the shopper interacted with. Either `variant_id` or `product_id` is required.
             */
            product_id?: string;
            /**
             * The shopper's browsing-session identifier (same concept as the anonymous cart session). May also be sent as the `x-session-id` header.
             */
            session_id?: string;
            /**
             * The signed-in shopper, when known.
             */
            customer_id?: string;
            /**
             * Where the shopper was when this happened. Send `marketplace` from a marketplace storefront so the event is attributed to that marketplace rather than to the seller's own shop; omit it, or send `storefront`, for a seller's own site. The marketplace itself is resolved server-side from the store, so this only says which channel — it cannot name one. May also be sent as the `x-tybrite-channel` header.
             */
            channel?: 'storefront' | 'marketplace';
        },
        /**
         * Where the shopper was, when it is easier to set a header than to add a body field — `marketplace` from a marketplace storefront, `storefront` (or omitted) for a seller's own site. A `marketplace` value in either this header or the `channel` body field attributes the event to the marketplace; `storefront` in one does not override `marketplace` in the other. The marketplace itself is resolved server-side from the store, so this says which channel and cannot name one.
         */
        xTybriteChannel?: 'storefront' | 'marketplace',
    }): CancelablePromise<{
        recorded: boolean;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/events',
            headers: {
                'x-tybrite-channel': xTybriteChannel,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error. A 5xx response never carries \`details\`.`,
            },
        });
    }
}
