/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Thread = {
    id?: string;
    customer_id?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    store_name?: string;
    store_avatar?: string;
    order_id?: string;
    product_id?: string;
    subject?: string;
    thread_type?: string;
    status?: Thread.status;
    priority?: Thread.priority;
    last_message_at?: string;
    last_message_by?: Thread.last_message_by;
    unread_count_customer?: number;
    unread_count_store?: number;
    created_at?: string;
    updated_at?: string;
};
export namespace Thread {
    export enum status {
        ACTIVE = 'active',
        CLOSED = 'closed',
        ARCHIVED = 'archived',
    }
    export enum priority {
        NORMAL = 'normal',
        HIGH = 'high',
        URGENT = 'urgent',
    }
    export enum last_message_by {
        CUSTOMER = 'customer',
        STORE = 'store',
        SYSTEM = 'system',
    }
}

