/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookEndpoint } from './WebhookEndpoint';
export type WebhookEndpointWithStats = (WebhookEndpoint & {
    delivery_stats?: {
        total?: number;
        successful?: number;
        failed?: number;
    };
});

