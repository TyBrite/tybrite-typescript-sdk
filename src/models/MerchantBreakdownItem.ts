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
     * Total of this merchant's items before commission.
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

