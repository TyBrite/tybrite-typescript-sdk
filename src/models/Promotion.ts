/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Promotion = {
    id?: string;
    name?: string;
    type?: Promotion.type;
    display_type?: string;
    description?: string;
    discount_value?: number;
    discount_type?: Promotion.discount_type;
    min_purchase?: number;
    max_discount?: number;
    start_date?: string;
    end_date?: string;
    status?: Promotion.status;
    usage_limit?: number;
    usage_per_customer?: number;
    bundle_products?: Array<Record<string, any>>;
    bogo_required_products?: Array<Record<string, any>>;
    bogo_free_products?: Array<Record<string, any>>;
    free_products?: Array<Record<string, any>>;
    applicable_categories?: Array<string>;
    applicable_products?: Array<string>;
    created_at?: string;
    updated_at?: string;
};
export namespace Promotion {
    export enum type {
        FIXED = 'fixed',
        DISCOUNT = 'discount',
        BUNDLE = 'bundle',
        BOGO = 'bogo',
    }
    export enum discount_type {
        PERCENTAGE = 'percentage',
        FIXED = 'fixed',
    }
    export enum status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
        SCHEDULED = 'scheduled',
        EXPIRED = 'expired',
    }
}

