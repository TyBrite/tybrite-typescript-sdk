/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A single resolved member of a curated section.
 */
export type CollectionItem = {
    /**
     * The merchant this member belongs to.
     */
    merchant_store_id: string;
    /**
     * For `product` sections, the featured product. Null for other section kinds.
     */
    product_id?: string | null;
    /**
     * For `promotion` sections, the featured promotion. Null for other section kinds.
     */
    promotion_id?: string | null;
};

