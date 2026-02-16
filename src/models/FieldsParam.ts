/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Comma-separated list of fields to return. Supports nested fields with dot notation.
 *
 * **Available fields:** product_id, variant_id, name, online_name, sku, description, online_description, category_id, category_name, subcategory_id, subcategory_name, price, online_price, compare_at_price, online_sale_price, stock, online_stock, image, online_images, product_slug, is_online_enabled, seo_title, seo_description, seo_keywords, featured, featured_order, brand, barcode, selling_price, threshold, last_restocked, tracking_mode, is_active, has_variants, variant_name, variant_attributes, tags, attributes.*, shipping_info.*, created_at, updated_at
 *
 * **Examples:**
 * - `product_id,name,price,stock` - Basic product info
 * - `name,online_images,online_price,stock` - Online store display
 * - `name,description,attributes.color,attributes.size` - With nested attributes
 *
 */
export type FieldsParam = string;
