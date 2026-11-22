/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One merchant selling in the marketplace, as listed in the merchant directory.
 */
export type MarketplaceMerchant = {
    /**
     * The merchant's store. Pass it as `store_id` to narrow product, category and brand reads, and as `merchant_store_id` on a checkout item.
     */
    store_id: string;
    store_name: string;
    /**
     * The merchant's short store code.
     */
    store_code?: string | null;
    logo_url?: string | null;
    description?: string | null;
    /**
     * The merchant's active products sold online.
     */
    product_count: number;
};

