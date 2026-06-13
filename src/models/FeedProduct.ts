/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A product as it appears in a store's public catalog feed. A superset of the ingestion
 * input shape — it adds the rich media gallery and published specifications, and never
 * includes cost or margin fields.
 *
 */
export type FeedProduct = {
    sku?: string;
    name?: string;
    description?: string;
    category?: string;
    subcategory?: string;
    brand?: string;
    /**
     * A single primary image URL (convenience for simple consumers).
     */
    image?: string;
    /**
     * The full media gallery (product-level).
     */
    media?: Array<{
        url?: string;
        type?: string;
        position?: number;
        alt?: string | null;
        is_primary?: boolean;
    }>;
    /**
     * Variant-level media, when present.
     */
    variant_media?: Array<Record<string, any>>;
    price?: number;
    sale_price?: number | null;
    stock?: number;
    variant_name?: string;
    /**
     * Present on multi-variant products so a consumer can regroup variants.
     */
    product_group?: string;
    /**
     * SEO title, when present (omitted to keep the feed lean when null).
     */
    seo_title?: string | null;
    /**
     * SEO meta description, when present.
     */
    seo_description?: string | null;
    /**
     * SEO keywords, when present.
     */
    seo_keywords?: any[] | null;
    /**
     * Published product specifications as a flat key/value object, when present.
     */
    specifications?: Record<string, any>;
};

