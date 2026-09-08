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
 * **Channel and logistics fields:**
 * `condition`, `gtin`, `mpn`, `weight_grams` and `dimensions_cm` describe an
 * individual item for sales channels and shipping, so they belong to the
 * variant: two sizes of one shirt carry different codes and weights.
 * `google_product_category`, `meta_product_category` and `tags` classify the
 * listing as a whole and belong to the product. All of them are returned on
 * the list endpoint and on detail, and any of them can be named in `fields=`.
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
     * The product's category in the Google Shopping taxonomy, as the merchant assigned it. Sales channels use this to file the listing; it is independent of `category_name`, which is the store's own taxonomy.
     */
    google_product_category?: string | null;
    /**
     * The product's category in the Meta commerce taxonomy. The Meta counterpart of `google_product_category`, set separately because the two taxonomies do not share category names.
     */
    meta_product_category?: string | null;
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
     * Base price in major currency units (369.99 = $369.99), not minor units. Only present for simple products or the list endpoint.
     */
    price?: number | null;
    /**
     * Sale price in major currency units (369.99 = $369.99) if on sale
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
     * Last restock date. Not included in the default list response — request it explicitly with `fields=last_restocked`.
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
     * The condition the item is sold in. Sales channels require this on a listing and reject a value outside the three. Defaults to `new`.
     */
    condition?: Product.condition;
    /**
     * The manufacturer's Global Trade Item Number (UPC, EAN, or ISBN). Sales channels match a listing against this to identify the product. It is not the same as the barcode the merchant scans in store, which may be an internal label and is never returned by this API.
     */
    gtin?: string | null;
    /**
     * Manufacturer part number. Identifies the item for products that carry no `gtin`, which is common for made-to-order and own-brand goods.
     */
    mpn?: string | null;
    /**
     * Shipped weight of the item in grams.
     */
    weight_grams?: number | null;
    /**
     * Packed dimensions in centimetres as free text, in the merchant's own format. Parse defensively rather than assuming a fixed shape.
     */
    dimensions_cm?: string | null;
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
export namespace Product {
    /**
     * The condition the item is sold in. Sales channels require this on a listing and reject a value outside the three. Defaults to `new`.
     */
    export enum condition {
        NEW = 'new',
        REFURBISHED = 'refurbished',
        USED = 'used',
    }
}

