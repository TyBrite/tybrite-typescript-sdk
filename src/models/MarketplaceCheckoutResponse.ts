/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MerchantBreakdownItem } from './MerchantBreakdownItem';
/**
 * A created multi-merchant order awaiting payment. Use `client_secret` to
 * complete the payment on the storefront; the order finalizes automatically
 * once payment succeeds.
 *
 */
export type MarketplaceCheckoutResponse = {
    /**
     * Identifier for the multi-merchant order.
     */
    order_group_id?: string;
    /**
     * Human-readable reference for the order.
     */
    group_number?: string;
    /**
     * Identifier of the payment to complete on the storefront.
     */
    payment_intent_id?: string;
    /**
     * Secret used by the storefront payment form to complete the charge.
     */
    client_secret?: string;
    currency?: string;
    subtotal?: number;
    total_amount?: number;
    /**
     * Per-merchant gross, commission, and net amounts for this order.
     */
    merchant_breakdown?: Array<MerchantBreakdownItem>;
};

