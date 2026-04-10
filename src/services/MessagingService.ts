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
     * Returns messaging threads filtered by customer. Supports cursor-based pagination, field
     * filtering, and server-side status/priority/archived/unread filtering. Pinned threads are
     * returned first in the result set.
     *
     * @returns any Success
     * @throws ApiError
     */
    public listThreads({
        customerId,
        status,
        priority,
        threadType,
        archived,
        unread,
        limit = 50,
        cursor,
        fields,
    }: {
        /**
         * Customer UUID to filter threads by
         */
        customerId: string,
        /**
         * Filter threads by status
         */
        status?: 'active' | 'resolved' | 'closed' | 'escalated' | 'pending',
        /**
         * Filter by priority level
         */
        priority?: 'urgent' | 'high' | 'normal' | 'low',
        /**
         * Filter by thread type
         */
        threadType?: 'general' | 'order_inquiry' | 'product_inquiry' | 'support' | 'complaint' | 'delivery' | 'return' | 'refund' | 'technical',
        /**
         * true = archived threads only, false = non-archived only, omit = no filter
         */
        archived?: boolean,
        /**
         * Set to true to return only threads with unread_count_store > 0
         */
        unread?: boolean,
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded last_message_at value)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`
         * - `store_name`, `store_avatar`, `order_id`, `product_id`
         * - `subject`, `thread_type`, `status`, `priority`
         * - `last_message_at`, `last_message_by`, `unread_count_customer`, `unread_count_store`
         * - `is_archived`, `is_muted`, `is_pinned`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        threads?: Array<Thread>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads',
            query: {
                'customer_id': customerId,
                'status': status,
                'priority': priority,
                'thread_type': threadType,
                'archived': archived,
                'unread': unread,
                'limit': limit,
                'cursor': cursor,
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
         * - `is_archived`, `is_muted`, `is_pinned`
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
     * Update thread
     * Update thread status, priority, or toggle the archived/muted/pinned state.
     * Requires a secret key.
     *
     * @returns any Thread updated successfully
     * @throws ApiError
     */
    public updateThread({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            status?: 'active' | 'resolved' | 'closed' | 'escalated' | 'pending';
            priority?: 'urgent' | 'high' | 'normal' | 'low';
            /**
             * Set to true to archive, false to unarchive
             */
            archived?: boolean;
            /**
             * Set to true to mute, false to unmute
             */
            muted?: boolean;
            /**
             * Set to true to pin, false to unpin
             */
            pinned?: boolean;
        },
    }): CancelablePromise<{
        thread?: {
            id?: string;
            status?: string;
            priority?: string;
            is_archived?: boolean;
            is_muted?: boolean;
            is_pinned?: boolean;
            updated_at?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/messaging/threads/{id}',
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
     * Get messages in a thread
     * Returns messages in a thread. Soft-deleted messages are excluded by default.
     * Supports cursor-based pagination and sort order (default: oldest first).
     *
     * @returns any Success
     * @throws ApiError
     */
    public getThreadMessages({
        id,
        limit = 50,
        cursor,
        order = 'asc',
        fields,
    }: {
        id: string,
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded created_at value)
         */
        cursor?: string,
        /**
         * Sort order — asc (oldest first, default) or desc (newest first)
         */
        order?: 'asc' | 'desc',
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `message_content`, `message_type`, `sender_type`, `sender_id`
         * - `sender_name`, `attachments`, `metadata`, `message_status`, `read_at`
         * - `is_edited`, `is_deleted`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        messages?: Array<Message>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads/{id}/messages',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
                'cursor': cursor,
                'order': order,
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
     * Start a new message thread with an initial customer message. Requires a secret key.
     * @returns any Conversation created
     * @throws ApiError
     */
    public createConversation({
        requestBody,
    }: {
        requestBody: {
            /**
             * Optional — links thread to an existing customer record
             */
            customer_id?: string;
            customer_name: string;
            customer_email: string;
            customer_phone?: string;
            subject: string;
            message: string;
            order_id?: string;
            product_id?: string;
            priority?: 'urgent' | 'high' | 'normal' | 'low';
            thread_type?: 'general' | 'order_inquiry' | 'product_inquiry' | 'support' | 'complaint' | 'delivery' | 'return' | 'refund' | 'technical';
        },
    }): CancelablePromise<{
        thread?: {
            id?: string;
            subject?: string;
            status?: string;
            priority?: string;
        };
        message?: {
            id?: string;
            created_at?: string;
        };
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
    /**
     * Mark thread as read
     * Resets `unread_count_store` to 0 and marks all customer messages in the thread as `read`.
     * Requires a secret key.
     *
     * @returns any Thread marked as read
     * @throws ApiError
     */
    public markThreadRead({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        success?: boolean;
        thread_id?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/threads/{id}/read',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get total unread count
     * Returns the aggregate unread message count across all non-archived threads for the authenticated store.
     * @returns any Success
     * @throws ApiError
     */
    public getThreadUnreadCount(): CancelablePromise<{
        /**
         * Total number of unread messages across all non-archived threads
         */
        unread_count?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/messaging/threads/unread-count',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Edit message
     * Edits the content of an existing message. Sets `is_edited = true` and records `edited_at`.
     * Cannot edit a soft-deleted message. Requires a secret key.
     *
     * @returns any Message updated
     * @throws ApiError
     */
    public editMessage({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: {
            message_content: string;
        },
    }): CancelablePromise<{
        message?: {
            id?: string;
            message_content?: string;
            is_edited?: boolean;
            edited_at?: string;
            updated_at?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/messaging/messages/{id}',
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
     * Delete message
     * Deletes a message. Requires a secret key.
     *
     * @returns any Message soft-deleted
     * @throws ApiError
     */
    public deleteMessage({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        success?: boolean;
        message_id?: string;
        deleted_at?: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/messaging/messages/{id}',
            path: {
                'id': id,
            },
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
}
