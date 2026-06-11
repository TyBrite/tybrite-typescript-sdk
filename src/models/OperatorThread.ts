/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A customer↔merchant conversation as seen by a marketplace operator, stamped with the merchant it belongs to.
 */
export type OperatorThread = {
    id?: string;
    /**
     * The merchant this conversation belongs to.
     */
    merchant_store_id?: string;
    /**
     * Display name of the merchant.
     */
    merchant_store_name?: string | null;
    customer_id?: string | null;
    customer_name?: string | null;
    subject?: string;
    thread_type?: OperatorThread.thread_type;
    status?: OperatorThread.status;
    priority?: OperatorThread.priority;
    last_message_at?: string;
    last_message_by?: OperatorThread.last_message_by;
    unread_count_customer?: number;
    unread_count_store?: number;
    is_archived?: boolean;
    created_at?: string;
    updated_at?: string;
};
export namespace OperatorThread {
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

