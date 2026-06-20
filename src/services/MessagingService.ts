/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { MessagingRealtimeToken } from '../models/MessagingRealtimeToken';
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
        xAuthToken,
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
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
            },
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
                403: `Insufficient permissions - operation requires secret key`,
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
        xAuthToken,
        id,
        fields,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
            },
            query: {
                'fields': fields,
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
    /**
     * Update thread
     * Update thread status, priority, or toggle the archived/muted/pinned state.
     * Requires a secret key.
     *
     * @returns any Thread updated successfully
     * @throws ApiError
     */
    public updateThread({
        xAuthToken,
        id,
        requestBody,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
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
        xAuthToken,
        id,
        limit = 50,
        cursor,
        order = 'asc',
        fields,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
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
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Send a message to a thread
     * Append a new message to an existing conversation thread on behalf of the
     * signed-in shopper. The store sees it in their admin inbox and can reply;
     * the reply streams back to the shopper over the realtime channel
     * (see `getMessagingRealtimeToken`).
     *
     * **Auth:** API key in `Authorization: Bearer` (a **publishable** key is fine —
     * this is a browser-origin storefront write) **plus** the shopper's customer
     * session token in `x-auth-token`. The token must own the thread, otherwise
     * the request returns `403`.
     *
     * **Body field:** the message text goes in `message`. (Note the sibling
     * `editMessage` endpoint uses `message_content` instead.)
     *
     * **SDK**
     *
     * @returns any Message sent
     * @throws ApiError
     */
    public sendMessage({
        xAuthToken,
        id,
        requestBody,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
        id: string,
        requestBody: {
            message: string;
        },
    }): CancelablePromise<{
        message?: {
            id?: string;
            created_at?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/threads/{id}/messages',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
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
     * Start a new conversation
     * Open a new message thread with the store and post the shopper's first
     * message in one call. Returns the created thread (with its `id`), which you
     * then use to send follow-ups (`sendMessage`) and read replies.
     *
     * **Auth:** API key in `Authorization: Bearer` (a **publishable** key is fine —
     * this is a browser-origin storefront write) **plus** the shopper's customer
     * session token in `x-auth-token` when you pass `customer_id` (the token must
     * own that customer, otherwise `403`).
     *
     * **`thread_type`** classifies the inquiry: `general`, `order_inquiry`,
     * `product_inquiry`, `support`, `complaint`, `delivery`, `return`, `refund`,
     * or `technical`.
     *
     * **SDK**
     *
     * @returns any Conversation created
     * @throws ApiError
     */
    public createConversation({
        requestBody,
        xAuthToken,
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
        /**
         * Customer session access_token. Required when body.customer_id is supplied so the gateway can prove the caller owns that customer record.
         */
        xAuthToken?: string,
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
            headers: {
                'x-auth-token': xAuthToken,
            },
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
        xAuthToken,
        id,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
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
    /**
     * Edit message
     * Edits the content of an existing message. Sets `is_edited = true` and records `edited_at`.
     * Cannot edit a soft-deleted message. Requires a secret key.
     *
     * @returns any Message updated
     * @throws ApiError
     */
    public editMessage({
        xAuthToken,
        id,
        requestBody,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
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
        xAuthToken,
        id,
    }: {
        /**
         * Customer session access_token. Required to prove ownership of the thread/message being accessed.
         */
        xAuthToken: string,
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
            headers: {
                'x-auth-token': xAuthToken,
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
    /**
     * Get realtime connection details for a thread
     * Returns the connection details a storefront needs to receive a thread's new messages in
     * realtime, without polling. Use these details with a realtime client to subscribe to the
     * conversation and have incoming messages pushed to you as they are sent.
     *
     * Two response shapes are returned depending on how the request is authenticated, indicated by
     * the `mode` field:
     *
     * - **`direct`** — returned for a customer signed in through Galactic Core
     * (supply their session token via `x-auth-token`). The response includes a short-lived
     * `token` the storefront uses to subscribe directly; the customer only ever receives updates
     * for their own thread.
     * - **`broadcast`** — returned for customers authenticated with your own identity provider
     * (supply the signed identity assertion via `x-external-auth`), for server-side integrations,
     * and for marketplace operators. Subscribe to the named `channel` to receive the thread's
     * message events.
     *
     * In both cases, pair `realtime_url` + `realtime_key` + `channel` (and `token` when
     * present) with the `subscribeToThread` helper in the SDK to start receiving messages live.
     *
     * @returns MessagingRealtimeToken Realtime connection details
     * @throws ApiError
     */
    public getMessagingRealtimeToken({
        requestBody,
        xAuthToken,
        xExternalAuth,
    }: {
        requestBody: {
            /**
             * The conversation to receive realtime messages for.
             */
            thread_id: string;
        },
        /**
         * Session token of a customer signed in through Galactic Core. Supply this to receive the
         * `direct` connection details for that customer's own thread.
         *
         */
        xAuthToken?: string,
        /**
         * Signed identity assertion for a customer authenticated with your own identity provider.
         * Supply this (instead of `x-auth-token`) to receive the `broadcast` connection details.
         *
         */
        xExternalAuth?: string,
    }): CancelablePromise<MessagingRealtimeToken> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/messaging/realtime-token',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
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
}
