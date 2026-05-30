/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CartItem = {
    /**
     * Cart item UUID
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
    quantity?: number;
    /**
     * Price per unit
     */
    unit_price?: number;
    /**
     * Actual customer-facing price (includes sale price if applicable)
     */
    selling_price?: number;
    /**
     * unit_price × quantity
     */
    total_price?: number;
    /**
     * Variant-specific stock count
     */
    stock_available?: number | null;
    /**
     * Whether the product has multiple variants
     */
    has_variants?: boolean;
    created_at?: string;
    updated_at?: string;
    /**
     * Whether this cart item belongs to the live or test environment.
     */
    environment?: CartItem.environment;
};
export namespace CartItem {
    /**
     * Whether this cart item belongs to the live or test environment.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

