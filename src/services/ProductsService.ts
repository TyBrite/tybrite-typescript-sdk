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
     * operator key, pass `?store_id=<merchant>` to narrow results to a single merchant. Responses are
     * cursor-paginated; pass the returned `next_cursor` as `?cursor=` for the next page.
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
     *
     * @throws ApiError
     */
    public listProducts({
        search,
        brand,
        categoryId,
        subcategoryId,
        limit = 50,
        cursor,
        fields,
        full,
        storeId,
        personalize,
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
         *
         */
        search?: string,
        /**
         * Filter products to a single brand (case-insensitive exact match). Use this to build a
         * brand landing page — pair it with `GET /v1/brands` to render a "shop by brand" row, then
         * pass the chosen brand here to list that brand's products.
         *
         */
        brand?: string,
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
         * - **Core:** `id` (alias of `product_id`), `product_id`, `variant_id`, `name`, `sku`, `description`
         * - **Pricing:** `price`, `selling_price`, `sale_price`, `display_currency`, `currency_symbol`
         * - **Inventory:** `stock`, `last_restocked` (`last_restocked` is not in the default response — request it explicitly)
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
         * By default the product **list** returns a lean payload optimized for catalog grids —
         * identity, price, thumbnail, taxonomy and flags — and omits heavy fields that a list view
         * rarely needs: the long-form `description`, the SEO block (`seo_title`/`seo_description`/`seo_keywords`),
         * raw `attributes`/`shipping_info`, and the full `media` arrays. Those are always available on the
         * single-product detail endpoints (`GET /v1/products/{id}`, `GET /v1/products/by-slug/{slug}`),
         * or you can request exactly the fields you want with `fields=` (which overrides this trimming).
         *
         * Set `full=true` to return the complete product object for every row in the list (the
         * pre-trim shape). Use it only when you genuinely need the heavy fields in a list context;
         * it materially increases the response size.
         *
         */
        full?: boolean,
        /**
         * Marketplace operator key only. Narrow the aggregated marketplace catalog to a single
         * merchant's products — the "shop page" for one merchant. Ignored when using a single-store key.
         *
         */
        storeId?: string,
        /**
         * When `true` and the request is made on behalf of a signed-in customer (pass the
         * customer's session token as `x-auth-token`), the returned page is ordered by how
         * closely each product matches that shopper's preferences, with the default name order
         * as the tiebreak. Without a customer session, or for a shopper with no preference
         * signal yet, the order is unchanged.
         *
         */
        personalize?: boolean,
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
                'brand': brand,
                'category_id': categoryId,
                'subcategory_id': subcategoryId,
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
                'full': full,
                'store_id': storeId,
                'personalize': personalize,
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
     * List brands
     * Return the distinct brands in the catalog, each with the number of products under it,
     * sorted by product count (most products first). Use this to build brand navigation — for
     * example a "featured brands" row after the hero — then pass a chosen brand to
     * `GET /v1/products?brand=<brand>` to list that brand's products.
     *
     * Brands come from each product's `brand` field; products with no brand are omitted. On a
     * marketplace operator key the brands are aggregated across all active merchants (pass
     * `store_id` to scope to one merchant).
     *
     * @returns any The store's distinct brands with product counts.
     * @throws ApiError
     */
    public listBrands({
        storeId,
    }: {
        /**
         * Operator scope only — narrow the brand list to a single merchant's catalog.
         */
        storeId?: string,
    }): CancelablePromise<{
        brands?: Array<{
            brand?: string;
            product_count?: number;
        }>;
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/brands',
            query: {
                'store_id': storeId,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
     * - stock (last_restocked available via fields=variants.last_restocked)
     * - variant_attributes (color, size, etc.)
     * - variant_name, is_default
     *
     * **Field Filtering:**
     * - Root-level: Exclude unnecessary fields (~ 38% reduction)
     * - Nested: Filter variant fields using dot notation (~ 52% reduction)
     * - Example: `fields=name,price_range,variants.sku,variants.selling_price,variants.stock`
     *
     * **SDK Usage:**
     *
     * @throws ApiError
     */
    public getProduct({
        id = '715b8c10-eb11-4289-8c0e-2966e78cf9a5',
        fields,
    }: {
        /**
         * Product ID or Variant ID. This endpoint accepts both types of IDs, providing flexible product retrieval.
         *
         * **Accepted ID Types:**
         * - **Product ID**: The main product identifier (e.g., `715b8c10-eb11-4289-8c0e-2966e78cf9a5`)
         * - **Variant ID**: A specific variant identifier (e.g., `15ca5a86-4b1b-47c3-8762-a1aa43941565`)
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
         *
         */
        id?: string,
        /**
         * Comma-separated list of fields to include in the response. Supports both root-level and nested variant filtering for maximum bandwidth optimization.
         *
         * **Root-Level Fields:**
         * - **Core:** `product_id`, `variant_id`, `name`, `sku`, `description`
         * - **Pricing:** `price`, `selling_price`, `sale_price`, `price_range`, `display_currency`, `currency_symbol`
         * - **Inventory:** `stock`, `total_stock`, `last_restocked` (`last_restocked` is not in the default response — request it explicitly)
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
         *
         * **Performance Impact:**
         * - Nested filtering excludes non-default fields like last_restocked
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
                `,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
     *
     * @throws ApiError
     */
    public getProductBySlug({
        slug = 'apple-macbook-pro-9b2bb-715b8c10',
        fields,
    }: {
        /**
         * SEO-friendly product slug in the format `{product-name}-{short-id}`.
         *
         * **Slug Format:**
         * - Lowercase product name with hyphens
         * - Short unique identifier appended
         * - Example: `apple-macbook-pro-9b2bb-715b8c10`
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
         *
         * **SEO Benefits:**
         * - Readable URLs: `/products/apple-macbook-pro-9b2bb-715b8c10` vs `/products/715b8c10-eb11-4289-8c0e-2966e78cf9a5`
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

                 **Debugging Tips:**
                - Verify slug format matches \`{name}-{short-id}\` pattern
                - Check that slug is lowercase
                - Ensure product exists in your store
                - Try listing products to see available slugs
                `,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a variant's specifications
     * Returns the latest published specification version for a single product **variant**.
     *
     * **Important — this endpoint is keyed by VARIANT id, not product id.** Specifications are
     * stored per variant, so the `{id}` path segment must be a **variant** UUID (e.g. the
     * `variant_id` from a product detail, or an `id` from `GET /v1/product-specifications`).
     * Passing a *product* id (or a variant that has no published specifications) returns
     * `404 not_found` — "No specifications found for this product". To browse all specifications
     * across the catalog, use `GET /v1/product-specifications` (which lists them with their
     * `variant_id`).
     *
     * Read access — works with a publishable or secret key.
     *
     * @returns any Successfully retrieved product specification
     * @throws ApiError
     */
    public getProductSpecifications({
        id,
    }: {
        /**
         * The **variant** UUID whose specifications to fetch (NOT a product id). A product id
         * returns 404 — specifications are variant-keyed.
         *
         */
        id: string,
    }): CancelablePromise<{
        id?: string;
        variant_id?: string;
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List product specifications
     * Returns a paginated list of product specifications for the authenticated store,
     * ordered by most recently updated. Each row carries the `variant_id` it belongs to
     * (specifications are stored per variant). Supports filtering by `product_id` (which
     * matches on `variant_id` — pass a variant UUID) and `status`.
     *
     * Read access — works with a publishable or secret key.
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
         * Filter to a single variant's specifications. Despite the name, this matches on
         * `variant_id` — pass a **variant** UUID.
         *
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
            variant_id?: string;
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
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
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
