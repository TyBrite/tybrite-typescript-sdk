/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents a single product variant with only variant-specific fields.
 * Product-level attributes (name, description, brand, etc.) are NOT duplicated here.
 *
 * **Field Filtering:**
 * Use dot notation to filter variant fields: variants.sku,variants.selling_price,variants.stock
 * This can reduce payload size by excluding non-default fields like last_restocked.
 *
 */
export type ProductVariant = {
    /**
     * Unique variant identifier
     */
    variant_id?: string;
    /**
     * Stock Keeping Unit for this variant
     */
    sku?: string;
    /**
     * Base price in cents
     */
    price?: number;
    /**
     * Sale price in cents (null if not on sale)
     */
    sale_price?: number | null;
    /**
     * Actual customer-facing price in cents (considers sale_price)
     */
    selling_price?: number;
    /**
     * Available stock quantity for this variant
     */
    stock?: number;
    /**
     * Last restock date. Not included by default — request it explicitly with `fields=variants.last_restocked`.
     */
    last_restocked?: string | null;
    /**
     * Variant-specific attributes (e.g., color, size, material)
     */
    variant_attributes?: any | null;
    /**
     * Display name for this variant
     */
    variant_name?: string | null;
    /**
     * Whether this is the default variant
     */
    is_default?: boolean;
    /**
     * Array of media objects specific to this variant
     */
    media?: Array<{
        id?: string;
        url?: string;
        type?: string;
        position?: number;
        alt_text?: string | null;
        is_primary?: boolean;
    }>;
};

