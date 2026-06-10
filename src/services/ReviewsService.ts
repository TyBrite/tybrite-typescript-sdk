/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pagination } from '../models/Pagination';
import type { Review } from '../models/Review';
import type { ReviewSummary } from '../models/ReviewSummary';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ReviewsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List reviews for a product
     * Returns reviews for a product. Publishable keys see only approved reviews.
     * Secret keys can filter by any status including `pending` and `rejected`.
     *
     * The response always includes an aggregate `summary` block with the average
     * rating and star distribution across all approved reviews for the product,
     * regardless of the `status` filter applied to the `reviews` array.
     *
     * **Marketplace:** A marketplace operator key may read approved reviews for a
     * product belonging to one of its merchants. When using an operator key,
     * `store_id` (the merchant who owns the product) is **required**.
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns any Reviews retrieved successfully
     * @throws ApiError
     */
    public listReviews({
        productId,
        storeId,
        variantId,
        status = 'approved',
        rating,
        sort = 'newest',
        limit = 20,
        cursor,
    }: {
        /**
         * Filter reviews for this product. Required.
         */
        productId: string,
        /**
         * Marketplace operator key only — and **required** for operator keys. The
         * merchant that owns the product whose reviews you are reading. Ignored when
         * using a single-store key.
         *
         */
        storeId?: string,
        /**
         * Further filter to reviews that mention a specific variant.
         */
        variantId?: string,
        /**
         * Review status filter. Publishable keys always see only `approved` regardless
         * of this parameter. Secret keys can pass `pending`, `rejected`, or `all`.
         *
         */
        status?: 'approved' | 'pending' | 'rejected' | 'all',
        /**
         * Filter to reviews with this exact star rating.
         */
        rating?: number,
        /**
         * Sort order: `newest`/`oldest` by submission date; `highest`/`lowest` by rating.
         *
         */
        sort?: 'newest' | 'oldest' | 'highest' | 'lowest',
        /**
         * Number of reviews to return per page.
         */
        limit?: number,
        /**
         * Pagination cursor from the previous response's `pagination.next_cursor`.
         * Omit for the first page.
         *
         */
        cursor?: string,
    }): CancelablePromise<{
        reviews: Array<Review>;
        pagination: Pagination;
        summary: ReviewSummary;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/reviews',
            query: {
                'product_id': productId,
                'store_id': storeId,
                'variant_id': variantId,
                'status': status,
                'rating': rating,
                'sort': sort,
                'limit': limit,
                'cursor': cursor,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Submit a product review
     * Submits a review on behalf of a logged-in customer. Requires both an API
     * key and a customer session token.
     *
     * Reviews are created with `status: "pending"` and must be approved by the
     * store owner before they appear in public listing results.
     *
     * **Authentication:** API key in `Authorization: Bearer` header **and** a
     * customer JWT in the `x-auth-token` header (obtained from
     * `POST /v1/auth/login`).
     *
     * **Duplicate prevention:** A customer may only submit one non-rejected review
     * per product. Attempting a second submission returns `409 Conflict`.
     *
     * **Verified purchase:** If you provide an `order_id` that belongs to the
     * authenticated customer's order history at this store, the review is marked
     * `verified_purchase: true`.
     *
     * **Rate limit:** 10 submissions/hour per IP address.
     *
     * @returns any Review submitted and pending moderation
     * @throws ApiError
     */
    public submitReview({
        xAuthToken,
        requestBody,
    }: {
        /**
         * Customer session JWT from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`.
         */
        xAuthToken: string,
        requestBody: {
            /**
             * Product being reviewed.
             */
            product_id: string;
            /**
             * Optional — specific variant being reviewed.
             */
            variant_id?: string;
            /**
             * Optional — the order this review relates to. Providing a valid order
             * that belongs to the authenticated customer marks the review as
             * `verified_purchase: true`.
             *
             */
            order_id?: string;
            /**
             * Star rating from 1 (lowest) to 5 (highest).
             */
            rating: number;
            /**
             * Optional short headline for the review.
             */
            title?: string;
            /**
             * Optional full review text.
             */
            body?: string;
            /**
             * Optional array of image or video URLs attached to the review.
             */
            media_urls?: Array<string>;
        },
    }): CancelablePromise<{
        review: Review;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/reviews',
            headers: {
                'x-auth-token': xAuthToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                409: `Conflict — the request could not be completed because it conflicts with the current state of a resource.
                Common causes:
                - Email already registered to another customer at this store
                - Item already exists in wishlist
                - Idempotency-Key reused with a different request body
                `,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a single review
     * Returns a single review by ID. Publishable keys see only approved reviews —
     * pending or rejected reviews return `404`. Secret keys see all statuses.
     *
     * **Marketplace:** A marketplace operator key may read an approved review that
     * belongs to one of its merchants. When using an operator key, `store_id` (the
     * merchant who owns the reviewed product) is **required**.
     *
     * **Rate limit:** 600 requests/hour per API key.
     *
     * @returns any Review found
     * @throws ApiError
     */
    public getReview({
        id,
        storeId,
    }: {
        /**
         * Review UUID.
         */
        id: string,
        /**
         * Marketplace operator key only — and **required** for operator keys. The
         * merchant that owns the reviewed product. Ignored when using a single-store key.
         *
         */
        storeId?: string,
    }): CancelablePromise<{
        review: Review;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/reviews/{id}',
            path: {
                'id': id,
            },
            query: {
                'store_id': storeId,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete your own review
     * Permanently deletes a review submitted by the authenticated customer.
     *
     * A customer may only delete the review they themselves wrote — attempting to
     * delete another customer's review returns `403`.
     *
     * **Authentication:** API key in `Authorization: Bearer` header **and** the
     * review author's customer JWT in the `x-auth-token` header (obtained from
     * `POST /v1/auth/login`).
     *
     * **Rate limit:** 300 requests/hour per API key.
     *
     * @returns any Review deleted
     * @throws ApiError
     */
    public deleteReview({
        id,
        xAuthToken,
    }: {
        /**
         * Review UUID.
         */
        id: string,
        /**
         * Customer JWT for the review's author, from `POST /v1/auth/login` or
         * `POST /v1/auth/verify-otp`.
         *
         */
        xAuthToken: string,
    }): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/reviews/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Mark a review as helpful
     * Increments the `helpful_count` on an approved review. Use this to surface
     * the most useful reviews in your storefront UI.
     *
     * Only approved reviews accept helpful votes. Pending or rejected reviews
     * return `404`.
     *
     * No deduplication is applied — if you need per-customer dedup, track it
     * client-side.
     *
     * **Rate limit:** 60 requests/hour per IP address.
     *
     * @returns any Helpful count incremented
     * @throws ApiError
     */
    public markReviewHelpful({
        id,
    }: {
        /**
         * Review UUID.
         */
        id: string,
    }): CancelablePromise<{
        /**
         * Updated helpful count.
         */
        helpful_count: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/reviews/{id}/helpful',
            path: {
                'id': id,
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
