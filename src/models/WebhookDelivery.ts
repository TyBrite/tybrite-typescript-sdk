/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookDelivery = {
    id?: string;
    endpoint_id?: string;
    attempt_number?: number;
    status_code?: number | null;
    /**
     * First 1024 characters of the endpoint's response body
     */
    response_body?: string | null;
    latency_ms?: number | null;
    success?: boolean;
    attempted_at?: string;
};

