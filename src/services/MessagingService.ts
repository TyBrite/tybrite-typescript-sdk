/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { Thread } from '../models/Thread';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MessagingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List message threads
     * @returns any Success
     * @throws ApiError
     */
    public listThreads({
        customerId,
        fields,
    }: {
        customerId?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`
         * - `store_name`, `store_avatar`, `order_id`, `product_id`
         * - `subject`, `thread_type`, `status`, `priority`
         * - `last_message_at`, `last_message_by`, `unread_count_customer`, `unread_count_store`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        threads?: Array<Thread>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads',
            query: {
                'customer_id': customerId,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get thread details
     * @returns Thread Success
     * @throws ApiError
     */
    public getThread({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`
         * - `store_name`, `store_avatar`, `order_id`, `product_id`
         * - `subject`, `thread_type`, `status`, `priority`
         * - `last_message_at`, `last_message_by`, `unread_count_customer`, `unread_count_store`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<Thread> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get messages in a thread
     * @returns any Success
     * @throws ApiError
     */
    public getThreadMessages({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `message_content`, `message_type`, `sender_type`, `sender_id`
         * - `sender_name`, `attachments`, `metadata`, `message_status`, `read_at`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        messages?: Array<Message>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads/{id}/messages',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Send message to thread
     * Add a message to an existing thread
     * @returns any Message sent
     * @throws ApiError
     */
    public sendMessage({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            message: string;
        },
    }): CancelablePromise<{
        id?: string;
        message?: string;
        created_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/threads/{id}/messages',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create new conversation
     * Start a new message conversation
     * @returns any Conversation created
     * @throws ApiError
     */
    public createConversation({
        requestBody,
    }: {
        requestBody: {
            customer_id: string;
            customer_name: string;
            customer_email: string;
            subject: string;
            message: string;
        },
    }): CancelablePromise<{
        id?: string;
        customer_id?: string;
        subject?: string;
        created_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/conversations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
