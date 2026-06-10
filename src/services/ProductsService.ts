/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { ProductCollection } from '../models/ProductCollection';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProductsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List products with filtering and pagination
     * Retrieve a paginated list of products with support for filtering, search, and field selection.
     *
     * **Response Structure:**
     * Returns flat structure with default variant data only (no variants array). This keeps payloads
     * small for fast catalog browsing. Use the `has_variants` flag to determine if a detail fetch
     * is needed to show variant options.
     *
     * **Currency:** All prices returned in store's default currency. For multi-currency support with
     * geographic detection, use the `/v1/prices/products` endpoint instead.
     *
     * **Marketplace:** When called with a marketplace operator key, this returns products aggregated
     * across all merchants in the marketplace rather than a single store's catalog. With a marketplace
     * operator key, pass `?store_id=<merchant>` to narrow results to a single merchant.
     *
     * **Performance:**
     * - Default variant data included at root level (price, stock, sku)
     * - No variants array (50-70% smaller than detail endpoints)
     * - Perfect for product listing pages and search results
     *
     *
     * @returns any Successfully retrieved products with pagination metadata.
     *
     * **Response Structure:**
     * - `products`: Array of product objects (filtered by requested fields if specified)
     * - `pagination`: Pagination metadata with cursor information
     *
     * **Pagination Metadata:**
     * - `limit`: Number of products requested per page
     * - `next_cursor`: Cursor for the next page (null if no more pages)
     * - `has_more`: Boolean indicating if more products are available
     *
     * **SDK Usage:**
     * ```typescript
     * const response = await client.products.listProducts({ limit: 20 });
     *
     * console.log(`Showing ${response.products.length} products`);
     *
     * if (response.pagination.has_more) {
         * const nextPage = await client.products.listProducts({
             * limit: 20,
             * cursor: response.pagination.next_cursor
             * });
             * }
             * ```
             *
             * @throws ApiError
             */
            public listProducts({
                search,
                categoryId,
                subcategoryId,
                limit = 50,
                cursor,
                fields,
                storeId,
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
                             * - Use with `cursor` for cursor-based pagination
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
                                 * limit: 24
                                 * });
                                 *
                                 * // Use next_cursor from response for next page
                                 * const page2 = await client.products.listProducts({
                                     * limit: 24,
                                     * cursor: page1.pagination.next_cursor
                                     * });
                                     * ```
                                     *
                                     */
                                    limit?: number,
                                    /**
                                     * Cursor for pagination. Use the `next_cursor` value from the previous response to fetch the next page.
                                     *
                                     * **Cursor-Based Pagination:**
                                     * - Consistent results even when data changes between requests
                                     * - Ideal for infinite scroll and real-time data
                                     *
                                     * **Example Pagination:**
                                     * ```typescript
                                     * // First page
                                     * const page1 = await client.products.listProducts({ limit: 24 });
                                     *
                                     * // Next page using cursor
                                     * if (page1.pagination.has_more) {
                                         * const page2 = await client.products.listProducts({
                                             * limit: 24,
                                             * cursor: page1.pagination.next_cursor
                                             * });
                                             * }
                                             *
                                             * // Infinite scroll pattern
                                             * let cursor = null;
                                             * const allProducts = [];
                                             *
                                             * do {
                                                 * const response = await client.products.listProducts({
                                                     * limit: 50,
                                                     * cursor
                                                     * });
                                                     * allProducts.push(...response.products);
                                                     * cursor = response.pagination.next_cursor;
                                                     * } while (cursor);
                                                     * ```
                                                     *
                                                     * **Cursor Format:**
                                                     * - Base64-encoded string
                                                     * - Opaque to clients (do not parse or modify)
                                                     * - Valid only for the current query parameters
                                                     *
                                                     */
                                                    cursor?: string,
                                                    /**
                                                     * Comma-separated list of fields to include in the response. This is a powerful bandwidth optimization feature that can reduce response size by 50-90%.
                                                     *
                                                     * **Allowed Fields:**
                                                     * - **Core:** `product_id`, `variant_id`, `name`, `sku`, `description`
                                                     * - **Pricing:** `price`, `selling_price`, `sale_price`, `display_currency`, `currency_symbol`
                                                     * - **Inventory:** `stock`, `threshold`, `last_restocked`
                                                     * - **Media:** `media`, `thumbnail_url`
                                                     * - **SEO:** `product_slug`, `seo_title`, `seo_description`, `seo_keywords`
                                                     * - **Taxonomy:** `category_id`, `category_name`, `subcategory_id`, `subcategory_name`
                                                     * - **Metadata:** `brand`, `featured`, `featured_order`, `tags`, `is_active`
                                                     * - **Nested:** `attributes.*`, `shipping_info.*`, `variant_attributes.*`
                                                     * - **Timestamps:** `created_at`, `updated_at`
                                                     * - **Flags:** `has_variants`, `is_default`
                                                     *
                                                     * **Bandwidth Savings:**
                                                     * - Full product: ~2-5KB per product
                                                     * - Filtered (name,price,stock): ~200-500 bytes per product
                                                     * - **Reduction: 50-90% bandwidth savings**
                                                     *
                                                     * **Examples:**
                                                     * - `fields=name,price,stock` - Minimal product card
                                                     * - `fields=product_id,name,sku,price,category_name` - Product grid
                                                     * - `fields=name,description,price,media,attributes.*` - Product detail page
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
                                                        /**
                                                         * Marketplace operator key only. Narrow the aggregated marketplace catalog to a single
                                                         * merchant's products — the "shop page" for one merchant. Ignored when using a single-store key.
                                                         *
                                                         */
                                                        storeId?: string,
                                                    }): CancelablePromise<{
                                                        products?: Array<Product>;
                                                        pagination?: {
                                                            /**
                                                             * Number of products per page
                                                             */
                                                            limit?: number;
                                                            /**
                                                             * Cursor for the next page (null if no more pages)
                                                             */
                                                            next_cursor?: string | null;
                                                            /**
                                                             * Whether more products are available
                                                             */
                                                            has_more?: boolean;
                                                        };
                                                    }> {
                                                        return this.httpRequest.request({
                                                            method: 'GET',
                                                            url: '/v1/products',
                                                            query: {
                                                                'search': search,
                                                                'category_id': categoryId,
                                                                'subcategory_id': subcategoryId,
                                                                'limit': limit,
                                                                'cursor': cursor,
                                                                'fields': fields,
                                                                'store_id': storeId,
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
                                                     * **Response Structure:**
                                                     * - **Simple products (no variants):** Flat structure with all data at root level
                                                     * - **Multi-variant products:** Hierarchical structure with:
                                                     * - Product-level data at root (name, description, brand, media, etc.)
                                                     * - Aggregate data (total_stock, price_range using selling_price)
                                                     * - Clean variants array with only variant-specific fields (no redundancy)
                                                     *
                                                     * **Field Filtering:**
                                                     * Supports both root-level and nested variant filtering:
                                                     * - Root filtering: ~ 38% bandwidth reduction
                                                     * - Nested filtering: ~ 52% bandwidth reduction
                                                     * - Example: `fields=name,price_range,variants.sku,variants.selling_price,variants.stock`
                                                     *
                                                     * **Currency:** Prices returned in store's default currency. For multi-currency support with
                                                     * geographic detection, use the `/v1/prices/products/{id}` endpoint instead.
                                                     *
                                                     *
                                                     * @returns Product Successfully retrieved product with complete details.
                                                     *
                                                     * **Response Structure:**
                                                     *
                                                     * **For Simple Products (has_variants=false):**
                                                     * Returns flat structure with all data at root level:
                                                     * - All product fields (name, description, brand, media, etc.)
                                                     * - All variant fields (variant_id, sku, price, stock, etc.)
                                                     * - No variants array
                                                     *
                                                     * **For Multi-Variant Products (has_variants=true):**
                                                     * Returns hierarchical structure:
                                                     * - Product-level fields at root (name, description, brand, media, etc.)
                                                     * - Aggregate data: total_stock, price_range (using selling_price)
                                                     * - Flags: has_variants=true, variant_count
                                                     * - Clean variants array with only variant-specific fields:
                                                     * - variant_id, sku, price, sale_price, selling_price
                                                     * - stock, threshold, last_restocked
                                                     * - variant_attributes (color, size, etc.)
                                                     * - variant_name, is_default
                                                     *
                                                     * **Field Filtering:**
                                                     * - Root-level: Exclude unnecessary fields (~ 38% reduction)
                                                     * - Nested: Filter variant fields using dot notation (~ 52% reduction)
                                                     * - Example: `fields=name,price_range,variants.sku,variants.selling_price,variants.stock`
                                                     *
                                                     * **SDK Usage:**
                                                     * ```typescript
                                                     * const product = await client.products.getProduct(productId);
                                                     *
                                                     * if (product.has_variants) {
                                                         * console.log(`Price range: ${product.price_range.min} - ${product.price_range.max}`);
                                                         * console.log(`Total stock: ${product.total_stock}`);
                                                         * console.log(`Variants: ${product.variants.length}`);
                                                         * } else {
                                                             * console.log(`Price: ${product.selling_price}`);
                                                             * console.log(`Stock: ${product.stock}`);
                                                             * }
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
                                                                         * Comma-separated list of fields to include in the response. Supports both root-level and nested variant filtering for maximum bandwidth optimization.
                                                                         *
                                                                         * **Root-Level Fields:**
                                                                         * - **Core:** `product_id`, `variant_id`, `name`, `sku`, `description`
                                                                         * - **Pricing:** `price`, `selling_price`, `sale_price`, `price_range`, `display_currency`, `currency_symbol`
                                                                         * - **Inventory:** `stock`, `total_stock`, `threshold`, `last_restocked`
                                                                         * - **Media:** `media`, `thumbnail_url`
                                                                         * - **Metadata:** `brand`, `category_name`, `subcategory_name`, `attributes.*`
                                                                         * - **Flags:** `has_variants`, `variant_count`, `is_default`
                                                                         * - **Variants:** `variants` (includes all variant fields)
                                                                         *
                                                                         * **Nested Variant Filtering (52% bandwidth reduction):**
                                                                         * Use dot notation to filter specific fields within the variants array:
                                                                         * - `variants.variant_id` - Variant identifier
                                                                         * - `variants.sku` - Variant SKU
                                                                         * - `variants.selling_price` - Customer-facing price
                                                                         * - `variants.stock` - Stock quantity
                                                                         * - `variants.variant_attributes` - Variant attributes (color, size, etc.)
                                                                         * - `variants.variant_name` - Variant display name
                                                                         * - `variants.is_default` - Default variant flag
                                                                         * - `variants.*` - All variant fields (same as just `variants`)
                                                                         *
                                                                         * **Bandwidth Savings:**
                                                                         * - Full product: ~1720 bytes (baseline)
                                                                         * - Root filtering: ~1060 bytes (~ 38% reduction)
                                                                         * - Nested filtering: ~830 bytes (~ 52% reduction)
                                                                         *
                                                                         * **Examples:**
                                                                         *
                                                                         * Root-level filtering (~ 38% reduction):
                                                                         * ```
                                                                         * fields=product_id,name,brand,total_stock,price_range,variants
                                                                         * ```
                                                                         *
                                                                         * Nested variant filtering (~ 52% reduction):
                                                                         * ```
                                                                         * fields=product_id,name,brand,total_stock,price_range,
                                                                         * variants.variant_id,variants.sku,variants.selling_price,
                                                                         * variants.stock,variants.variant_attributes
                                                                         * ```
                                                                         *
                                                                         * Minimal cart validation:
                                                                         * ```
                                                                         * fields=product_id,total_stock,variants.variant_id,variants.stock
                                                                         * ```
                                                                         *
                                                                         * **SDK Usage:**
                                                                         * ```typescript
                                                                         * // Root-level filtering
                                                                         * const product = await client.products.getProduct(productId, {
                                                                             * fields: 'name,price_range,total_stock,variants'
                                                                             * });
                                                                             *
                                                                             * // Nested variant filtering (maximum optimization)
                                                                             * const product = await client.products.getProduct(productId, {
                                                                                 * fields: 'name,brand,price_range,variants.sku,variants.selling_price,variants.stock'
                                                                                 * });
                                                                                 * ```
                                                                                 *
                                                                                 * **Performance Impact:**
                                                                                 * - Nested filtering excludes internal fields (threshold, last_restocked)
                                                                                 * - Perfect for mobile apps and bandwidth-constrained environments
                                                                                 * - Recommended for product cards and listing pages
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
                                                                             * **Response Structure:**
                                                                             * Same as GET /v1/products/{id}:
                                                                             * - **Simple products:** Flat structure with all data at root
                                                                             * - **Multi-variant products:** Hierarchical structure with product-level data + variants array
                                                                             *
                                                                             * **Field Filtering:**
                                                                             * Supports root-level and nested variant filtering for bandwidth optimization.
                                                                             *
                                                                             * **Currency:** Prices returned in store's default currency. For multi-currency support with
                                                                             * geographic detection, use the `/v1/prices/products/{id}` endpoint instead.
                                                                             *
                                                                             *
                                                                             * @returns Product Successfully retrieved product by slug with complete details including SEO metadata.
                                                                             *
                                                                             * **Response Structure:**
                                                                             * Same as GET /v1/products/{id}:
                                                                             *
                                                                             * **For Simple Products:**
                                                                             * Flat structure with all data at root level including SEO fields.
                                                                             *
                                                                             * **For Multi-Variant Products:**
                                                                             * Hierarchical structure with:
                                                                             * - Product-level data at root (including SEO fields)
                                                                             * - Aggregate data (total_stock, price_range)
                                                                             * - Clean variants array with only variant-specific fields
                                                                             *
                                                                             * **SEO Fields Included:**
                                                                             * - `product_slug`: The SEO-friendly slug used in the request
                                                                             * - `seo_title`: Optimized title for search engines
                                                                             * - `seo_description`: Optimized description for search engines
                                                                             * - `seo_keywords`: Keywords for SEO
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
                                                                             *
                                                                             * // Handle variants
                                                                             * if (product.has_variants) {
                                                                                 * console.log(`${product.variant_count} variants available`);
                                                                                 * console.log(`Price range: €${product.price_range.min/100} - €${product.price_range.max/100}`);
                                                                                 * }
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
                                                                                     * Comma-separated list of fields to include in the response. Supports both root-level and nested variant filtering.
                                                                                     *
                                                                                     * **Recommended Fields for PDPs:**
                                                                                     * - SEO: `seo_title`, `seo_description`, `seo_keywords`, `product_slug`
                                                                                     * - Core: `product_id`, `name`, `description`
                                                                                     * - Pricing: `price`, `selling_price`, `price_range` (for multi-variant)
                                                                                     * - Media: `media`, `thumbnail_url`
                                                                                     * - Metadata: `brand`, `category_name`, `attributes`, `tags`
                                                                                     * - Inventory: `stock`, `total_stock` (for multi-variant)
                                                                                     * - Variants: `variants` or nested filtering (e.g., `variants.sku,variants.selling_price`)
                                                                                     *
                                                                                     * **Nested Variant Filtering:**
                                                                                     * For multi-variant products, use dot notation to filter variant fields:
                                                                                     * ```
                                                                                     * fields=product_id,name,description,price_range,
                                                                                     * variants.variant_id,variants.sku,variants.selling_price,
                                                                                     * variants.stock,variants.variant_attributes
                                                                                     * ```
                                                                                     *
                                                                                     * **Example:**
                                                                                     * ```typescript
                                                                                     * const product = await client.products.getProductBySlug(slug, {
                                                                                         * fields: 'product_id,name,description,price_range,media,seo_title,seo_description,variants.sku,variants.selling_price,variants.stock'
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
                                                                                     * Returns a paginated list of product specifications for the authenticated store,
                                                                                     * ordered by most recently updated. Supports filtering by `product_id` and `status`.
                                                                                     *
                                                                                     * @returns any Success
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public listProductSpecifications({
                                                                                        productId,
                                                                                        status,
                                                                                        limit = 50,
                                                                                        cursor,
                                                                                    }: {
                                                                                        /**
                                                                                         * Filter specifications by product UUID
                                                                                         */
                                                                                        productId?: string,
                                                                                        /**
                                                                                         * Filter by specification status (e.g. `draft`, `published`)
                                                                                         */
                                                                                        status?: string,
                                                                                        /**
                                                                                         * Maximum number of specifications per page
                                                                                         */
                                                                                        limit?: number,
                                                                                        /**
                                                                                         * Cursor for pagination (base64-encoded)
                                                                                         */
                                                                                        cursor?: string,
                                                                                    }): CancelablePromise<{
                                                                                        specifications?: Array<{
                                                                                            id?: string;
                                                                                            product_id?: string;
                                                                                            template_id?: string | null;
                                                                                            specification_data?: Record<string, any>;
                                                                                            status?: string;
                                                                                            version?: number;
                                                                                            created_at?: string;
                                                                                            updated_at?: string;
                                                                                        }>;
                                                                                        pagination?: {
                                                                                            limit?: number;
                                                                                            next_cursor?: string | null;
                                                                                            has_more?: boolean;
                                                                                        };
                                                                                    }> {
                                                                                        return this.httpRequest.request({
                                                                                            method: 'GET',
                                                                                            url: '/v1/product-specifications',
                                                                                            query: {
                                                                                                'product_id': productId,
                                                                                                'status': status,
                                                                                                'limit': limit,
                                                                                                'cursor': cursor,
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
                                                                                        cursor,
                                                                                    }: {
                                                                                        type?: string,
                                                                                        /**
                                                                                         * Filter by homepage visibility (accepts string 'true' or 'false')
                                                                                         */
                                                                                        showOnHomepage?: 'true' | 'false',
                                                                                        limit?: number,
                                                                                        /**
                                                                                         * Cursor for pagination (base64-encoded)
                                                                                         */
                                                                                        cursor?: string,
                                                                                    }): CancelablePromise<{
                                                                                        collections?: Array<ProductCollection>;
                                                                                        pagination?: {
                                                                                            limit?: number;
                                                                                            next_cursor?: string | null;
                                                                                            has_more?: boolean;
                                                                                        };
                                                                                    }> {
                                                                                        return this.httpRequest.request({
                                                                                            method: 'GET',
                                                                                            url: '/v1/product-collections',
                                                                                            query: {
                                                                                                'type': type,
                                                                                                'show_on_homepage': showOnHomepage,
                                                                                                'limit': limit,
                                                                                                'cursor': cursor,
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
                                                                                        /**
                                                                                         * Product collection UUID
                                                                                         */
                                                                                        id: string,
                                                                                    }): CancelablePromise<(ProductCollection & {
                                                                                        /**
                                                                                         * Smart/automated collection rules (when collection_type is automated or smart)
                                                                                         */
                                                                                        rules?: any | null;
                                                                                    })> {
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
                                                                                     * Returns all items belonging to a product collection, ordered by `sort_order`.
                                                                                     * Each item contains the linked online product row along with its sort position.
                                                                                     * If the collection has no items (or does not exist), an empty array is returned.
                                                                                     *
                                                                                     * @returns any Success
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public getProductCollectionItems({
                                                                                        id,
                                                                                    }: {
                                                                                        /**
                                                                                         * Product collection UUID
                                                                                         */
                                                                                        id: string,
                                                                                    }): CancelablePromise<{
                                                                                        items?: Array<{
                                                                                            /**
                                                                                             * Product UUID
                                                                                             */
                                                                                            product_id?: string | null;
                                                                                            sort_order?: number | null;
                                                                                            /**
                                                                                             * Core product fields for the collection member.
                                                                                             */
                                                                                            product?: any | null;
                                                                                        }>;
                                                                                    }> {
                                                                                        return this.httpRequest.request({
                                                                                            method: 'GET',
                                                                                            url: '/v1/product-collections/{id}/items',
                                                                                            path: {
                                                                                                'id': id,
                                                                                            },
                                                                                            errors: {
                                                                                                400: `Invalid request - malformed data or missing required fields`,
                                                                                                401: `Authentication failed - invalid or missing API key`,
                                                                                                429: `Rate limit exceeded`,
                                                                                                500: `Internal server error`,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                }
