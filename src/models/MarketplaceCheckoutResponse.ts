/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketplaceShippingLine } from './MarketplaceShippingLine';
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
    /**
     * The amount charged — the basket after every discount, plus shipping, less `wallet_applied`.
     */
    total_amount?: number;
    /**
     * Shipping across every merchant, included in `total_amount`.
     */
    shipping_total?: number;
    /**
     * One shipping line per merchant.
     */
    shipping_breakdown?: Array<MarketplaceShippingLine>;
    /**
     * How much of the shopper's marketplace wallet this checkout spends. Held while payment is pending and returned if the payment fails. Funded by the marketplace operator, so each merchant's net is unchanged.
     */
    wallet_applied?: number;
    /**
     * Total discount applied across the whole basket — the sum of every merchant's own promotion and gift card discounts plus any marketplace-wide promotion run by the operator.
     */
    discount_total?: number;
    /**
     * The portion of `discount_total` funded by the marketplace operator (for example a marketplace-wide promotion). The remainder is funded by individual merchants.
     */
    operator_funded_discount?: number;
    /**
     * Per-merchant breakdown of how discounts were applied.
     */
    discount_breakdown?: Array<{
        merchant_store_id?: string;
        /**
         * Discount funded by this merchant's own promotion.
         */
        merchant_discount?: number;
        /**
         * Amount redeemed from a gift card against this merchant's portion.
         */
        gift_card_amount?: number;
        /**
         * Discount applied to this merchant's portion that the marketplace operator funded (for example a marketplace-wide promotion).
         */
        operator_funded_discount?: number;
    }>;
    /**
     * Per-merchant gross, discount, commission, and net amounts for this order.
     */
    merchant_breakdown?: Array<MerchantBreakdownItem>;
};

