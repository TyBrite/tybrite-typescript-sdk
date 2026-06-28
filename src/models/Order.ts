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
    /**
     * Per-jurisdiction tax detail when tax was calculated automatically for the shipping destination (one entry per taxing jurisdiction). Null when a flat store rate was used.
     */
    tax_breakdown?: any[] | null;
    /**
     * How the tax figure was produced — `automatic` (jurisdiction-accurate calculation for the destination), `fallback` (automatic calculation was unavailable, so the store's configured rate was used), or `manual` (the store's configured rate).
     */
    tax_source?: Order.tax_source;
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
     * Whether this order was created in the live or test environment. Sandbox orders are isolated from production data.
     */
    environment?: Order.environment;
    /**
     * Complete shipping calculation details for audit trail
     */
    shipping_metadata?: any | null;
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
        PAYPAL = 'paypal',
        PAYSTACK = 'paystack',
        MPESA = 'mpesa',
        CASH = 'cash',
        BANK_TRANSFER = 'bank_transfer',
    }
    /**
     * How the tax figure was produced — `automatic` (jurisdiction-accurate calculation for the destination), `fallback` (automatic calculation was unavailable, so the store's configured rate was used), or `manual` (the store's configured rate).
     */
    export enum tax_source {
        AUTOMATIC = 'automatic',
        FALLBACK = 'fallback',
        MANUAL = 'manual',
    }
    /**
     * Whether this order was created in the live or test environment. Sandbox orders are isolated from production data.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

