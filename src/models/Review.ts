/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Review = {
    id: string;
    store_id: string;
    product_id: string;
    variant_id?: string | null;
    /**
     * Order associated with this review. Present only when the reviewer provided one at submission time and it matched their purchase history, resulting in verified_purchase true.
     */
    order_id?: string | null;
    customer_id?: string | null;
    /**
     * Display name of the reviewer, taken from their customer profile at submission time.
     */
    customer_name: string;
    rating: number;
    title?: string | null;
    body?: string | null;
    media_urls?: Array<string>;
    status: Review.status;
    rejection_reason?: string | null;
    helpful_count: number;
    verified_purchase: boolean;
    created_at: string;
    updated_at: string;
};
export namespace Review {
    export enum status {
        PENDING = 'pending',
        APPROVED = 'approved',
        REJECTED = 'rejected',
    }
}

