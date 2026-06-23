/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { Subcategory } from '../models/Subcategory';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TaxonomyService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List categories
     * Retrieve all product categories for the authenticated store. Accepts both publishable and secret API keys. When called with a marketplace operator key, returns categories aggregated across all merchants in the marketplace. With a marketplace operator key, pass `?store_id=<merchant>` to narrow results to a single merchant.
     * @returns any Success
     * @throws ApiError
     */
    public listCategories({
        storeId,
        search,
        active = true,
        limit = 50,
        cursor,
        fields,
    }: {
        /**
         * Marketplace operator key only. Narrow the aggregated marketplace categories to a single merchant. Ignored when using a single-store key.
         */
        storeId?: string,
        /**
         * Case-insensitive substring match on category name
         */
        search?: string,
        /**
         * Filter by active status. Defaults to true (only active categories) when omitted.
         */
        active?: boolean,
        /**
         * Maximum number of results to return
         */
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<{
        categories?: Array<Category>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/categories',
            query: {
                'store_id': storeId,
                'search': search,
                'active': active,
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
     * Get category
     * Retrieve a single product category by ID. Accepts both publishable and secret API keys.
     * @returns Category Success
     * @throws ApiError
     */
    public getCategory({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<Category> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/categories/{id}',
            path: {
                'id': id,
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
     * List subcategories
     * Retrieve product subcategories. Subcategories can be nested to arbitrary depth via their parent_id. By default a flat list is returned; use tree=true to receive them as a nested hierarchy, or parent_id / root_only to fetch a specific level. Accepts both publishable and secret API keys. When called with a marketplace operator key, returns subcategories aggregated across all merchants in the marketplace. With a marketplace operator key, pass `?store_id=<merchant>` to narrow results to a single merchant.
     * @returns any Success
     * @throws ApiError
     */
    public listSubcategories({
        storeId,
        categoryId,
        parentId,
        rootOnly = false,
        tree = false,
        search,
        active = true,
        limit = 100,
        cursor,
        fields,
    }: {
        /**
         * Marketplace operator key only. Narrow the aggregated marketplace subcategories to a single merchant. Ignored when using a single-store key.
         */
        storeId?: string,
        /**
         * Filter subcategories by parent category ID
         */
        categoryId?: string,
        /**
         * Return only the direct children of the given subcategory. Pass the literal value null to return only top-level subcategories (those with no parent).
         */
        parentId?: string,
        /**
         * When true, return only top-level subcategories (those with no parent). Useful for rendering the first level of a category's subcategory hierarchy.
         */
        rootOnly?: boolean,
        /**
         * When true, return subcategories as a nested hierarchy: each subcategory includes a children array of its nested subcategories. The response is not paginated in this mode — the full tree is returned in one call.
         */
        tree?: boolean,
        /**
         * Case-insensitive substring match on subcategory name
         */
        search?: string,
        /**
         * Filter by active status. Defaults to true (only active subcategories) when omitted.
         */
        active?: boolean,
        /**
         * Maximum number of results to return
         */
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<{
        subcategories?: Array<Subcategory>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/subcategories',
            query: {
                'store_id': storeId,
                'category_id': categoryId,
                'parent_id': parentId,
                'root_only': rootOnly,
                'tree': tree,
                'search': search,
                'active': active,
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
     * Get subcategory by ID
     * Retrieve a single subcategory by ID. Use the include parameter to also receive the subcategory's direct children and/or its ancestor breadcrumb chain. Accepts both publishable and secret API keys.
     * @returns Subcategory Success
     * @throws ApiError
     */
    public getSubcategory({
        id,
        include,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of related data to nest on the response. Supported values: children (the subcategory's direct, one-level-down child subcategories, as a children array) and ancestors (the breadcrumb chain from the top-level subcategory down to the immediate parent, as an ancestors array ordered root-first; empty for a top-level subcategory). Combine them, e.g. include=ancestors,children. Omit for a flat subcategory object.
         */
        include?: string,
        /**
         * Comma-separated list of fields to include in the response.
         */
        fields?: string,
    }): CancelablePromise<Subcategory> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/subcategories/{id}',
            path: {
                'id': id,
            },
            query: {
                'include': include,
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
}
