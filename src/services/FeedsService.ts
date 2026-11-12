/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedProduct } from '../models/FeedProduct';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FeedsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Public catalog feed (JSON)
     * Returns a store's catalog as a public JSON feed — **no API key required**. This is the
     * outbound counterpart to ingestion: a store opts in (admin → Catalog Sync → "Publish my
     * catalog") and its products become readable at a stable URL, so any system can pull them
     * (another store's scheduled sync, a partner, a script). Only storefront-safe fields are
     * exposed — never cost or margins.
     *
     * `{store}` is the store's id or its short store code. If the store set a private token,
     * append `?token=…`. The feed shape matches what the ingestion endpoints accept, so a
     * store-to-store sync is a direct pull-and-ingest with no field mapping.
     *
     * @returns any The store's catalog.
     * @throws ApiError
     */
    public getStoreCatalogFeedJson({
        store,
        token,
    }: {
        /**
         * The store's id or short store code.
         */
        store: string,
        /**
         * Required only if the store protected its feed with a token.
         */
        token?: string,
    }): CancelablePromise<{
        products?: Array<FeedProduct>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/feeds/{store}/products.json',
            path: {
                'store': store,
            },
            query: {
                'token': token,
            },
            errors: {
                401: `The feed token is missing or wrong.`,
                403: `The store is on a trial or its subscription has lapsed, so it does not publish a feed.`,
                404: `The store has no public feed (not opted in, or unknown store code).`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
    /**
     * Public catalog feed (XML)
     * XML form of the public catalog feed. See the JSON variant for the opt-in and token rules.
     * No API key required.
     *
     * @returns string The store's catalog as XML.
     * @throws ApiError
     */
    public getStoreCatalogFeedXml({
        store,
        token,
    }: {
        store: string,
        token?: string,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/feeds/{store}/products.xml',
            path: {
                'store': store,
            },
            query: {
                'token': token,
            },
            errors: {
                401: `The feed token is missing or wrong.`,
                403: `The store is on a trial or its subscription has lapsed, so it does not publish a feed.`,
                404: `The store has no public feed (not opted in, or unknown store code).`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
    /**
     * Store summary for AI assistants (llms.txt)
     * A Markdown summary of the store in the llms.txt format: its name, description, website and
     * product count, the categories and subcategories it sells with product counts, and its featured
     * products and collections, each linking to the storefront. It carries only what the storefront
     * already shows and is regenerated as the catalog changes.
     *
     * `{store}` is the store id or store code. The file is published by default; a wholesale store
     * publishes it only once the merchant turns it on, and the merchant can turn it off at any time.
     * A store on a trial or with a lapsed subscription returns 403 `feed_not_available_on_trial`. No API key required.
     *
     * AI assistants look for `/llms.txt` at the root of a site, so a storefront typically forwards its
     * own `/llms.txt` to this address.
     *
     * @returns string The store summary as Markdown.
     * @throws ApiError
     */
    public getStoreLlmsTxt({
        store,
    }: {
        store: string,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/feeds/{store}/llms.txt',
            path: {
                'store': store,
            },
            errors: {
                403: `The store is on a trial or its subscription has lapsed.`,
                404: `The store does not publish an llms.txt.`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
    /**
     * Full catalog for AI assistants (llms-full.txt)
     * The complete form of the store's llms.txt: every product the storefront lists, with its
     * storefront link, category, brand and description, and one line per variant giving its SKU,
     * price, any previous price and whether it is in stock. Published under the same rules as the
     * summary. No API key required.
     *
     * @returns string The full catalog as Markdown.
     * @throws ApiError
     */
    public getStoreLlmsFullTxt({
        store,
    }: {
        store: string,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/feeds/{store}/llms-full.txt',
            path: {
                'store': store,
            },
            errors: {
                403: `The store is on a trial or its subscription has lapsed.`,
                404: `The store does not publish an llms.txt.`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
    /**
     * How an AI assistant connects to a store (agent.json)
     * A small JSON document that tells an AI assistant how to shop the store: the API's base address, a publishable key to
     * call it with, where the tool list and the OpenAPI specification are, the store's feeds, and that every checkout is
     * confirmed by the shopper. **No API key is required to read it.** The key it carries is a production publishable key
     * dedicated to assistants, so the merchant can switch it off on its own.
     *
     * Published by default; a wholesale store's stays off until the merchant turns it on, and turning it off deactivates
     * the key. A storefront serves it at `/.well-known/agentic-commerce.json` by forwarding that path here. `{store}` is the
     * store's code or id.
     * @returns any The descriptor
     * @throws ApiError
     */
    public getStoreAgentDescriptor({
        store,
    }: {
        /**
         * The store's id or short store code.
         */
        store: string,
    }): CancelablePromise<{
        version?: number;
        store?: Record<string, any>;
        api?: {
            base_url?: string;
            publishable_key?: string;
            authentication?: string;
            capabilities?: string;
            openapi?: string;
        };
        feeds?: Record<string, any>;
        checkout?: {
            human_confirmation_required?: boolean;
            intents?: string;
        };
        /**
         * Present and true when the store offers Subscribe & Save, so an assistant can look for offers on a product with `GET /v1/agent/products/{id}/subscribe-save`. Absent otherwise.
         */
        subscribe_save?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/feeds/{store}/agent.json',
            path: {
                'store': store,
            },
            errors: {
                403: `The store is on a trial or its plan has lapsed`,
                404: `The store does not publish a descriptor, or does not exist`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
                500: `The descriptor is temporarily unavailable.`,
            },
        });
    }
}
