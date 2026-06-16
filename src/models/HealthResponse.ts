/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HealthResponse = {
    /**
     * Overall API status
     */
    status?: HealthResponse.status;
    /**
     * Gateway process status (always ok if this response is received)
     */
    gateway?: HealthResponse.gateway;
    /**
     * Total time in milliseconds to probe all services
     */
    latency_ms?: number;
    /**
     * Per-service status map
     */
    workers?: Record<string, {
        status?: 'ok' | 'error';
        /**
         * Time in milliseconds to probe this service (null if it did not respond)
         */
        latency_ms?: number | null;
    }>;
    timestamp?: string;
    version?: string;
};
export namespace HealthResponse {
    /**
     * Overall API status
     */
    export enum status {
        OK = 'ok',
        DEGRADED = 'degraded',
        DOWN = 'down',
    }
    /**
     * Gateway process status (always ok if this response is received)
     */
    export enum gateway {
        OK = 'ok',
    }
}

