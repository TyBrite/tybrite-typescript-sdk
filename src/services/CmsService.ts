/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lookbook } from '../models/Lookbook';
import type { Post } from '../models/Post';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CmsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List blog posts
     * List the store's published blog posts, newest first, with cursor-based pagination. Posts may
     * be commerce-aware (shoppable) and link to products in the catalog (`product_count` on each
     * item).
     *
     * **Auth:** read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API
     * keys, so it can be called directly from the storefront. No customer session required.
     *
     * **When to use:** render a blog index or editorial feed. Filter by category with `?category=`
     * (a category **slug**), cap page size with `limit` (default 20, max 100), and page through with
     * the `cursor` returned in `pagination.next_cursor` while `pagination.has_more` is `true`. Use
     * `getPost` to fetch a single post's full `content`.
     *
     * @returns any Success
     * @throws ApiError
     */
    public listPosts({
        category,
        limit = 20,
        cursor,
        fields,
    }: {
        /**
         * Filter posts by category slug
         */
        category?: string,
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `excerpt`, `content`, `featured_image`
         * - `category_id`, `category_name`, `category_slug`, `category_icon`
         * - `author_name`, `author_avatar`, `status`, `published_at`
         * - `view_count`, `product_count`, `seo_title`, `seo_description`
         * - `created_at`, `updated_at`, `products`, `lookbooks`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        posts?: Array<Post>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts',
            query: {
                'category': category,
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get blog post by slug
     * Retrieve a single published blog post by its URL slug, including full `content` and any linked products (for shoppable posts). Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys. Returns 404 if no published post matches the slug.
     * @returns Post Success
     * @throws ApiError
     */
    public getPost({
        slug,
        fields,
    }: {
        slug: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `excerpt`, `content`, `featured_image`
         * - `category_id`, `category_name`, `category_slug`, `category_icon`
         * - `author_name`, `author_avatar`, `status`, `published_at`
         * - `view_count`, `product_count`, `seo_title`, `seo_description`
         * - `created_at`, `updated_at`, `products`, `lookbooks`
         *
         */
        fields?: string,
    }): CancelablePromise<Post> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts/{slug}',
            path: {
                'slug': slug,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List lookbooks
     * List the store's published shoppable lookbooks (curated, image-led product galleries), newest first, with cursor-based pagination. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys.
     * @returns any Success
     * @throws ApiError
     */
    public listLookbooks({
        limit = 20,
        cursor,
        fields,
    }: {
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `description`, `featured_image`
         * - `collection_id`, `published_at`, `created_at`, `images`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        lookbooks?: Array<Lookbook>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks',
            query: {
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get lookbook details by slug
     * Retrieve a single published lookbook by its URL slug, including its images and the products featured in each. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys. Returns 404 if no published lookbook matches the slug.
     * @returns Lookbook Success
     * @throws ApiError
     */
    public getLookbook({
        slug,
        fields,
    }: {
        slug: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `description`, `featured_image`
         * - `collection_id`, `published_at`, `created_at`, `images`
         *
         */
        fields?: string,
    }): CancelablePromise<Lookbook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks/{slug}',
            path: {
                'slug': slug,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Subscribe an email to the store's newsletter
     * Capture a storefront newsletter signup. Email is the identity — this works for anonymous
     * visitors and signed-in shoppers alike (a signed-in storefront simply prefills the email
     * field). When the store has connected a marketing tool, the new subscriber is automatically
     * synced to the merchant's chosen list.
     *
     * **Auth:** accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys, so
     * it can be called directly from the storefront. No customer session required.
     *
     * **Idempotent:** re-subscribing the same email is safe — it returns `200` with
     * `already_subscribed: true` and never creates a duplicate. A fresh signup returns `201`.
     *
     * @returns any Already subscribed (idempotent re-subscribe).
     * @throws ApiError
     */
    public subscribeNewsletter({
        requestBody,
    }: {
        requestBody: {
            /**
             * The subscriber's email address.
             */
            email: string;
            /**
             * Optional free-text label for where the signup happened (e.g. a blog post or lookbook slug, or `footer`). Surfaced to the merchant and forwarded as an event property.
             */
            source?: string | null;
        },
    }): CancelablePromise<{
        subscribed?: boolean;
        already_subscribed?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/newsletter/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
