/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pagination } from '../models/Pagination';
import type { WebhookEndpoint } from '../models/WebhookEndpoint';
import type { WebhookEndpointWithSecret } from '../models/WebhookEndpointWithSecret';
import type { WebhookEndpointWithStats } from '../models/WebhookEndpointWithStats';
import type { WebhookEvent } from '../models/WebhookEvent';
import type { WebhookEventWithDeliveries } from '../models/WebhookEventWithDeliveries';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class WebhooksService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a webhook endpoint
     * Register a new HTTPS endpoint to receive outbound event notifications.
     * The `signing_secret` is returned **once** at creation — store it
     * immediately. It cannot be retrieved again; rotate it via a DELETE +
     * re-create if lost.
     *
     * @returns any Endpoint created
     * @throws ApiError
     */
    public createWebhookEndpoint({
        requestBody,
    }: {
        requestBody: {
            /**
             * HTTPS destination URL. HTTP is rejected.
             */
            url: string;
            /**
             * Array of event types to subscribe to. Use `["*"]` for all events.
             *
             * **Order lifecycle:** `order.created`, `order.paid`, `order.fulfilled`,
             * `order.cancelled`, `order.refunded`, `order.updated`
             *
             * **Payment lifecycle:** `payment.succeeded`, `payment.failed`, `payment.refunded`
             *
             * **Customer lifecycle:** `customer.created`, `customer.updated`, `customer.deleted`
             *
             * **Inventory & catalog:** `product.created`, `product.updated`,
             * `product.stock_low`, `product.out_of_stock`
             *
             * **Cart & checkout:** `cart.created`, `cart.updated`, `cart.abandoned`
             *
             * **Gift cards:** `gift_card.issued`, `gift_card.redeemed`, `gift_card.expired`
             *
             * **Promotions:** `promotion.applied`
             *
             */
            events: Array<string>;
            /**
             * Whether the endpoint is active. Disabled endpoints are skipped on delivery.
             */
            enabled?: boolean;
            /**
             * Opaque key-value pairs for your own reference (not sent in deliveries).
             */
            metadata?: Record<string, any>;
        },
    }): CancelablePromise<{
        webhook_endpoint?: WebhookEndpointWithSecret;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/webhook_endpoints',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List webhook endpoints
     * Returns all webhook endpoints for the authenticated store. Soft-deleted endpoints are excluded.
     * @returns any Success
     * @throws ApiError
     */
    public listWebhookEndpoints({
        limit = 50,
        cursor,
    }: {
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded `created_at`)
         */
        cursor?: string,
    }): CancelablePromise<{
        webhook_endpoints?: Array<WebhookEndpoint>;
        pagination?: Pagination;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/webhook_endpoints',
            query: {
                'limit': limit,
                'cursor': cursor,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a webhook endpoint
     * Returns full details for a single endpoint including delivery statistics.
     * @returns any Success
     * @throws ApiError
     */
    public getWebhookEndpoint({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        webhook_endpoint?: WebhookEndpointWithStats;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/webhook_endpoints/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update a webhook endpoint
     * Partially update a webhook endpoint. All fields are optional.
     * @returns any Endpoint updated
     * @throws ApiError
     */
    public updateWebhookEndpoint({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            /**
             * New HTTPS destination URL.
             */
            url?: string;
            /**
             * Updated event subscription list. Replaces existing list entirely.
             */
            events?: Array<string>;
            /**
             * Enable or disable the endpoint.
             */
            enabled?: boolean;
            /**
             * Updated metadata. Replaces existing metadata entirely.
             */
            metadata?: Record<string, any>;
        },
    }): CancelablePromise<{
        webhook_endpoint?: WebhookEndpoint;
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/webhook_endpoints/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete a webhook endpoint
     * Soft-deletes the endpoint. In-flight deliveries are not cancelled.
     * @returns any Endpoint deleted
     * @throws ApiError
     */
    public deleteWebhookEndpoint({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/webhook_endpoints/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Send a test event
     * Sends a synthetic test payload to the endpoint immediately. Useful for verifying
     * signature verification and endpoint connectivity during integration.
     *
     * The payload includes `"test": true` so your handler can distinguish test from live events.
     *
     * @returns any Test delivery attempted
     * @throws ApiError
     */
    public sendTestWebhookEvent({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            /**
             * The event type to simulate.
             */
            event_type?: 'order.created' | 'order.paid' | 'order.fulfilled' | 'order.cancelled' | 'payment.succeeded' | 'payment.failed' | 'customer.created' | 'product.created' | 'product.stock_low' | 'cart.abandoned' | 'gift_card.issued' | 'promotion.applied';
        },
    }): CancelablePromise<{
        success?: boolean;
        event_id?: string;
        event_type?: string;
        endpoint_url?: string;
        status_code?: number | null;
        response_body?: string | null;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/webhook_endpoints/{id}/test',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List webhook events
     * Returns the event log for your store in reverse-chronological order.
     * Use this for debugging delivery failures or auditing event history.
     *
     * @returns any Success
     * @throws ApiError
     */
    public listWebhookEvents({
        type,
        limit = 50,
        cursor,
    }: {
        /**
         * Filter by event type (e.g. `order.paid`)
         */
        type?: string,
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded `created_at`)
         */
        cursor?: string,
    }): CancelablePromise<{
        webhook_events?: Array<WebhookEvent>;
        pagination?: Pagination;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/webhook_events',
            query: {
                'type': type,
                'limit': limit,
                'cursor': cursor,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a webhook event
     * Returns a single event with all its delivery attempts across all endpoints.
     * @returns any Success
     * @throws ApiError
     */
    public getWebhookEvent({
        id,
    }: {
        /**
         * Event ID (e.g. `evt_2026-05-20-abc123`)
         */
        id: string,
    }): CancelablePromise<{
        webhook_event?: WebhookEventWithDeliveries;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/webhook_events/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Retry a webhook event
     * Manually re-delivers the event to all enabled endpoints that are subscribed
     * to its event type. Each re-delivery is recorded as a new attempt in the
     * delivery log.
     *
     * @returns any Retry initiated
     * @throws ApiError
     */
    public retryWebhookEvent({
        id,
    }: {
        /**
         * Event ID
         */
        id: string,
    }): CancelablePromise<{
        event_id?: string;
        /**
         * Number of endpoints retried
         */
        retried?: number;
        results?: Array<{
            endpoint_id?: string;
            success?: boolean;
            status_code?: number | null;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/webhook_events/{id}/retry',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
