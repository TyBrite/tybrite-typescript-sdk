/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One product (or one variant of a product) in an ingestion feed. Variants of the same
 * product share a `product_group` and each carry their own `sku`.
 *
 */
export type IngestProduct = {
    /**
     * Your unique stock-keeping unit. The identity used for upsert.
     */
    sku: string;
    /**
     * Groups rows into one multi-variant product. Rows sharing a non-empty value become
     * variants of the same product. Omit for a standalone single-variant product.
     *
     */
    product_group?: string;
    /**
     * Product name.
     */
    name: string;
    /**
     * Label for this variant (e.g. a size/colour). Defaults to "Default".
     */
    variant_name?: string;
    description?: string;
    /**
     * **Required.** The category this product belongs to, by name (or its id). The category
     * must already exist in your catalog — categories are not created from a feed (an
     * inactive one is reactivated automatically). A row whose category does not exist is
     * rejected.
     *
     */
    category: string;
    /**
     * Optional subcategory under the category. Unlike categories, **subcategories are
     * created automatically** if they don't exist. Use ` > ` to nest, e.g.
     * `Audio > Headphones > Wireless`.
     *
     */
    subcategory?: string;
    brand?: string;
    /**
     * Public image URL.
     */
    image?: string;
    /**
     * Selling price. Must be greater than 0.
     */
    price: number;
    /**
     * Unit cost. Optional.
     */
    cost_price?: number;
    /**
     * On-hand quantity.
     */
    stock?: number;
    /**
     * Low-stock threshold.
     */
    threshold?: number;
    barcode?: string;
    /**
     * Barcode symbology. Common spellings are normalized (e.g. `UPC` → `UPC_A`). Unknown
     * values fall back to `CODE128`.
     *
     */
    barcode_type?: string;
};

