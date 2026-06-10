/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Commission and payout breakdown for a single merchant within a unified order.
 */
export type MerchantBreakdownItem = {
    merchant_store_id?: string;
    /**
     * Total of this merchant's items before any discount is applied.
     */
    merchant_gross?: number;
    /**
     * Total discount applied to this merchant's portion of the basket (the merchant's own promotion and/or gift card). Reduces this merchant's subtotal.
     */
    discount_amount?: number;
    /**
     * Total of this merchant's items after discount and before commission.
     */
    gross_amount?: number;
    /**
     * Commission deducted from this merchant's gross.
     */
    commission_amount?: number;
    /**
     * Amount this merchant receives after commission.
     */
    net_amount?: number;
    /**
     * Identifier of the commission rule applied to this merchant, or null if none matched.
     */
    commission_rule_id?: string | null;
};

