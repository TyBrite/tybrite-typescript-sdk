/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GiftCard = {
    id?: string;
    code?: string;
    balance?: number;
    initial_balance?: number;
    currency?: string;
    status?: GiftCard.status;
    expiry_date?: string;
    customer_id?: string;
    issued_date?: string;
    last_used_date?: string;
    maximum_usage_percentage?: number;
    redemption_count?: number;
    created_at?: string;
    updated_at?: string;
};
export namespace GiftCard {
    export enum status {
        ACTIVE = 'active',
        FULL_REDEEMED = 'full_redeemed',
        INACTIVE = 'inactive',
    }
}

