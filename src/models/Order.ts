/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { OrderItem } from './OrderItem';
export type Order = {
    id?: string;
    order_number?: string;
    customer_id?: string;
    customer_email?: string;
    customer_phone?: string;
    customer_name?: string;
    order_status?: Order.order_status;
    payment_status?: Order.payment_status;
    /**
     * Method used for payment
     */
    payment_method?: Order.payment_method;
    payment_reference?: string;
    subtotal?: number;
    tax_amount?: number;
    shipping_amount?: number;
    discount_amount?: number;
    total_amount?: number;
    billing_address?: Address;
    shipping_address?: Address;
    items?: Array<OrderItem>;
    notes?: string;
    tracking_number?: string;
    estimated_delivery?: string;
    shipped_at?: string;
    delivered_at?: string;
    created_at?: string;
    updated_at?: string;
    /**
     * Complete shipping calculation details for audit trail
     */
    shipping_metadata?: {
        /**
         * Calculated shipping fee
         */
        fee?: number;
        /**
         * Delivery zone name (if zone-based pricing)
         */
        zone_name?: string | null;
        /**
         * Pricing tier name (if distance-based pricing)
         */
        tier_name?: string | null;
        /**
         * Calculated distance from store (if distance-based)
         */
        distance_meters?: number | null;
        /**
         * Whether free delivery was applied
         */
        is_free?: boolean;
        /**
         * Human-readable explanation of fee
         */
        reason?: string;
        /**
         * Which pricing system was applied
         */
        applied_rule?: Order.applied_rule;
    } | null;
};
export namespace Order {
    export enum order_status {
        PENDING = 'pending',
        PROCESSING = 'processing',
        SHIPPED = 'shipped',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
    export enum payment_status {
        PENDING = 'pending',
        PAID = 'paid',
        FAILED = 'failed',
        REFUNDED = 'refunded',
    }
    /**
     * Method used for payment
     */
    export enum payment_method {
        STRIPE = 'stripe',
        PAYSTACK = 'paystack',
        MPESA = 'mpesa',
        AIRTEL = 'airtel',
        CASH = 'cash',
        BANK_TRANSFER = 'bank_transfer',
    }
    /**
     * Which pricing system was applied
     */
    export enum applied_rule {
        ZONE = 'zone',
        DISTANCE = 'distance',
        DEFAULT = 'default',
    }
}

