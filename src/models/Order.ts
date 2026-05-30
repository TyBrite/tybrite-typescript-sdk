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
        PAYSTACK = 'paystack',
        MPESA = 'mpesa',
        AIRTEL = 'airtel',
        CASH = 'cash',
        BANK_TRANSFER = 'bank_transfer',
    }
    /**
     * Whether this order was created in the live or test environment. Sandbox orders are isolated from production data.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

