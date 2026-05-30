/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WishlistItem = {
    /**
     * Wishlist item UUID
     */
    id?: string;
    /**
     * Product UUID
     */
    product_id?: string;
    /**
     * Specific product variant UUID
     */
    variant_id?: string;
    /**
     * Product name
     */
    product_name?: string;
    /**
     * Variant display name
     */
    variant_name?: string | null;
    /**
     * Variant-specific attributes (color, size, etc.)
     */
    variant_attributes?: Record<string, any>;
    /**
     * Variant-specific SKU
     */
    product_sku?: string;
    /**
     * Variant selling price
     */
    product_price?: number;
    /**
     * Primary image URL for quick display
     */
    thumbnail_url?: string | null;
    /**
     * Full media gallery (variant-specific or product-level)
     */
    media?: Array<{
        id?: string;
        url?: string;
        type?: 'image' | 'video';
        position?: number;
        alt_text?: string | null;
        is_primary?: boolean;
    }>;
    /**
     * Variant-specific stock count
     */
    stock_available?: number | null;
    /**
     * Whether the product has multiple variants
     */
    has_variants?: boolean;
    created_at?: string;
    /**
     * Whether this wishlist item belongs to the live or test environment.
     */
    environment?: WishlistItem.environment;
};
export namespace WishlistItem {
    /**
     * Whether this wishlist item belongs to the live or test environment.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

