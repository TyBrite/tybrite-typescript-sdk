/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A campaign created in the sandbox — a budget with a discount attached. It discounts an order
 * like a promotion but stops once `budget_spent` reaches `budget`.
 *
 */
export type SandboxCampaign = {
    id?: string;
    name?: string;
    type?: string;
    budget?: number;
    /**
     * Drawn down as sandbox orders apply the campaign.
     */
    budget_spent?: number;
    /**
     * Derived from `budget` and `budget_spent`.
     */
    budget_remaining?: number;
    discount_type?: SandboxCampaign.discount_type;
    discount_value?: number;
    /**
     * Which sales channel the campaign discounts.
     */
    applies_to?: SandboxCampaign.applies_to;
    start_date?: string | null;
    end_date?: string | null;
    status?: string;
    environment?: SandboxCampaign.environment;
};
export namespace SandboxCampaign {
    export enum discount_type {
        PERCENTAGE = 'percentage',
        FIXED_AMOUNT = 'fixed_amount',
    }
    /**
     * Which sales channel the campaign discounts.
     */
    export enum applies_to {
        ALL = 'all',
        ONLINE = 'online',
        POS = 'pos',
    }
    export enum environment {
        SANDBOX = 'sandbox',
    }
}

