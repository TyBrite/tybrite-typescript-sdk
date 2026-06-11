/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PricingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get prices for multiple products with dynamic pricing and multi-currency support
     * Calculate dynamic prices for products based on customer segment, location, volume, and geographic currency detection.
     *
     * **Multi-Currency Support:**
     * - Automatically detects currency based on customer location (coordinates or place name)
     * - Converts prices from store's base currency to detected currency
     * - Falls back to store's default currency if no location provided
     * - Works with both simple and multi-variant products
     *
     * **Multi-Variant Support:**
     * - Returns flat structure with default variant data (keeps payload small for browsing)
     * - Use `has_variants` flag to determine if detail fetch needed
     * - For full variant pricing, use GET /v1/prices/products/:id endpoint
     *
     * **Dynamic Pricing:**
     * - Customer segment-based pricing (RFM segmentation)
     * - Customer tier-based pricing (Gold, Silver, Bronze)
     * - Volume/quantity-based discounts
     * - Region-specific pricing rules
     * - Time-based promotions
     *
     * **Field Filtering:**
     * - Use `fields` parameter to reduce bandwidth by 50-90%
     * - Supports nested fields with dot notation
     * - Example: `fields=name,display_price,display_currency,price_breakdown.base_price`
     *
     * @returns any Successfully retrieved products with dynamic pricing and currency conversion.
     *
     * **Response includes:**
     * - Products with converted prices in detected/default currency
     * - Price breakdown showing base price, discounts, and final price
     * - Pricing context with currency info and detection method
     * - Pagination metadata
     *
     * **Note:** List endpoint returns flat structure with default variant only.
     * For full variant pricing, use GET /v1/prices/products/:id
     *
     * @throws ApiError
     */
    public getProductPrices({
        search,
        categoryId,
        subcategoryId,
        limit = 50,
        offset,
        fields,
        placeName,
        latitude,
        longitude,
        location,
        region,
        customerId,
        quantity,
    }: {
        /**
         * Search by product name or SKU
         */
        search?: string,
        /**
         * Filter by category UUID
         */
        categoryId?: string,
        /**
         * Filter by subcategory UUID
         */
        subcategoryId?: string,
        /**
         * Maximum number of products to return (1-200)
         */
        limit?: number,
        /**
         * Number of products to skip for pagination
         */
        offset?: number,
        /**
         * Comma-separated list of fields to return (reduces bandwidth by 50-90%).
         *
         * **Allowed fields:** product_id, variant_id, name, sku, description, price, selling_price,
         * stock, image, category_name, brand, has_variants, variant_count, total_stock,
         * base_price, resolved_price, display_price, base_currency, display_currency, currency_symbol,
         * exchange_rate, price_breakdown, price_breakdown.*, pricing_context, pricing_context.*
         *
         * **Example:** `fields=name,display_price,display_currency,currency_symbol,has_variants`
         *
         */
        fields?: string,
        /**
         * City or region name for geographic currency detection (e.g., "New York, USA", "London, UK", "Nairobi, Kenya").
         *
         * **How it works:**
         * 1. Geocodes place name to coordinates
         * 2. Matches coordinates to currency regions
         * 3. Returns prices in detected currency
         *
         * **Examples:**
         * - `place_name=New York` → USD
         * - `place_name=London` → GBP
         * - `place_name=Nairobi, Kenya` → KES
         *
         */
        placeName?: string,
        /**
         * Customer latitude for precise geographic currency detection.
         *
         * **Priority:** Coordinates take priority over place_name if both provided.
         *
         * **Accuracy:** Uses geographic boundary matching for accurate region detection.
         *
         * **Works with variants:** Currency detection applies to all product variants.
         *
         * **Example:** `latitude=40.7128&longitude=-74.0060` (New York) → USD
         *
         */
        latitude?: number,
        /**
         * Customer longitude for precise geographic currency detection.
         *
         * **Must be used with latitude parameter.**
         *
         * **Example:** `latitude=51.5074&longitude=-0.1278` (London) → GBP
         *
         */
        longitude?: number,
        /**
         * **DEPRECATED:** Use `place_name` instead for better geocoding support.
         *
         * Location/country for location-based pricing rules.
         *
         * @deprecated
         */
        location?: string,
        /**
         * Manual region override for pricing rules (bypasses automatic detection)
         */
        region?: string,
        /**
         * Customer UUID for personalized pricing.
         *
         * When provided, the worker resolves the customer's RFM segment and tier
         * server-side (from the customers + customer_stores tables) and feeds them
         * into pricing rule evaluation. There is no need to pass segment/tier directly.
         *
         */
        customerId?: string,
        /**
         * Quantity for volume-based pricing discounts
         */
        quantity?: number,
    }): CancelablePromise<{
        products?: Array<{
            product_id?: string;
            name?: string;
            sku?: string;
            /**
             * Price in store's base currency (before conversion)
             */
            base_price?: number;
            /**
             * Store's base currency code (e.g., EUR, USD)
             */
            base_currency?: string;
            /**
             * Price after discounts but before currency conversion
             */
            resolved_price?: number;
            /**
             * Price in customer's currency (after conversion and discounts)
             */
            display_price?: number;
            /**
             * Customer's currency code
             */
            display_currency?: string;
            /**
             * Currency symbol for display
             */
            currency_symbol?: string;
            /**
             * Primary image URL for list views
             */
            thumbnail_url?: string | null;
            /**
             * Array of product media objects
             */
            media?: Array<{
                id?: string;
                url?: string;
                type?: string;
                position?: number;
                alt_text?: string | null;
                is_primary?: boolean;
            }>;
            /**
             * Exchange rate applied (1.0 if same currency)
             */
            exchange_rate?: number;
            /**
             * Whether product has multiple variants
             */
            has_variants?: boolean;
            /**
             * Detailed price calculation breakdown
             */
            price_breakdown?: {
                /**
                 * Original price before discounts
                 */
                base_price?: number;
                /**
                 * Applied discount rules
                 */
                discounts?: Array<{
                    rule_id?: string;
                    rule_name?: string;
                    type?: 'percentage' | 'fixed_amount' | 'fixed_price' | 'markup';
                    value?: number;
                    amount?: number;
                }>;
                /**
                 * Final price after all discounts
                 */
                final_price?: number;
                /**
                 * Currency conversion details (null if no conversion)
                 */
                currency_conversion?: any | null;
            };
        }>;
        /**
         * Total number of products matching filters
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
        /**
         * Global pricing context for the request. `customer_segment` and
         * `customer_tier` are resolved server-side from `customer_id`
         * (they are not request parameters).
         *
         */
        pricing_context?: {
            location?: string | null;
            /**
             * Detected or specified region
             */
            region?: string | null;
            /**
             * Resolved RFM segment for the supplied customer_id
             */
            customer_segment?: string | null;
            /**
             * Resolved customer tier for the supplied customer_id
             */
            customer_tier?: string | null;
            quantity?: number | null;
            /**
             * Detected or default currency
             */
            currency?: string;
            /**
             * Applied exchange rate
             */
            exchange_rate?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/prices/products',
            query: {
                'search': search,
                'category_id': categoryId,
                'subcategory_id': subcategoryId,
                'limit': limit,
                'offset': offset,
                'fields': fields,
                'place_name': placeName,
                'latitude': latitude,
                'longitude': longitude,
                'location': location,
                'region': region,
                'customer_id': customerId,
                'quantity': quantity,
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
     * Get single product pricing with dynamic pricing and multi-currency support
     * Calculate dynamic price for a single product with geographic currency detection.
     *
     * **Response Structure:**
     * - Simple products: Flat structure with all data at root level
     * - Multi-variant products: Hierarchical structure with product-level data + variants array
     * - Each variant gets its own pricing calculation and price breakdown
     *
     * **Multi-Currency Support:**
     * - Automatically detects currency based on customer location
     * - Converts prices from store's base currency to detected currency
     * - Falls back to store's default currency if no location provided
     * - Works with all variants in multi-variant products
     *
     * **Dynamic Pricing:**
     * - Customer segment/tier-based pricing
     * - Volume/quantity-based discounts
     * - Region-specific pricing rules (applied per variant)
     * - Time-based promotions
     *
     * **Field Filtering:**
     * - Root-level filtering: Reduce top-level fields
     * - Nested variant filtering: Filter specific variant fields using dot notation
     * - Example: `fields=name,price_range,variants.sku,variants.display_price,variants.stock`
     * - Bandwidth reduction: Up to 55% with nested filtering
     *
     * @returns any Successfully retrieved product with dynamic pricing and currency conversion.
     *
     * **Response Structure:**
     * - Simple products: Flat structure with pricing at root
     * - Multi-variant products: Hierarchical with variants array, each variant has own pricing
     *
     * **Response includes:**
     * - Product details with converted prices
     * - Price breakdown showing discounts per variant
     * - Pricing context with currency and region info
     * - Aggregate price_range for multi-variant products
     *
     * @throws ApiError
     */
    public getProductPrice({
        id,
        fields,
        placeName,
        latitude,
        longitude,
        location,
        region,
        customerId,
        quantity,
    }: {
        /**
         * Product UUID or variant UUID
         */
        id: string,
        /**
         * Comma-separated list of fields to return (reduces bandwidth by up to 55%).
         *
         * **Root-level fields:** product_id, name, brand, description, total_stock, price_range,
         * has_variants, variant_count, base_currency, display_currency, currency_symbol, exchange_rate
         *
         * **Variant fields (use dot notation):** variants.variant_id, variants.sku, variants.display_price,
         * variants.stock, variants.variant_attributes, variants.price_breakdown, variants.price_breakdown.*
         *
         * **Example (35% reduction):** `fields=product_id,name,brand,total_stock,price_range,variants`
         *
         * **Example (55% reduction):** `fields=name,price_range,variants.sku,variants.display_price,variants.stock`
         *
         */
        fields?: string,
        /**
         * City or region name for geographic currency detection.
         *
         * **Works with variants:** All variant prices converted to detected currency.
         *
         * **Examples:**
         * - `place_name=New York` → USD
         * - `place_name=London, UK` → GBP
         * - `place_name=Nairobi, Kenya` → KES
         *
         */
        placeName?: string,
        /**
         * Customer latitude for precise currency detection (use with longitude).
         *
         * **Works with variants:** All variant prices converted based on detected region.
         *
         */
        latitude?: number,
        /**
         * Customer longitude for precise currency detection (use with latitude)
         */
        longitude?: number,
        /**
         * **DEPRECATED:** Use `place_name` instead.
         *
         * Location/country for location-based pricing
         *
         * @deprecated
         */
        location?: string,
        /**
         * Manual region override for pricing rules
         */
        region?: string,
        /**
         * Customer UUID for personalized pricing.
         *
         * When provided, the worker resolves the customer's RFM segment and tier
         * server-side (from the customers + customer_stores tables) and feeds them
         * into pricing rule evaluation. There is no need to pass segment/tier directly.
         *
         */
        customerId?: string,
        /**
         * Quantity for volume-based pricing
         */
        quantity?: number,
    }): CancelablePromise<{
        product_id?: string;
        name?: string;
        description?: string;
        brand?: string | null;
        category_name?: string | null;
        images?: Array<string>;
        product_slug?: string | null;
        /**
         * Primary image URL for list views
         */
        thumbnail_url?: string | null;
        /**
         * Array of product media objects
         */
        media?: Array<{
            id?: string;
            url?: string;
            type?: string;
            position?: number;
            alt_text?: string | null;
            is_primary?: boolean;
        }>;
        /**
         * Only present for simple products
         */
        variant_id?: string | null;
        /**
         * Only present for simple products
         */
        sku?: string | null;
        /**
         * Only present for simple products
         */
        stock?: number | null;
        /**
         * Price in store's base currency (only for simple products)
         */
        base_price?: number | null;
        /**
         * Price after discounts before conversion (only for simple products)
         */
        resolved_price?: number | null;
        /**
         * Final price in customer's currency (only for simple products)
         */
        display_price?: number | null;
        /**
         * Detailed price calculation (only for simple products)
         */
        price_breakdown?: any | null;
        /**
         * Sum of stock across all variants (only for multi-variant)
         */
        total_stock?: number | null;
        /**
         * Price range calculated from variant display_prices (only for multi-variant)
         */
        price_range?: any | null;
        /**
         * Whether product has multiple variants
         */
        has_variants?: boolean;
        /**
         * Number of variants (only for multi-variant)
         */
        variant_count?: number | null;
        /**
         * Array of variants with pricing (only for multi-variant)
         */
        variants?: any[] | null;
        /**
         * Store's base currency code
         */
        base_currency?: string;
        /**
         * Customer's currency code
         */
        display_currency?: string;
        /**
         * Currency symbol for display
         */
        currency_symbol?: string;
        /**
         * Exchange rate applied
         */
        exchange_rate?: number;
        /**
         * Global context used for pricing rule evaluation. `customer_segment`
         * and `customer_tier` are resolved server-side from `customer_id`
         * (they are not request parameters).
         *
         */
        pricing_context?: {
            location?: string | null;
            region?: string | null;
            /**
             * Resolved RFM segment for the supplied customer_id
             */
            customer_segment?: string | null;
            /**
             * Resolved customer tier for the supplied customer_id
             */
            customer_tier?: string | null;
            quantity?: number | null;
            /**
             * Detected display currency code
             */
            currency?: string;
            exchange_rate?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/prices/products/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'place_name': placeName,
                'latitude': latitude,
                'longitude': longitude,
                'location': location,
                'region': region,
                'customer_id': customerId,
                'quantity': quantity,
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
     * Get product pricing by SEO-friendly slug with dynamic pricing and multi-currency support
     * Calculate dynamic price for a single product using its SEO-friendly slug with geographic currency detection.
     *
     * **SEO-Friendly URLs:**
     * - Use product slugs instead of UUIDs for better SEO
     * - Example: `/v1/prices/products/by-slug/sony-wh-1000xm4-a089d`
     * - Slug format: `{product-name}-{short-id}`
     *
     * **Response Structure:**
     * - Simple products: Flat structure with all data at root level
     * - Multi-variant products: Hierarchical structure with product-level data + variants array
     * - Each variant gets its own pricing calculation and price breakdown
     *
     * **Multi-Currency Support:**
     * - Automatically detects currency based on customer location
     * - Converts prices from store's base currency to detected currency
     * - Falls back to store's default currency if no location provided
     * - Works with all variants in multi-variant products
     *
     * **Dynamic Pricing:**
     * - Customer segment/tier-based pricing
     * - Volume/quantity-based discounts
     * - Region-specific pricing rules (applied per variant)
     * - Time-based promotions
     *
     * **Field Filtering:**
     * - Root-level filtering: Reduce top-level fields
     * - Nested variant filtering: Filter specific variant fields using dot notation
     * - Example: `fields=name,price_range,variants.sku,variants.display_price,variants.stock`
     * - Bandwidth reduction: Up to 55% with nested filtering
     *
     * @returns any Successfully retrieved product with dynamic pricing and currency conversion.
     *
     * **Response Structure:**
     * - Simple products: Flat structure with pricing at root
     * - Multi-variant products: Hierarchical with variants array, each variant has own pricing
     *
     * **Response includes:**
     * - Product details with converted prices
     * - Price breakdown showing discounts per variant
     * - Pricing context with currency and region info
     * - Aggregate price_range for multi-variant products
     *
     * @throws ApiError
     */
    public getProductPriceBySlug({
        slug,
        fields,
        placeName,
        latitude,
        longitude,
        location,
        region,
        customerId,
        quantity,
    }: {
        /**
         * Product slug (SEO-friendly URL identifier)
         */
        slug: string,
        /**
         * Comma-separated list of fields to return (reduces bandwidth by up to 55%).
         *
         * **Root-level fields:** product_id, name, brand, description, total_stock, price_range,
         * has_variants, variant_count, base_currency, display_currency, currency_symbol, exchange_rate
         *
         * **Variant fields (use dot notation):** variants.variant_id, variants.sku, variants.display_price,
         * variants.stock, variants.variant_attributes, variants.price_breakdown, variants.price_breakdown.*
         *
         * **Example (35% reduction):** `fields=product_id,name,brand,total_stock,price_range,variants`
         *
         * **Example (55% reduction):** `fields=name,price_range,variants.sku,variants.display_price,variants.stock`
         *
         */
        fields?: string,
        /**
         * City or region name for geographic currency detection.
         *
         * **Works with variants:** All variant prices converted to detected currency.
         *
         * **Examples:**
         * - `place_name=New York` → USD
         * - `place_name=London, UK` → GBP
         * - `place_name=Nairobi, Kenya` → KES
         *
         */
        placeName?: string,
        /**
         * Customer latitude for precise currency detection (use with longitude).
         *
         * **Works with variants:** All variant prices converted based on detected region.
         *
         */
        latitude?: number,
        /**
         * Customer longitude for precise currency detection (use with latitude)
         */
        longitude?: number,
        /**
         * **DEPRECATED:** Use `place_name` instead.
         *
         * Location/country for location-based pricing
         *
         * @deprecated
         */
        location?: string,
        /**
         * Manual region override for pricing rules
         */
        region?: string,
        /**
         * Customer UUID for personalized pricing.
         *
         * When provided, the worker resolves the customer's RFM segment and tier
         * server-side (from the customers + customer_stores tables) and feeds them
         * into pricing rule evaluation. There is no need to pass segment/tier directly.
         *
         */
        customerId?: string,
        /**
         * Quantity for volume-based pricing
         */
        quantity?: number,
    }): CancelablePromise<{
        product_id?: string;
        name?: string;
        description?: string;
        brand?: string | null;
        category_name?: string | null;
        images?: Array<string>;
        product_slug?: string | null;
        /**
         * Primary image URL for list views
         */
        thumbnail_url?: string | null;
        /**
         * Array of product media objects
         */
        media?: Array<{
            id?: string;
            url?: string;
            type?: string;
            position?: number;
            alt_text?: string | null;
            is_primary?: boolean;
        }>;
        /**
         * Only present for simple products
         */
        variant_id?: string | null;
        /**
         * Only present for simple products
         */
        sku?: string | null;
        /**
         * Only present for simple products
         */
        stock?: number | null;
        /**
         * Price in store's base currency (only for simple products)
         */
        base_price?: number | null;
        /**
         * Price after discounts before conversion (only for simple products)
         */
        resolved_price?: number | null;
        /**
         * Final price in customer's currency (only for simple products)
         */
        display_price?: number | null;
        /**
         * Detailed price calculation (only for simple products)
         */
        price_breakdown?: any | null;
        /**
         * Sum of stock across all variants (only for multi-variant)
         */
        total_stock?: number | null;
        /**
         * Price range calculated from variant display_prices (only for multi-variant)
         */
        price_range?: any | null;
        /**
         * Whether product has multiple variants
         */
        has_variants?: boolean;
        /**
         * Number of variants (only for multi-variant)
         */
        variant_count?: number | null;
        /**
         * Array of variants with pricing (only for multi-variant)
         */
        variants?: any[] | null;
        /**
         * Store's base currency code
         */
        base_currency?: string;
        /**
         * Customer's currency code
         */
        display_currency?: string;
        /**
         * Currency symbol for display
         */
        currency_symbol?: string;
        /**
         * Exchange rate applied
         */
        exchange_rate?: number;
        /**
         * Global context used for pricing rule evaluation. `customer_segment`
         * and `customer_tier` are resolved server-side from `customer_id`
         * (they are not request parameters).
         *
         */
        pricing_context?: {
            location?: string | null;
            region?: string | null;
            /**
             * Resolved RFM segment for the supplied customer_id
             */
            customer_segment?: string | null;
            /**
             * Resolved customer tier for the supplied customer_id
             */
            customer_tier?: string | null;
            quantity?: number | null;
            /**
             * Detected display currency code
             */
            currency?: string;
            exchange_rate?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/prices/products/by-slug/{slug}',
            path: {
                'slug': slug,
            },
            query: {
                'fields': fields,
                'place_name': placeName,
                'latitude': latitude,
                'longitude': longitude,
                'location': location,
                'region': region,
                'customer_id': customerId,
                'quantity': quantity,
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
