/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents a product in the catalog. Response structure varies based on endpoint and variant configuration:
 *
 * **List Endpoint (GET /v1/products):**
 * - Returns flat structure with default variant data only
 * - No variants array (keeps payload small for browsing)
 * - Includes has_variants flag to indicate if detail fetch needed
 *
 * **Detail Endpoints (GET /v1/products/:id, GET /v1/products/by-slug/:slug):**
 * - Multi-variant products: Hierarchical structure with product-level data at root + variants array
 * - Simple products: Flat structure with all data at root (no variants array)
 *
 * **Field Filtering:**
 * - Root-level filtering: Reduce top-level fields
 * - Nested filtering: Filter specific variant fields using dot notation
 * - Example: fields=name,price_range,variants.sku,variants.selling_price,variants.stock
 *
 */
export type Product = {
    /**
     * Product identifier. Identical to `product_id`.
     */
    id?: string;
    /**
     * Product identifier. Identical to `id`.
     */
    product_id?: string;
    /**
     * Product name
     */
    name?: string;
    /**
     * Product description
     */
    description?: string;
    /**
     * Category UUID
     */
    category_id?: string | null;
    /**
     * Category display name
     */
    category_name?: string | null;
    /**
     * Subcategory UUID
     */
    subcategory_id?: string | null;
    /**
     * Subcategory display name
     */
    subcategory_name?: string | null;
    /**
     * Product brand
     */
    brand?: string | null;
    /**
     * Primary image URL for list views
     */
    thumbnail_url?: string | null;
    /**
     * Array of product media objects including images and videos
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
     * SEO-friendly URL slug
     */
    product_slug?: string | null;
    /**
     * SEO title for the product detail page
     */
    seo_title?: string | null;
    /**
     * SEO meta description for the product detail page
     */
    seo_description?: string | null;
    /**
     * SEO keywords for the product
     */
    seo_keywords?: any[] | null;
    /**
     * Whether product is featured
     */
    featured?: boolean | null;
    /**
     * Display order for featured products
     */
    featured_order?: number | null;
    /**
     * Product tags
     */
    tags?: any[] | null;
    /**
     * Product-level attributes (not variant-specific)
     */
    attributes?: any | null;
    /**
     * Shipping dimensions and weight
     */
    shipping_info?: any | null;
    /**
     * Product creation timestamp
     */
    created_at?: string | null;
    /**
     * Last update timestamp
     */
    updated_at?: string | null;
    /**
     * Whether product is active
     */
    is_active?: boolean | null;
    /**
     * Variant identifier (only present for simple products or list endpoint)
     */
    variant_id?: string | null;
    /**
     * Stock Keeping Unit (only present for simple products or list endpoint)
     */
    sku?: string | null;
    /**
     * Base price in cents (only present for simple products or list endpoint)
     */
    price?: number | null;
    /**
     * Sale price in cents if on sale
     */
    sale_price?: number | null;
    /**
     * Actual customer-facing price (considers sale_price)
     */
    selling_price?: number | null;
    /**
     * Available stock quantity (only present for simple products or list endpoint)
     */
    stock?: number | null;
    /**
     * Low stock threshold
     */
    threshold?: number | null;
    /**
     * Last restock date
     */
    last_restocked?: string | null;
    /**
     * Variant-specific attributes (e.g., color, size)
     */
    variant_attributes?: any | null;
    /**
     * Variant display name
     */
    variant_name?: string | null;
    /**
     * Whether this is the default variant
     */
    is_default?: boolean | null;
    /**
     * Sum of stock across all variants (only present for multi-variant products)
     */
    total_stock?: number | null;
    /**
     * Price range across variants using selling_price (only present for multi-variant products)
     */
    price_range?: any | null;
    /**
     * Whether product has multiple variants
     */
    has_variants?: boolean;
    /**
     * Number of variants (only present for multi-variant products)
     */
    variant_count?: number | null;
    /**
     * Store's default currency code
     */
    display_currency?: string;
    /**
     * Currency symbol
     */
    currency_symbol?: string;
    /**
     * Array of product variants (only present for multi-variant products in detail endpoints)
     */
    variants?: any[] | null;
};

