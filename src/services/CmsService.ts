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
     * @returns any Success
     * @throws ApiError
     */
    public listPosts({
        status,
        category,
        limit,
        fields,
    }: {
        status?: 'published' | 'draft',
        category?: string,
        limit?: number,
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
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts',
            query: {
                'status': status,
                'category': category,
                'limit': limit,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get blog post by slug
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List lookbooks
     * @returns any Success
     * @throws ApiError
     */
    public listLookbooks({
        status,
        limit = 50,
        fields,
    }: {
        status?: 'published' | 'draft',
        limit?: number,
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
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks',
            query: {
                'status': status,
                'limit': limit,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get lookbook details by slug
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
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
