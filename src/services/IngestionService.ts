/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IngestProduct } from '../models/IngestProduct';
import type { IngestResult } from '../models/IngestResult';
import type { IngestRowError } from '../models/IngestRowError';
import type { IngestSummary } from '../models/IngestSummary';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IngestionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Ingest a batch of products
     * Push or sync a batch of products into your store from an external source. Accepts
     * **JSON, XML, or CSV** — declare the format with the `Content-Type` header
     * (`application/json`, `application/xml`, `text/csv`) or the `?format=` query parameter.
     *
     * **Batch size.** A request carries at most **12 products**; a larger batch is rejected with
     * `400` rather than applied in part. Send a large catalog as a sequence of batches, or
     * configure a scheduled feed pull, which is built for whole-catalog sync.
     *
     * **Upsert by SKU.** A product whose `sku` already exists in your store is **updated**;
     * a new `sku` is **created**. Pass `?strategy=create_only` to skip existing SKUs instead
     * of updating them.
     *
     * **Variants.** Rows that share the same `product_group` value become variants of one
     * product (each row needs its own unique `sku`). Rows without a `product_group` are
     * single-variant products.
     *
     * **Prices.** `price` is the in-store price of the row's variant. `online_price` and
     * `online_sale_price` set the variant's online price and online sale price, so each variant of a
     * product can sell online at its own price. A row without `online_price` sells online at its
     * in-store price. The online sale price applies only when it is greater than zero and below the
     * variant's online price. `sale_price` and `discount_price` are accepted as aliases of
     * `online_sale_price`, and `web_price` as an alias of `online_price`.
     *
     * **Partial success.** Rows are validated and applied independently — one bad row never
     * fails the whole batch. The response always carries a `summary` with created / updated /
     * skipped / failed counts and an `errors` array describing every rejected row (its
     * position, SKU, the offending field, and a human-readable reason). If **every** row
     * fails validation the response status is `422`.
     *
     * **Updates keep the merchant's edits.** When a row's SKU already exists, each field is written
     * only if the API owns it: the store chooses, per field, whether the API or the merchant owns it
     * (Settings, Catalog sync, Field ownership, API push). A field the merchant owns is refreshed
     * until the merchant changes it, then left alone. By default the merchant owns names,
     * descriptions, categories, images, SEO fields and tags, and the API owns price, cost, stock,
     * barcodes and product identifiers. A new product always takes every field the row carries.
     *
     * **Required headers** (same signing scheme as orders and payments):
     * - `Idempotency-Key` — a unique key per batch; retrying with the same key returns the
     * original result instead of re-processing.
     * - `X-Timestamp` — unix time in seconds, within 5 minutes of server time.
     * - `X-Signature` — base64 HMAC-SHA256 of `` `${X-Timestamp}.${raw_body}` `` signed with
     * your store's signing secret (the Integrations page, Developer section).
     *
     * Tip: validate your feed first with `POST /v1/ingest/test` (no key, no writes).
     *
     * @returns IngestResult Batch processed. May be a full success or a partial success — inspect `summary`
     * and `errors`. `status` is `success` (no failures) or `partial` (some rows failed).
     *
     * @throws ApiError
     */
    public ingestProducts({
        idempotencyKey,
        xTimestamp,
        xSignature,
        requestBody,
        format,
        strategy = 'upsert_by_sku',
        dryRun = false,
        publish = false,
    }: {
        /**
         * Unique key per batch. Retrying the same batch with the same key returns the original result instead of re-importing; the same key with a different batch answers `409 idempotency_key_reused`, and a first run still in progress answers `409 idempotency_in_progress`.
         */
        idempotencyKey: string,
        /**
         * Unix timestamp in seconds (current time). Must be within 5 minutes of server time.
         * Used to prevent replay attacks.
         *
         */
        xTimestamp: number,
        /**
         * Base64-encoded HMAC-SHA256 of the payload (`${X-Timestamp}.${raw_body}`), signed with your
         * HMAC secret from the Integrations page (Developer section). Required in addition to the secret key.
         *
         */
        xSignature: string,
        /**
         * A batch of products. For JSON use `{ "products": [ … ] }` (or a bare array). For
         * CSV, the first row is a header; for XML, a `<products>` root with `<product>`
         * children. Field names are matched leniently (e.g. `Product Name` → `name`).
         *
         */
        requestBody: {
            products?: Array<IngestProduct>;
        },
        /**
         * Overrides the `Content-Type` for format detection.
         */
        format?: 'json' | 'xml' | 'csv',
        /**
         * `upsert_by_sku` (default) updates existing SKUs; `create_only` skips them.
         *
         */
        strategy?: 'upsert_by_sku' | 'create_only',
        /**
         * When `true`, validate and report without writing anything. The report separates new rows (`rows_created`), rows that would update an existing SKU (`rows_updated`, or `rows_skipped` under `create_only`), and rows that would fail. A new row whose `fulfilment_kind` the store does not offer, or its plan does not include, is reported as failed with the sentence the real run would give. The response carries `delivery_types_checked` (`false` when the store's delivery types could not be read just now).
         */
        dryRun?: boolean,
        /**
         * When `true`, products this batch creates are published to the storefront at once. Off by default. Existing products updated by the batch keep their current state, and a row with `is_online_enabled` false stays offline.
         */
        publish?: boolean,
    }): CancelablePromise<IngestResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/ingest/products',
            headers: {
                'Idempotency-Key': idempotencyKey,
                'X-Timestamp': xTimestamp,
                'X-Signature': xSignature,
            },
            query: {
                'format': format,
                'strategy': strategy,
                'dry_run': dryRun,
                'publish': publish,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Missing/invalid secret key, or a missing/invalid request signature.`,
                402: `The store's subscription is not active, or the store is deactivated. Every API-keyed request for that store answers \`402\` with \`subscription_expired\` until the subscription is renewed.`,
                403: `Insufficient permissions - operation requires secret key`,
                409: `The \`Idempotency-Key\` was already used for a different batch (\`idempotency_key_reused\`), or the first run with this key is still being processed (\`idempotency_in_progress\`; retry with the same key).`,
                422: `Every row failed validation; nothing was written. A retry with the same \`Idempotency-Key\` replays this 422.`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
    /**
     * Get a sample product feed
     * Returns a valid sample product feed you can copy to model your own. **No API key
     * required.** Use `?format=json|xml|csv` to choose the format. The sample includes a
     * single-variant product and a multi-variant product so you can see how variants are
     * expressed via `product_group`. Rate-limited to 60 requests/hour per IP.
     *
     * @returns any A sample feed in the requested format.
     * @throws ApiError
     */
    public getIngestSample({
        format = 'json',
    }: {
        format?: 'json' | 'xml' | 'csv',
    }): CancelablePromise<{
        products?: Array<IngestProduct>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/ingest/sample',
            query: {
                'format': format,
            },
            errors: {
                400: `The \`format\` parameter is not \`json\`, \`xml\` or \`csv\`.`,
                402: `The store's subscription is not active, or the store is deactivated. Every API-keyed request for that store answers \`402\` with \`subscription_expired\` until the subscription is renewed.`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
    /**
     * Validate a product feed (no writes)
     * Parse and validate a product feed **without writing anything** to your store, and get
     * back the same `summary` and `errors` you would receive from a real import — plus a
     * `normalized_preview` of how Galactic Core interpreted your rows. With no store behind the
     * request, the delivery types a store offers cannot be checked, so the response says
     * `delivery_types_checked: false`; a dry run with a key (`dry_run=true` on the real endpoint) checks them. **No API key
     * required**, so you can perfect your feed format before integrating. Accepts JSON, XML,
     * or CSV like the real endpoint. Rate-limited to 60 requests/hour per IP.
     *
     * @returns any Validation result. `status` is `valid` (no failures), `partial` (some rows failed),
     * or `invalid` (all rows failed).
     *
     * @throws ApiError
     */
    public testIngest({
        requestBody,
        format,
    }: {
        requestBody: {
            products?: Array<IngestProduct>;
        },
        /**
         * The feed format, when the content type does not say.
         */
        format?: 'json' | 'xml' | 'csv',
    }): CancelablePromise<{
        status?: 'valid' | 'partial' | 'invalid';
        format?: string;
        validate_only?: boolean;
        /**
         * Always `false` here. The open test endpoint has no store, so which delivery types a store offers is not checked.
         */
        delivery_types_checked?: boolean;
        summary?: IngestSummary;
        errors?: Array<IngestRowError>;
        normalized_preview?: Array<IngestProduct>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/ingest/test',
            query: {
                'format': format,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                402: `The store's subscription is not active, or the store is deactivated. Every API-keyed request for that store answers \`402\` with \`subscription_expired\` until the subscription is renewed.`,
                429: `Too many requests. Three distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota), \`guest_limit_reached\` (the same per-address throttle, answered to a guest, a request with no shopper credential, whose per-address hourly budget at this store is lower than a signed-in shopper's) and \`quota_exceeded\` (your plan's monthly request allowance is reached).
                \`guest_limit_reached\` carries \`details\`: \`scope\` is \`guest\`, \`bucket\` is \`browse\`, \`limit\` is the guest budget, \`window_seconds\` is \`3600\`, \`remaining\` is \`0\`, \`reset\` and \`retry_after\` say when the hour ends, \`signed_in_limit\` is the signed-in shopper's budget and \`sign_in_raises_limit\` is \`true\`. A storefront shows its sign-in prompt for this code. A signed-in shopper, and a guest whose budget is not lower than the signed-in one, get \`rate_limited\`.
                On a throttle refusal (\`rate_limited\`, \`guest_limit_reached\`) \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\` describe the window that refused the request (the hour, the day or the per-address hour) and \`Retry-After\` is the time until it ends. On \`quota_exceeded\` they describe the monthly allowance.`,
            },
        });
    }
}
