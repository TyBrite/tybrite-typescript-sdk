/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A dynamic-pricing rule created in the sandbox. Only a test key resolves it, so it adjusts prices
 * on `/v1/prices*` for your sandbox traffic and never for a real shopper.
 *
 */
export type SandboxPricingRule = {
    id?: string;
    name?: string;
    rule_type?: SandboxPricingRule.rule_type;
    discount_value?: number;
    applies_to?: SandboxPricingRule.applies_to;
    /**
     * The categories, products or collections the rule is scoped to. Empty when `applies_to` is `all`.
     */
    target_ids?: Array<string>;
    /**
     * Lower runs first when several rules match.
     */
    priority?: number;
    start_date?: string | null;
    end_date?: string | null;
    is_active?: boolean;
    environment?: SandboxPricingRule.environment;
};
export namespace SandboxPricingRule {
    export enum rule_type {
        PERCENTAGE = 'percentage',
        FIXED_AMOUNT = 'fixed_amount',
        FIXED_PRICE = 'fixed_price',
        MARKUP = 'markup',
    }
    export enum applies_to {
        ALL = 'all',
        CATEGORY = 'category',
        PRODUCT = 'product',
        COLLECTION = 'collection',
    }
    export enum environment {
        SANDBOX = 'sandbox',
    }
}

