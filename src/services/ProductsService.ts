/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProductsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List products with filtering and pagination
     * Retrieve a paginated list of products with support for filtering, search, and field selection.
     *
     * **Currency:** All prices returned in store's default currency. For multi-currency support with
     * geographic detection, use the `/v1/prices/products` endpoint instead.
     *
     * @returns any Successfully retrieved products with pagination metadata.
     *
     * **Response Structure:**
     * - `products`: Array of product objects (filtered by requested fields if specified)
     * - `total`: Total number of products matching the filter criteria
     * - `limit`: Number of products requested per page
     * - `offset`: Number of products skipped
     *
     * **Pagination Metadata:**
     * Use `total`, `limit`, and `offset` to calculate pagination:
     * - Current page: `Math.floor(offset / limit) + 1`
     * - Total pages: `Math.ceil(total / limit)`
     * - Has next page: `offset + limit < total`
     * - Has previous page: `offset > 0`
     *
     * **SDK Usage:**
     * ```typescript
     * const response = await client.products.listProducts({ limit: 20 });
     *
     * console.log(`Showing ${response.products.length} of ${response.total} products`);
     * console.log(`Page ${Math.floor(response.offset / response.limit) + 1} of ${Math.ceil(response.total / response.limit)}`);
     * ```
     *
     * @throws ApiError
     */
    public listProducts({
        search,
        categoryId,
        subcategoryId,
        limit = 50,
        offset,
        fields,
    }: {
        /**
         * Search products by name or SKU using case-insensitive partial matching.
         *
         * **Search Behavior:**
         * - Searches both product name and SKU fields
         * - Case-insensitive matching
         * - Partial matches supported (e.g., "iphone" matches "iPhone 15 Pro")
         *
         * **Examples:**
         * - `search=macbook` - Matches "MacBook Pro", "MacBook Air", "macbook-case"
         * - `search=APP-MBP` - Matches SKU "APP-MBP-13", "APP-MBP-14"
         * - `search=watch` - Matches "Apple Watch", "Smart Watch", "Watch Band"
         *
         * **SDK Usage:**
         * ```typescript
         * const results = await client.products.listProducts({
             * search: 'macbook',
             * fields: 'product_id,name,sku,price'
             * });
             * ```
             *
             */
            search?: string,
            /**
             * Filter products by category UUID. Use this to build category-specific product pages.
             *
             * **Validation:**
             * - Must be a valid UUID format
             * - Category must exist in your store
             *
             * **Use Cases:**
             * - Category navigation pages
             * - Category-specific product grids
             * - Filtered product listings
             *
             * **Combine with subcategory_id** for hierarchical filtering:
             * ```typescript
             * const laptops = await client.products.listProducts({
                 * category_id: '90ed1bf0-6c3f-4ad8-8b17-bf0b63bd3d45',
                 * subcategory_id: '86c9cb06-615c-4ca1-a863-32db101d1f58'
                 * });
                 * ```
                 *
                 * **Related:** Use `GET /v1/categories` to retrieve available categories.
                 *
                 */
                categoryId?: string,
                /**
                 * Filter products by subcategory UUID for more granular filtering.
                 *
                 * **Validation:**
                 * - Must be a valid UUID format
                 * - Subcategory must exist in your store
                 *
                 * **Hierarchical Filtering:**
                 * - Can be used alone or combined with category_id
                 * - When combined, both filters must match
                 *
                 * **Example:**
                 * ```typescript
                 * // Get all smart watches (subcategory)
                 * const smartWatches = await client.products.listProducts({
                     * subcategory_id: '86c9cb06-615c-4ca1-a863-32db101d1f58'
                     * });
                     * ```
                     *
                     * **Related:** Use `GET /v1/categories/{id}/subcategories` to retrieve subcategories for a category.
                     *
                     */
                    subcategoryId?: string,
                    /**
                     * Maximum number of products to return per page.
                     *
                     * **Validation:**
                     * - Minimum: 1
                     * - Maximum: 200
                     * - Default: 50
                     *
                     * **Pagination Strategy:**
                     * - Use with `offset` for cursor-based pagination
                     * - Smaller limits (10-20) for mobile apps
                     * - Larger limits (50-100) for desktop web
                     *
                     * **Performance Impact:**
                     * - Larger limits increase response size and serialization time
                     * - Field filtering recommended for limits >50
                     *
                     * **Examples:**
                     * - `limit=20` - Mobile app product grid (4x5)
                     * - `limit=24` - Desktop product grid (4x6)
                     * - `limit=100` - Bulk data sync
                     *
                     * **SDK Usage:**
                     * ```typescript
                     * const page1 = await client.products.listProducts({
                         * limit: 24,
                         * offset: 0
                         * });
                         *
                         * const page2 = await client.products.listProducts({
                             * limit: 24,
                             * offset: 24
                             * });
                             * ```
                             *
                             */
                            limit?: number,
                            /**
                             * Number of products to skip for pagination (zero-indexed).
                             *
                             * **Pagination Formula:**
                             * - Page 1: `offset=0`
                             * - Page 2: `offset=limit`
                             * - Page 3: `offset=limit*2`
                             * - Page N: `offset=limit*(N-1)`
                             *
                             * **Example Pagination:**
                             * ```typescript
                             * async function getPage(pageNumber: number, pageSize: number = 24) {
                                 * return await client.products.listProducts({
                                     * limit: pageSize,
                                     * offset: (pageNumber - 1) * pageSize
                                     * });
                                     * }
                                     *
                                     * const page1 = await getPage(1); // offset=0
                                     * const page2 = await getPage(2); // offset=24
                                     * const page3 = await getPage(3); // offset=48
                                     * ```
                                     *
                                     * **Total Pages Calculation:**
                                     * ```typescript
                                     * const response = await client.products.listProducts({ limit: 24 });
                                     * const totalPages = Math.ceil(response.total / 24);
                                     * ```
                                     *
                                     */
                                    offset?: number,
                                    /**
                                     * Comma-separated list of fields to include in the response. This is a powerful bandwidth optimization feature that can reduce response size by 50-90%.
                                     *
                                     * **Allowed Fields:**
                                     * - **Core:** `product_id`, `variant_id`, `name`, `sku`, `description`
                                     * - **Pricing:** `price`, `selling_price`, `online_price`, `online_sale_price`, `display_currency`, `currency_symbol`
                                     * - **Inventory:** `stock`, `threshold`, `last_restocked`
                                     * - **Media:** `images`, `online_images`
                                     * - **SEO:** `product_slug`, `seo_title`, `seo_description`, `seo_keywords`
                                     * - **Taxonomy:** `category_id`, `category_name`, `subcategory_id`, `subcategory_name`
                                     * - **Metadata:** `brand`, `featured`, `featured_order`, `tags`, `is_active`, `is_online_enabled`
                                     * - **Nested:** `attributes.*`, `shipping_info.*`
                                     * - **Timestamps:** `created_at`, `updated_at`
                                     *
                                     * **Bandwidth Savings:**
                                     * - Full product: ~2-5KB per product
                                     * - Filtered (name,price,stock): ~200-500 bytes per product
                                     * - **Reduction: 50-90% bandwidth savings**
                                     *
                                     * **Examples:**
                                     * - `fields=name,price,stock` - Minimal product card
                                     * - `fields=product_id,name,sku,price,category_name` - Product grid
                                     * - `fields=name,description,price,online_images,attributes.*` - Product detail page
                                     *
                                     * **Nested Fields:**
                                     * ```typescript
                                     * // Request nested attribute fields
                                     * const products = await client.products.listProducts({
                                         * fields: 'name,price,attributes.color,attributes.size'
                                         * });
                                         * ```
                                         *
                                         * **Validation:**
                                         * - Invalid field names return 400 error with helpful message
                                         * - Wildcard syntax (`attributes.*`) allows any nested field
                                         *
                                         * **Performance Impact:**
                                         * - Reduces JSON serialization time
                                         * - Reduces network transfer time
                                         * - Reduces client-side parsing time
                                         * - **Recommended for mobile apps and high-traffic endpoints**
                                         *
                                         */
                                        fields?: string,
                                    }): CancelablePromise<{
                                        products?: Array<Product>;
                                        /**
                                         * Total number of products matching the filter
                                         */
                                        total?: number;
                                        /**
                                         * Number of products per page
                                         */
                                        limit?: number;
                                        /**
                                         * Number of products skipped
                                         */
                                        offset?: number;
                                    }> {
                                        return this.httpRequest.request({
                                            method: 'GET',
                                            url: '/v1/products',
                                            query: {
                                                'search': search,
                                                'category_id': categoryId,
                                                'subcategory_id': subcategoryId,
                                                'limit': limit,
                                                'offset': offset,
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
                                     * Get product by ID or variant ID
                                     * Retrieve complete details for a single product using either its product ID or variant ID.
                                     *
                                     * **Currency:** Prices returned in store's default currency. For multi-currency support with
                                     * geographic detection, use the `/v1/prices/products/{id}` endpoint instead.
                                     *
                                     * @returns Product Successfully retrieved product with complete details.
                                     *
                                     * **Response Structure:**
                                     * Returns a single product object with all requested fields. If no fields parameter is specified, returns all available fields.
                                     *
                                     * **Field Descriptions:**
                                     * - `product_id`: Main product identifier (UUID)
                                     * - `variant_id`: Variant identifier (UUID)
                                     * - `name`: Product name
                                     * - `description`: Product description
                                     * - `sku`: Stock Keeping Unit
                                     * - `price`: Price in cents (e.g., 189999 = $1,899.99)
                                     * - `stock`: Available quantity
                                     * - `image`: Primary product image URL
                                     * - `brand`: Product brand name
                                     * - `category_name`: Category name
                                     * - `is_active`: Whether product is active
                                     *
                                     * **SDK Usage:**
                                     * ```typescript
                                     * const product = await client.products.getProduct(productId);
                                     *
                                     * console.log(`${product.name} - $${product.price / 100}`);
                                     * console.log(`In stock: ${product.stock > 0 ? 'Yes' : 'No'}`);
                                     * ```
                                     *
                                     * @throws ApiError
                                     */
                                    public getProduct({
                                        id = 'd8cea277-9bb6-4942-b9e9-2f2ac351509f',
                                        fields,
                                    }: {
                                        /**
                                         * Product ID or Variant ID. This endpoint accepts both types of IDs, providing flexible product retrieval.
                                         *
                                         * **Accepted ID Types:**
                                         * - **Product ID**: The main product identifier (e.g., `d8cea277-9bb6-4942-b9e9-2f2ac351509f`)
                                         * - **Variant ID**: A specific variant identifier (e.g., `cc35d16b-fca5-4faa-8699-d3d5d3521bca`)
                                         *
                                         * **Why This Matters:**
                                         * - Simplifies API usage - no need to know if you have a product or variant ID
                                         * - Useful for barcode scanning where you might have variant IDs
                                         * - Consistent behavior regardless of ID type
                                         *
                                         * **Validation:**
                                         * - Must be a valid UUID format
                                         * - Must exist in your store's product catalog
                                         * - Returns 404 if product/variant not found
                                         *
                                         * **SDK Usage:**
                                         * ```typescript
                                         * // Works with product ID
                                         * const product1 = await client.products.getProduct(
                                             * 'd8cea277-9bb6-4942-b9e9-2f2ac351509f'
                                             * );
                                             *
                                             * // Also works with variant ID
                                             * const product2 = await client.products.getProduct(
                                                 * 'cc35d16b-fca5-4faa-8699-d3d5d3521bca'
                                                 * );
                                                 * ```
                                                 *
                                                 */
                                                id?: string,
                                                /**
                                                 * Comma-separated list of fields to include in the response. Use this to reduce bandwidth by requesting only the fields you need.
                                                 *
                                                 * **Allowed Fields:** Same as `GET /v1/products` endpoint
                                                 * - Core: `product_id`, `variant_id`, `name`, `sku`, `description`
                                                 * - Pricing: `price`, `selling_price`, `online_price`, `online_sale_price`
                                                 * - Inventory: `stock`, `threshold`, `last_restocked`
                                                 * - Media: `images`, `online_images`
                                                 * - Metadata: `brand`, `category_name`, `subcategory_name`, `attributes.*`
                                                 *
                                                 * **Bandwidth Savings:**
                                                 * - Full product: ~2-5KB
                                                 * - Filtered (name,price,stock,sku): ~500 bytes-1KB
                                                 * - **Reduction: 50-80% bandwidth savings**
                                                 *
                                                 * **Examples:**
                                                 * - `fields=name,price,stock` - Minimal product info
                                                 * - `fields=product_id,name,description,price,online_images` - PDP essentials
                                                 * - `fields=name,sku,stock,price,category_name` - Cart display
                                                 *
                                                 * **SDK Usage:**
                                                 * ```typescript
                                                 * const product = await client.products.getProduct(productId, {
                                                     * fields: 'name,price,stock,sku'
                                                     * });
                                                     * ```
                                                     *
                                                     */
                                                    fields?: string,
                                                }): CancelablePromise<Product> {
                                                    return this.httpRequest.request({
                                                        method: 'GET',
                                                        url: '/v1/products/{id}',
                                                        path: {
                                                            'id': id,
                                                        },
                                                        query: {
                                                            'fields': fields,
                                                        },
                                                        errors: {
                                                            400: `Invalid request - malformed data or missing required fields`,
                                                            401: `Authentication failed - invalid or missing API key`,
                                                            404: `Product or variant not found for the given ID.
                                                             **Common Causes:**
                                                            - Invalid product/variant ID
                                                            - Product belongs to a different store
                                                            - Product has been deleted
                                                             **SDK Error Handling:**
                                                            \`\`\`typescript
                                                            try {
                                                                const product = await client.products.getProduct(productId);
                                                            } catch (error) {
                                                                if (error.status === 404) {
                                                                    console.error('Product not found');
                                                                    // Redirect to product listing or show error message
                                                                }
                                                            }
                                                            \`\`\`
                                                            `,
                                                            429: `Rate limit exceeded`,
                                                            500: `Internal server error`,
                                                        },
                                                    });
                                                }
                                                /**
                                                 * Get product by SEO-friendly slug
                                                 * Retrieve product information using a human-readable, SEO-friendly slug.
                                                 *
                                                 * **Currency:** Prices returned in store's default currency. For multi-currency support with
                                                 * geographic detection, use the `/v1/prices/products/{id}` endpoint instead.
                                                 *
                                                 * @returns Product Successfully retrieved product by slug with complete details including SEO metadata.
                                                 *
                                                 * **Response Structure:**
                                                 * Returns a single product object with all requested fields. This endpoint includes additional SEO-specific fields not always present in other endpoints:
                                                 * - `product_slug`: The SEO-friendly slug used in the request
                                                 * - `seo_title`: Optimized title for search engines
                                                 * - `seo_description`: Optimized description for search engines
                                                 * - `seo_keywords`: Keywords for SEO (optional)
                                                 * - `online_product_id`: Online store product identifier
                                                 * - `online_name`: Display name for online store
                                                 * - `online_description`: Description for online store
                                                 * - `online_images`: Array of image URLs for online display
                                                 * - `featured`: Whether product is featured
                                                 * - `featured_order`: Display order for featured products
                                                 *
                                                 * **SDK Usage:**
                                                 * ```typescript
                                                 * const product = await client.products.getProductBySlug(slug);
                                                 *
                                                 * // Use SEO fields for page metadata
                                                 * document.title = product.seo_title || product.name;
                                                 * document.querySelector('meta[name="description"]').content =
                                                 * product.seo_description || product.description;
                                                 * ```
                                                 *
                                                 * @throws ApiError
                                                 */
                                                public getProductBySlug({
                                                    slug = 'apple-macbook-pro-d8cea',
                                                    fields,
                                                }: {
                                                    /**
                                                     * SEO-friendly product slug in the format `{product-name}-{short-id}`.
                                                     *
                                                     * **Slug Format:**
                                                     * - Lowercase product name with hyphens
                                                     * - Short unique identifier appended
                                                     * - Example: `apple-macbook-pro-d8cea`
                                                     *
                                                     * **Where to Get Slugs:**
                                                     * - From `product_slug` field in product list responses
                                                     * - From product URLs in your e-commerce site
                                                     * - Generated automatically when products are created
                                                     *
                                                     * **Validation:**
                                                     * - Must match an existing product slug
                                                     * - Case-sensitive (use lowercase)
                                                     * - Returns 404 if slug not found
                                                     *
                                                     * **SDK Usage:**
                                                     * ```typescript
                                                     * // Use slug from product listing
                                                     * const products = await client.products.listProducts({ limit: 10 });
                                                     * const firstProductSlug = products.products[0].product_slug;
                                                     *
                                                     * // Get full product details by slug
                                                     * const product = await client.products.getProductBySlug(firstProductSlug);
                                                     * ```
                                                     *
                                                     * **SEO Benefits:**
                                                     * - Readable URLs: `/products/apple-macbook-pro-d8cea` vs `/products/d8cea277-9bb6-4942-b9e9-2f2ac351509f`
                                                     * - Better click-through rates in search results
                                                     * - Improved social media sharing
                                                     * - Enhanced user trust and memorability
                                                     *
                                                     */
                                                    slug?: string,
                                                    /**
                                                     * Comma-separated list of fields to include in the response. Use this to reduce bandwidth by requesting only the fields you need.
                                                     *
                                                     * **Recommended Fields for PDPs:**
                                                     * - SEO: `seo_title`, `seo_description`, `seo_keywords`, `product_slug`
                                                     * - Core: `product_id`, `name`, `description`
                                                     * - Pricing: `price`, `online_price`, `online_sale_price`
                                                     * - Media: `online_images`, `images`
                                                     * - Metadata: `brand`, `category_name`, `attributes`, `tags`
                                                     * - Inventory: `stock`, `is_online_enabled`
                                                     *
                                                     * **Example:**
                                                     * ```typescript
                                                     * const product = await client.products.getProductBySlug(slug, {
                                                         * fields: 'product_id,name,description,price,online_images,seo_title,seo_description,stock,brand'
                                                         * });
                                                         * ```
                                                         *
                                                         */
                                                        fields?: string,
                                                    }): CancelablePromise<Product> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/products/by-slug/{slug}',
                                                            path: {
                                                                'slug': slug,
                                                            },
                                                            query: {
                                                                'fields': fields,
                                                            },
                                                            errors: {
                                                                400: `Invalid request - malformed data or missing required fields`,
                                                                401: `Authentication failed - invalid or missing API key`,
                                                                404: `Product not found for the given slug.
                                                                 **Common Causes:**
                                                                - Invalid or non-existent slug
                                                                - Product belongs to a different store
                                                                - Product has been deleted or deactivated
                                                                - Slug format is incorrect (check for typos)
                                                                 **SDK Error Handling:**
                                                                \`\`\`typescript
                                                                try {
                                                                    const product = await client.products.getProductBySlug(slug);
                                                                } catch (error) {
                                                                    if (error.status === 404) {
                                                                        console.error('Product not found for slug:', slug);
                                                                        // Redirect to product listing or 404 page
                                                                        window.location.href = '/products';
                                                                    }
                                                                }
                                                                \`\`\`
                                                                 **Debugging Tips:**
                                                                - Verify slug format matches \`{name}-{short-id}\` pattern
                                                                - Check that slug is lowercase
                                                                - Ensure product exists in your store
                                                                - Try listing products to see available slugs
                                                                `,
                                                                429: `Rate limit exceeded`,
                                                                500: `Internal server error`,
                                                            },
                                                        });
                                                    }
                                                    /**
                                                     * Get product specifications
                                                     * Retrieves the latest specification version for a specific product
                                                     * @returns any Successfully retrieved product specification
                                                     * @throws ApiError
                                                     */
                                                    public getProductSpecifications({
                                                        id,
                                                    }: {
                                                        /**
                                                         * Product UUID
                                                         */
                                                        id: string,
                                                    }): CancelablePromise<{
                                                        id?: string;
                                                        product_id?: string;
                                                        template_id?: string;
                                                        specification_data?: Record<string, any>;
                                                        status?: string;
                                                        version?: number;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                    }> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/products/{id}/specifications',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            errors: {
                                                                400: `Invalid request - malformed data or missing required fields`,
                                                                401: `Authentication failed - invalid or missing API key`,
                                                                404: `No specifications found for this product`,
                                                                429: `Rate limit exceeded`,
                                                                500: `Internal server error`,
                                                            },
                                                        });
                                                    }
                                                    /**
                                                     * List product specifications
                                                     * @returns any Success
                                                     * @throws ApiError
                                                     */
                                                    public listProductSpecifications({
                                                        productId,
                                                        status,
                                                        limit = 50,
                                                        offset,
                                                    }: {
                                                        productId?: string,
                                                        status?: string,
                                                        limit?: number,
                                                        offset?: number,
                                                    }): CancelablePromise<{
                                                        specifications?: Array<Record<string, any>>;
                                                    }> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/product-specifications',
                                                            query: {
                                                                'product_id': productId,
                                                                'status': status,
                                                                'limit': limit,
                                                                'offset': offset,
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
                                                     * List product collections
                                                     * @returns any Success
                                                     * @throws ApiError
                                                     */
                                                    public listProductCollections({
                                                        type,
                                                        showOnHomepage,
                                                        limit = 50,
                                                        offset,
                                                    }: {
                                                        type?: string,
                                                        /**
                                                         * Filter by homepage visibility (accepts string 'true' or 'false')
                                                         */
                                                        showOnHomepage?: 'true' | 'false',
                                                        limit?: number,
                                                        offset?: number,
                                                    }): CancelablePromise<{
                                                        collections?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            slug?: string;
                                                            description?: string;
                                                        }>;
                                                    }> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/product-collections',
                                                            query: {
                                                                'type': type,
                                                                'show_on_homepage': showOnHomepage,
                                                                'limit': limit,
                                                                'offset': offset,
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
                                                     * Get product collection by ID
                                                     * @returns any Success
                                                     * @throws ApiError
                                                     */
                                                    public getProductCollection({
                                                        id,
                                                    }: {
                                                        id: string,
                                                    }): CancelablePromise<{
                                                        id?: string;
                                                        name?: string;
                                                        slug?: string;
                                                        description?: string;
                                                    }> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/product-collections/{id}',
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
                                                    /**
                                                     * Get items in a product collection
                                                     * @returns any Success
                                                     * @throws ApiError
                                                     */
                                                    public getProductCollectionItems({
                                                        id,
                                                        limit = 50,
                                                        offset,
                                                    }: {
                                                        id: string,
                                                        limit?: number,
                                                        offset?: number,
                                                    }): CancelablePromise<{
                                                        items?: Array<Product>;
                                                    }> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/product-collections/{id}/items',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            query: {
                                                                'limit': limit,
                                                                'offset': offset,
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
