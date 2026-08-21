/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomFieldValue } from './CustomFieldValue';
export type OrderItem = {
    id?: string;
    /**
     * Per-line fields the merchant defined — a personalisation or engraving carried on this line rather than on the order. Only fields the merchant published appear here; the merchant controls the names and how many
     * exist, so render the array rather than reading fixed keys.
     *
     */
    custom_fields?: Array<CustomFieldValue>;
    /**
     * Product UUID
     */
    product_id?: string;
    product_name?: string;
    product_sku?: string;
    quantity?: number;
    unit_price?: number;
    subtotal?: number;
};

