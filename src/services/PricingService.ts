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
        customerSegment,
        customerTier,
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
         * **Allowed fields:** product_id, variant_id, name, sku, description, price, online_price,
         * stock, image, category_name, base_price, display_price, display_currency, currency_symbol,
         * exchange_rate, price_breakdown, price_breakdown.*, pricing_context, pricing_context.*
         *
         * **Example:** `fields=name,display_price,display_currency,currency_symbol`
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
         * **Accuracy:** Uses PostGIS boundary matching for accurate region detection.
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
         * Customer UUID for personalized pricing (segment/tier-based)
         */
        customerId?: string,
        /**
         * RFM customer segment for segment-based pricing.
         *
         * **Segments:** Champions, Loyal, Potential, New, At Risk, Hibernating, Lost
         *
         */
        customerSegment?: string,
        /**
         * Customer tier for tier-based pricing.
         *
         * **Tiers:** Gold, Silver, Bronze, VIP
         *
         */
        customerTier?: string,
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
             * Exchange rate applied (1.0 if same currency)
             */
            exchange_rate?: number;
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
            };
            /**
             * Context used for pricing calculation
             */
            pricing_context?: {
                currency?: string;
                region?: string | null;
                customer_segment?: string | null;
                customer_tier?: string | null;
                quantity?: number | null;
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
         * Global pricing context for the request
         */
        pricing_context?: {
            location?: string | null;
            /**
             * Detected or specified region
             */
            region?: string | null;
            customer_segment?: string | null;
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
                'customer_segment': customerSegment,
                'customer_tier': customerTier,
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
     * **Multi-Currency Support:**
     * - Automatically detects currency based on customer location
     * - Converts price from store's base currency to detected currency
     * - Falls back to store's default currency if no location provided
     *
     * **Dynamic Pricing:**
     * - Customer segment/tier-based pricing
     * - Volume/quantity-based discounts
     * - Region-specific pricing rules
     * - Time-based promotions
     *
     * **Field Filtering:**
     * - Use `fields` parameter to reduce bandwidth
     * - Example: `fields=name,display_price,display_currency,price_breakdown`
     *
     * @returns any Successfully retrieved product with dynamic pricing and currency conversion.
     *
     * **Response includes:**
     * - Product details with converted price
     * - Price breakdown showing discounts
     * - Pricing context with currency and region info
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
        customerSegment,
        customerTier,
        quantity = 1,
    }: {
        /**
         * Product UUID or variant UUID
         */
        id: string,
        /**
         * Comma-separated list of fields to return (reduces bandwidth).
         *
         * **Example:** `fields=name,display_price,display_currency,currency_symbol,price_breakdown`
         *
         */
        fields?: string,
        /**
         * City or region name for geographic currency detection.
         *
         * **Examples:**
         * - `place_name=New York` → USD
         * - `place_name=London, UK` → GBP
         * - `place_name=Nairobi, Kenya` → KES
         *
         */
        placeName?: string,
        /**
         * Customer latitude for precise currency detection (use with longitude)
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
         * Customer UUID for personalized pricing
         */
        customerId?: string,
        /**
         * RFM customer segment (Champions, Loyal, etc.)
         */
        customerSegment?: string,
        /**
         * Customer tier (Gold, Silver, Bronze, VIP)
         */
        customerTier?: string,
        /**
         * Quantity for volume-based pricing
         */
        quantity?: number,
    }): CancelablePromise<{
        product_id?: string;
        name?: string;
        sku?: string;
        description?: string;
        /**
         * Price in store's base currency
         */
        base_price?: number;
        /**
         * Store's base currency code
         */
        base_currency?: string;
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
         * Exchange rate applied
         */
        exchange_rate?: number;
        /**
         * Detailed price calculation
         */
        price_breakdown?: {
            base_price?: number;
            discounts?: Array<{
                rule_id?: string;
                rule_name?: string;
                type?: string;
                value?: number;
                amount?: number;
            }>;
            final_price?: number;
        };
        /**
         * Context used for pricing
         */
        pricing_context?: {
            currency?: string;
            region?: string | null;
            customer_segment?: string | null;
            customer_tier?: string | null;
            quantity?: number;
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
                'customer_segment': customerSegment,
                'customer_tier': customerTier,
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
