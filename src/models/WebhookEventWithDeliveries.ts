/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookDelivery } from './WebhookDelivery';
import type { WebhookEvent } from './WebhookEvent';
export type WebhookEventWithDeliveries = (WebhookEvent & {
    deliveries?: Array<WebhookDelivery>;
});

