/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomFieldValue } from './CustomFieldValue';
export type OrderItem = {
    id?: string;
    order_id?: string;
    /**
     * The variant (SKU) this line sold.
     */
    variant_id?: string | null;
    /**
     * The variant's SKU, recorded on the line when the order was placed.
     */
    sku?: string | null;
    /**
     * The variant's name, such as `32` or `Large`.
     */
    variant_name?: string | null;
    /**
     * The variant's option values, such as `{ "Size": "32" }`. `null` for a variant with no options.
     */
    options?: any | null;
    /**
     * The variant's option values as recorded on the line when the order was placed.
     */
    product_options?: any | null;
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
    /**
     * The variant's SKU. Same value as `sku`.
     */
    product_sku?: string | null;
    /**
     * How the line is delivered, as it was when the order was placed. A later change to the product does not change it. Orders placed before delivery kinds existed read as `shipped`.
     */
    fulfilment_kind?: OrderItem.fulfilment_kind;
    quantity?: number;
    unit_price?: number;
    /**
     * `unit_price` × `quantity`, in the order's currency.
     */
    total_price?: number;
};
export namespace OrderItem {
    /**
     * How the line is delivered, as it was when the order was placed. A later change to the product does not change it. Orders placed before delivery kinds existed read as `shipped`.
     */
    export enum fulfilment_kind {
        SHIPPED = 'shipped',
        DIGITAL = 'digital',
        CODE = 'code',
        EVENT_TICKET = 'event_ticket',
        SERVICE = 'service',
    }
}

