/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookEvent = {
    /**
     * Unique event identifier (format `evt_<timestamp>_<random>`)
     */
    id?: string;
    store_id?: string;
    /**
     * Event type
     */
    type?: string;
    /**
     * Full event envelope in Stripe-style format:
     * ```json
     * {
         * "id": "evt_...",
         * "type": "order.paid",
         * "created_at": "2026-05-20T10:30:00Z",
         * "store_id": "...",
         * "api_version": "v1",
         * "data": { "object": { ... } },
         * "previous_attributes": { ... }
         * }
         * ```
         *
         */
        payload?: Record<string, any>;
        created_at?: string;
    };

