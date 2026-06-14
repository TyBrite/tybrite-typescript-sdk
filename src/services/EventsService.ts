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
     * @returns any The event was accepted.
     * @throws ApiError
     */
    public recordEvent({
        requestBody,
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
        },
    }): CancelablePromise<{
        recorded?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/events',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
