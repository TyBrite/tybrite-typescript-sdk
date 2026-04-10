/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Thread = {
    id?: string;
    customer_id?: string | null;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string | null;
    store_name?: string;
    store_avatar?: string | null;
    order_id?: string | null;
    product_id?: string | null;
    subject?: string;
    thread_type?: Thread.thread_type;
    status?: Thread.status;
    priority?: Thread.priority;
    last_message_at?: string;
    last_message_by?: Thread.last_message_by;
    unread_count_customer?: number;
    unread_count_store?: number;
    is_archived?: boolean;
    is_muted?: boolean;
    is_pinned?: boolean;
    created_at?: string;
    updated_at?: string;
};
export namespace Thread {
    export enum thread_type {
        GENERAL = 'general',
        ORDER_INQUIRY = 'order_inquiry',
        PRODUCT_INQUIRY = 'product_inquiry',
        SUPPORT = 'support',
        COMPLAINT = 'complaint',
        DELIVERY = 'delivery',
        RETURN = 'return',
        REFUND = 'refund',
        TECHNICAL = 'technical',
    }
    export enum status {
        ACTIVE = 'active',
        RESOLVED = 'resolved',
        CLOSED = 'closed',
        ESCALATED = 'escalated',
        PENDING = 'pending',
    }
    export enum priority {
        LOW = 'low',
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

