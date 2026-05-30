/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItem } from '../models/CartItem';
import type { WishlistItem } from '../models/WishlistItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CartWishlistService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get cart
     * Retrieve cart contents for customer or session.
     *
     * **Cart Association:**
     * - Provide `X-Session-Id` header for anonymous carts (before customer login)
     * - Provide `customer_id` query parameter for authenticated customer carts
     * - If both provided, `customer_id` takes precedence
     * - If neither provided, returns 400 error
     *
     * **Anonymous Cart Flow:**
     * ```
     * GET /v1/cart
     * Authorization: Bearer tybrite_pk_live_YOUR_API_KEY
     * X-Session-Id: session-abc123-xyz789
     * ```
     *
     * **Authenticated Cart Flow:**
     * ```
     * GET /v1/cart?customer_id=550e8400-e29b-41d4-a716-446655440000
     * Authorization: Bearer tybrite_pk_live_YOUR_API_KEY
     * ```
     *
     * @returns any Success
     * @throws ApiError
     */
    public getCart({
        xAuthToken,
        customerId,
        xSessionId,
    }: {
        /**
         * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. Required whenever `customer_id` is supplied so the gateway can prove the caller owns that customer record. Anonymous (session-only) carts may omit it.
         */
        xAuthToken?: string,
        /**
         * Customer UUID for authenticated carts
         */
        customerId?: string,
        /**
         * Session ID for anonymous carts (UUID or random string stored in localStorage)
         */
        xSessionId?: string,
    }): CancelablePromise<{
        items?: Array<CartItem>;
        total_items?: number;
        subtotal?: number;
        session_id?: string;
        customer_id?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/cart',
            headers: {
                'x-auth-token': xAuthToken,
                'X-Session-Id': xSessionId,
            },
            query: {
                'customer_id': customerId,
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
     * Clear cart
     * Clear all items from a cart for the given customer or session.
     *
     * **Cart Association:**
     * - Provide `X-Session-Id` header for anonymous carts
     * - Provide `customer_id` query parameter for authenticated customer carts
     * - If neither provided, returns 400 error
     *
     * @returns any Cart cleared
     * @throws ApiError
     */
    public clearCart({
        xAuthToken,
        customerId,
        xSessionId,
    }: {
        /**
         * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. Required whenever `customer_id` is supplied so the gateway can prove the caller owns that customer record. Anonymous (session-only) carts may omit it.
         */
        xAuthToken?: string,
        /**
         * Customer UUID for authenticated carts (optional if using X-Session-Id)
         */
        customerId?: string,
        /**
         * Session ID for anonymous carts (optional if customer_id is provided)
         */
        xSessionId?: string,
    }): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/cart',
            headers: {
                'x-auth-token': xAuthToken,
                'X-Session-Id': xSessionId,
            },
            query: {
                'customer_id': customerId,
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
     * Add to cart
     * Add item to cart with automatic stock checking. If the same variant
     * already exists in the cart, the quantity is incremented.
     *
     * **Variant Selection:**
     * - `variant_id` is required to specify which variant to add (e.g., Black vs Blue color)
     * - For simple products (no variants), use the default variant's ID
     * - Stock validation is performed against the specific variant
     *
     * **Cart Association:**
     * - Provide `X-Session-Id` header for anonymous carts (before customer login)
     * - Provide `customer_id` in request body for authenticated customer carts
     * - If both provided, `customer_id` takes precedence
     * - If neither provided, returns 400 error
     *
     * **Key Type Support:**
     * - Publishable keys (`tybrite_pk_*`) — fully supported (browser/storefront)
     * - Secret keys (`tybrite_sk_*`) — also supported (server-side)
     *
     * **Anonymous Cart Example:**
     * ```
     * POST /v1/cart/items
     * Authorization: Bearer tybrite_pk_live_YOUR_API_KEY
     * X-Session-Id: session-abc123-xyz789
     * Content-Type: application/json
     *
     * {
         * "variant_id": "83b6a47e-4f5c-4090-b8d3-4b606b78f1b4",
         * "quantity": 2
         * }
         * ```
         *
         * **Authenticated Cart Example:**
         * ```
         * POST /v1/cart/items
         * Authorization: Bearer tybrite_pk_live_YOUR_API_KEY
         * Content-Type: application/json
         *
         * {
             * "variant_id": "83b6a47e-4f5c-4090-b8d3-4b606b78f1b4",
             * "quantity": 2,
             * "customer_id": "650e8400-e29b-41d4-a716-446655440000"
             * }
             * ```
             *
             * @returns any Item added (returns refreshed cart)
             * @throws ApiError
             */
            public addToCart({
                requestBody,
                xAuthToken,
                xSessionId,
            }: {
                requestBody: {
                    /**
                     * Specific product variant UUID (required for multi-variant products)
                     */
                    variant_id: string;
                    /**
                     * Quantity to add
                     */
                    quantity: number;
                    /**
                     * Customer UUID for authenticated carts (optional if using X-Session-Id)
                     */
                    customer_id?: string;
                },
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. Required whenever `customer_id` is supplied so the gateway can prove the caller owns that customer record. Anonymous (session-only) carts may omit it.
                 */
                xAuthToken?: string,
                /**
                 * Session ID for anonymous carts (UUID or random string stored in localStorage). Optional if `customer_id` is provided in the body.
                 */
                xSessionId?: string,
            }): CancelablePromise<{
                items?: Array<CartItem>;
                total_items?: number;
                subtotal?: number;
                session_id?: string | null;
                customer_id?: string | null;
            }> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/v1/cart/items',
                    headers: {
                        'x-auth-token': xAuthToken,
                        'X-Session-Id': xSessionId,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                    errors: {
                        400: `Invalid request or insufficient stock`,
                        401: `Authentication failed - invalid or missing API key`,
                        403: `Insufficient permissions - operation requires secret key`,
                        404: `Variant not found or not available`,
                        429: `Rate limit exceeded`,
                        500: `Internal server error`,
                    },
                });
            }
            /**
             * Update cart item
             * Update the quantity of an existing cart item. Setting `quantity` to `0`
             * removes the item from the cart. Ownership is verified against either
             * `customer_id` (when provided) or the `X-Session-Id` header.
             *
             * @returns any Item updated (returns refreshed cart)
             * @throws ApiError
             */
            public updateCartItem({
                id,
                requestBody,
                xAuthToken,
                xSessionId,
            }: {
                /**
                 * Cart item UUID
                 */
                id: string,
                requestBody: {
                    /**
                     * New quantity. Use `0` to remove the item from the cart.
                     */
                    quantity: number;
                    /**
                     * Customer UUID used to verify ownership of the cart item.
                     */
                    customer_id?: string;
                },
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. Required whenever `customer_id` is supplied so the gateway can prove the caller owns that customer record. Anonymous (session-only) carts may omit it.
                 */
                xAuthToken?: string,
                /**
                 * Session ID for anonymous carts. Required for ownership verification when `customer_id` is not provided.
                 */
                xSessionId?: string,
            }): CancelablePromise<{
                items?: Array<CartItem>;
                total_items?: number;
                subtotal?: number;
                session_id?: string | null;
                customer_id?: string | null;
            }> {
                return this.httpRequest.request({
                    method: 'PATCH',
                    url: '/v1/cart/items/{id}',
                    path: {
                        'id': id,
                    },
                    headers: {
                        'x-auth-token': xAuthToken,
                        'X-Session-Id': xSessionId,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
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
             * Remove cart item
             * Remove a specific item from the cart by its cart item ID.
             *
             * **Key Type Support:**
             * - Publishable keys (`tybrite_pk_*`) — fully supported (browser/storefront)
             * - Secret keys (`tybrite_sk_*`) — also supported (server-side)
             *
             * @returns any Item removed successfully
             * @throws ApiError
             */
            public removeCartItem({
                id,
                xAuthToken,
            }: {
                /**
                 * Cart item UUID
                 */
                id: string,
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. Required whenever `customer_id` is supplied so the gateway can prove the caller owns that customer record. Anonymous (session-only) carts may omit it.
                 */
                xAuthToken?: string,
            }): CancelablePromise<{
                success?: boolean;
                message?: string;
            }> {
                return this.httpRequest.request({
                    method: 'DELETE',
                    url: '/v1/cart/items/{id}',
                    path: {
                        'id': id,
                    },
                    headers: {
                        'x-auth-token': xAuthToken,
                    },
                    errors: {
                        401: `Authentication failed - invalid or missing API key`,
                        403: `Insufficient permissions - operation requires secret key`,
                        429: `Rate limit exceeded`,
                        500: `Internal server error`,
                    },
                });
            }
            /**
             * Merge carts
             * Merge an anonymous session cart into a customer cart after login.
             *
             * For each item in the session cart, the worker either increments the
             * quantity of a matching `(product_id, variant_id)` row in the customer
             * cart (and deletes the session row) or re-assigns the session row to
             * the customer. The refreshed merged cart is returned.
             *
             * @returns any Carts merged (returns refreshed cart)
             * @throws ApiError
             */
            public mergeCart({
                xAuthToken,
                requestBody,
            }: {
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. The resolved customer must match the `customer_id` in the request.
                 */
                xAuthToken: string,
                requestBody: {
                    /**
                     * Anonymous session ID whose cart should be merged
                     */
                    session_id: string;
                    /**
                     * Customer UUID that will own the merged cart
                     */
                    customer_id: string;
                },
            }): CancelablePromise<{
                items?: Array<CartItem>;
                total_items?: number;
                subtotal?: number;
                session_id?: string | null;
                customer_id?: string | null;
            }> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/v1/cart/merge',
                    headers: {
                        'x-auth-token': xAuthToken,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
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
             * Get wishlist
             * Retrieve a customer's wishlist. Wishlists are always customer-scoped,
             * so `customer_id` is required (anonymous wishlists are not supported).
             *
             * @returns any Success
             * @throws ApiError
             */
            public getWishlist({
                xAuthToken,
                customerId,
            }: {
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. The resolved customer must match the `customer_id` in the request.
                 */
                xAuthToken: string,
                /**
                 * Customer UUID. Required — returns 400 if missing.
                 */
                customerId: string,
            }): CancelablePromise<{
                items?: Array<WishlistItem>;
                total_items?: number;
                customer_id?: string;
            }> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/v1/wishlist',
                    headers: {
                        'x-auth-token': xAuthToken,
                    },
                    query: {
                        'customer_id': customerId,
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
             * Add to wishlist
             * Add a variant to a customer's wishlist. Returns `201 Created` on success.
             * If the same `(customer_id, product_id, variant_id)` already exists,
             * returns `409 Conflict` instead of duplicating the entry.
             *
             * @returns any Item added (returns refreshed wishlist)
             * @throws ApiError
             */
            public addToWishlist({
                xAuthToken,
                requestBody,
            }: {
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. The resolved customer must match the `customer_id` in the request.
                 */
                xAuthToken: string,
                requestBody: {
                    /**
                     * Specific product variant UUID
                     */
                    variant_id: string;
                    /**
                     * Customer UUID
                     */
                    customer_id: string;
                },
            }): CancelablePromise<{
                items?: Array<WishlistItem>;
                total_items?: number;
                customer_id?: string;
            }> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/v1/wishlist',
                    headers: {
                        'x-auth-token': xAuthToken,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                    errors: {
                        400: `Invalid request - malformed data or missing required fields`,
                        401: `Authentication failed - invalid or missing API key`,
                        403: `Insufficient permissions - operation requires secret key`,
                        404: `Variant not found`,
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
             * Remove from wishlist
             * Remove a wishlist item by ID. The item is scoped to the supplied
             * `customer_id`, which is required.
             *
             * @returns any Item removed
             * @throws ApiError
             */
            public removeFromWishlist({
                xAuthToken,
                id,
                customerId,
            }: {
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. The resolved customer must match the `customer_id` in the request.
                 */
                xAuthToken: string,
                /**
                 * Wishlist item UUID
                 */
                id: string,
                /**
                 * Customer UUID that owns the wishlist item. Required — returns 400 if missing.
                 */
                customerId: string,
            }): CancelablePromise<{
                success?: boolean;
                message?: string;
            }> {
                return this.httpRequest.request({
                    method: 'DELETE',
                    url: '/v1/wishlist/{id}',
                    path: {
                        'id': id,
                    },
                    headers: {
                        'x-auth-token': xAuthToken,
                    },
                    query: {
                        'customer_id': customerId,
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
             * Move wishlist item to cart
             * Atomically move a wishlist item into the customer's cart. The variant's
             * stock is validated; on success the item is added to (or merged with) the
             * cart and removed from the wishlist. Returns the refreshed cart.
             *
             * @returns any Item moved to cart (returns refreshed cart with metadata)
             * @throws ApiError
             */
            public moveWishlistToCart({
                xAuthToken,
                requestBody,
                xSessionId,
            }: {
                /**
                 * Customer session access_token from /v1/auth/login or /v1/auth/verify-otp. The resolved customer must match the `customer_id` in the request.
                 */
                xAuthToken: string,
                requestBody: {
                    /**
                     * Wishlist item UUID to move
                     */
                    wishlist_item_id: string;
                    /**
                     * Customer UUID that owns the wishlist item and target cart
                     */
                    customer_id: string;
                    /**
                     * Quantity to add to the cart (defaults to 1)
                     */
                    quantity?: number;
                },
                /**
                 * Optional session ID used to associate the resulting cart row when the customer does not already have one.
                 */
                xSessionId?: string,
            }): CancelablePromise<{
                success?: boolean;
                message?: string;
                removed_wishlist_item_id?: string;
                items?: Array<CartItem>;
                total_items?: number;
                subtotal?: number;
                session_id?: string | null;
                customer_id?: string | null;
            }> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/v1/wishlist/move-to-cart',
                    headers: {
                        'x-auth-token': xAuthToken,
                        'X-Session-Id': xSessionId,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                    errors: {
                        400: `Invalid request or insufficient stock`,
                        401: `Authentication failed - invalid or missing API key`,
                        403: `Insufficient permissions - operation requires secret key`,
                        404: `Wishlist item or variant not found`,
                        429: `Rate limit exceeded`,
                        500: `Internal server error`,
                    },
                });
            }
        }
