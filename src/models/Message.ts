/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Message = {
    id?: string;
    message_content?: string;
    message_type?: Message.message_type;
    sender_type?: Message.sender_type;
    sender_id?: string;
    sender_name?: string;
    attachments?: Array<string>;
    metadata?: Record<string, any>;
    message_status?: Message.message_status;
    read_at?: string;
    created_at?: string;
    updated_at?: string;
};
export namespace Message {
    export enum message_type {
        TEXT = 'text',
        IMAGE = 'image',
        FILE = 'file',
    }
    export enum sender_type {
        CUSTOMER = 'customer',
        STORE = 'store',
        SYSTEM = 'system',
    }
    export enum message_status {
        SENT = 'sent',
        DELIVERED = 'delivered',
        READ = 'read',
    }
}

