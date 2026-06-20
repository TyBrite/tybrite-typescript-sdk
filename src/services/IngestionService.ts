/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedProduct } from '../models/FeedProduct';
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
     * **Upsert by SKU.** A product whose `sku` already exists in your store is **updated**;
     * a new `sku` is **created**. Pass `?strategy=create_only` to skip existing SKUs instead
     * of updating them.
     *
     * **Variants.** Rows that share the same `product_group` value become variants of one
     * product (each row needs its own unique `sku`). Rows without a `product_group` are
     * single-variant products.
     *
     * **Partial success.** Rows are validated and applied independently — one bad row never
     * fails the whole batch. The response always carries a `summary` with created / updated /
     * skipped / failed counts and an `errors` array describing every rejected row (its
     * position, SKU, the offending field, and a human-readable reason). If **every** row
     * fails validation the response status is `422`.
     *
     * **Required headers** (same signing scheme as orders and payments):
     * - `Idempotency-Key` — a unique key per batch; retrying with the same key returns the
     * original result instead of re-processing.
     * - `X-Timestamp` — unix time in seconds, within 5 minutes of server time.
     * - `X-Signature` — base64 HMAC-SHA256 of `` `${X-Timestamp}.${raw_body}` `` signed with
     * your store's signing secret (Settings → Integration Settings).
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
    }: {
        /**
         * Unique key per batch; retrying with the same key returns the original result instead of re-importing.
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
         * HMAC secret from Settings → Integration Settings. Required in addition to the secret key.
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
         * When `true`, validate and report without writing anything.
         */
        dryRun?: boolean,
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
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Missing/invalid secret key, or a missing/invalid request signature.`,
                403: `Insufficient permissions - operation requires secret key`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                422: `Every row failed validation; nothing was written.`,
                429: `Rate limit exceeded`,
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
                429: `Rate limit exceeded`,
            },
        });
    }
    /**
     * Validate a product feed (no writes)
     * Parse and validate a product feed **without writing anything** to your store, and get
     * back the same `summary` and `errors` you would receive from a real import — plus a
     * `normalized_preview` of how Galactic Core interpreted your rows. **No API key
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
    }: {
        requestBody: {
            products?: Array<IngestProduct>;
        },
    }): CancelablePromise<{
        status?: 'valid' | 'partial' | 'invalid';
        format?: string;
        validate_only?: boolean;
        summary?: IngestSummary;
        errors?: Array<IngestRowError>;
        normalized_preview?: Array<IngestProduct>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/ingest/test',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                429: `Rate limit exceeded`,
            },
        });
    }
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
                404: `The store has no public feed (not opted in, or wrong/missing token).`,
                429: `Rate limit exceeded`,
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
                404: `The store has no public feed.`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
