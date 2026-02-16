/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents a product in the catalog with both physical and online attributes.
 */
export type Product = {
    product_id?: string;
    variant_id?: string | null;
    name?: string;
    /**
     * Name used for online display if different from internal name
     */
    online_name?: string | null;
    sku?: string;
    description?: string;
    /**
     * Rich text description for online store
     */
    online_description?: string | null;
    /**
     * Base price
     */
    price?: number;
    /**
     * Price displayed online
     */
    online_price?: number | null;
    /**
     * Discounted price for online store
     */
    online_sale_price?: number | null;
    /**
     * Original price for comparison (strikethrough price)
     */
    compare_at_price?: number | null;
    /**
     * Physical stock count
     */
    stock?: number;
    /**
     * Stock available for online sales
     */
    online_stock?: number;
    /**
     * Primary product image URL (legacy/POS)
     */
    image?: string;
    /**
     * Array of image URLs (legacy)
     */
    images?: Array<string>;
    /**
     * Array of image URLs for online store
     */
    online_images?: Array<string>;
    product_slug?: string;
    is_online_enabled?: boolean;
    is_active?: boolean;
    has_variants?: boolean;
    tracking_mode?: Product.tracking_mode;
    /**
     * Low stock threshold
     */
    threshold?: number;
    brand?: string;
    barcode?: string;
    barcode_type?: string;
    category_id?: string;
    category_name?: string;
    subcategory_id?: string;
    subcategory_name?: string;
    /**
     * Merged category/subcategory string
     */
    online_category?: string;
    tags?: Array<string>;
    /**
     * Key-value pairs of product attributes
     */
    attributes?: Record<string, any>;
    /**
     * Specific attributes for this variant
     */
    variant_attributes?: Record<string, any> | null;
    shipping_info?: {
        weight?: number;
        dimensions?: {
            length?: number;
            width?: number;
            height?: number;
        };
    };
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: Array<string>;
    featured?: boolean;
    featured_order?: number;
    created_at?: string;
    updated_at?: string;
    /**
     * Store's default currency code
     */
    display_currency?: string;
    /**
     * Currency symbol
     */
    currency_symbol?: string;
    /**
     * Calculated base price from pricing engine
     */
    base_price?: number;
    /**
     * Final calculated price including discounts/rules
     */
    resolved_price?: number;
    /**
     * Detailed breakdown of price calculation rules
     */
    price_breakdown?: Record<string, any>;
};
export namespace Product {
    export enum tracking_mode {
        QUANTITY = 'quantity',
        STATUS = 'status',
        NONE = 'none',
    }
}

