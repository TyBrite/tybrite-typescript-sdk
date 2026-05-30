/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookEndpoint = {
    id?: string;
    store_id?: string;
    url?: string;
    events?: Array<string>;
    enabled?: boolean;
    metadata?: Record<string, any>;
    last_success_at?: string | null;
    last_failure_at?: string | null;
    created_at?: string;
    updated_at?: string;
};

