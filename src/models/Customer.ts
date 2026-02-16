/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: Customer.status;
    join_date?: string;
    total_purchases?: number;
    last_purchase?: string;
    created_at?: string;
    updated_at?: string;
    store_metrics?: {
        total_purchases?: number;
        total_spent?: number;
        first_purchase_date?: string;
        last_purchase_date?: string;
        status?: string;
        preferred_store?: string;
    };
};
export namespace Customer {
    export enum status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
    }
}

