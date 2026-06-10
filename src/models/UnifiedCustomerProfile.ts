/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A shopper's unified profile across every merchant in the marketplace.
 */
export type UnifiedCustomerProfile = {
    customer?: {
        /**
         * The shopper's customer identifiers across the marketplace's merchants.
         */
        ids?: Array<string>;
        email?: string | null;
        name?: string | null;
        phone?: string | null;
        address?: string | null;
        status?: string | null;
        join_date?: string | null;
    };
    /**
     * The merchants this shopper has a relationship with.
     */
    stores?: Array<{
        merchant_store_id?: string;
        merchant_store_name?: string | null;
        affiliation_date?: string | null;
        first_purchase_date?: string | null;
        last_purchase_date?: string | null;
        total_purchases?: number | null;
        total_spent?: number | null;
        status?: string | null;
        preferred_store?: boolean | null;
    }>;
    /**
     * The shopper's order history across all merchants, newest first.
     */
    orders?: Array<{
        id?: string;
        order_number?: string | null;
        merchant_store_id?: string;
        merchant_store_name?: string | null;
        order_status?: string | null;
        payment_status?: string | null;
        total_amount?: number | null;
        subtotal?: number | null;
        tax_amount?: number | null;
        shipping_amount?: number | null;
        discount_amount?: number | null;
        tracking_number?: string | null;
        estimated_delivery?: string | null;
        created_at?: string | null;
        updated_at?: string | null;
    }>;
};

