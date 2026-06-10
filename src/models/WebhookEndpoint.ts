/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookEndpoint = {
    id?: string;
    store_id?: string;
    url?: string;
    events?: Array<string>;
    /**
     * Whether the endpoint is active. An endpoint is automatically disabled
     * (`enabled: false`) after 20 consecutive failed deliveries; see
     * `disabled_reason`. Re-enable it with a `PATCH` once you've fixed the
     * endpoint — doing so also resets the failure counter.
     *
     */
    enabled?: boolean;
    metadata?: Record<string, any>;
    /**
     * When this endpoint last returned a 2xx for a delivery.
     */
    last_success_at?: string | null;
    /**
     * When a delivery to this endpoint last failed.
     */
    last_failure_at?: string | null;
    /**
     * Number of consecutive failed deliveries that exhausted all retries. Reset
     * to 0 by any successful delivery. When it reaches 20 the endpoint is
     * automatically disabled.
     *
     */
    consecutive_failures?: number;
    /**
     * Set when the endpoint was automatically disabled after repeated delivery
     * failures. `null` when the endpoint is enabled or was disabled manually.
     *
     */
    disabled_reason?: string | null;
    /**
     * When the endpoint was automatically disabled. `null` otherwise.
     */
    disabled_at?: string | null;
    created_at?: string;
    updated_at?: string;
};

