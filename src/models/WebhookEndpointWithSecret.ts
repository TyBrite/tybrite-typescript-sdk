/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookEndpoint } from './WebhookEndpoint';
export type WebhookEndpointWithSecret = (WebhookEndpoint & {
    /**
     * HMAC-SHA256 signing secret for this endpoint. **Shown once only** —
     * store it securely. Cannot be retrieved again.
     *
     */
    signing_secret?: string;
});

