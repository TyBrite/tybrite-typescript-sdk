/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Recommendation = {
    productId?: string;
    score?: number;
    reason?: string;
    /**
     * Present only for marketplace recommendations — the merchant that the recommended product belongs to.
     */
    merchant_store_id?: string;
};

