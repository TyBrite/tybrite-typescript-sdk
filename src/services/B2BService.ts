/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { B2bInvoice } from '../models/B2bInvoice';
import type { B2bPurchaseOrder } from '../models/B2bPurchaseOrder';
import type { B2bQuote } from '../models/B2bQuote';
import type { B2bRfq } from '../models/B2bRfq';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class B2BService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List your requests for quote
     * Returns the buyer's own requests for quote (RFQs), newest first. Requires
     * the buyer's session token (x-auth-token or x-external-auth) alongside the API key.
     *
     * @returns any RFQs retrieved
     * @throws ApiError
     */
    public listRfqs({
        xAuthToken,
        xExternalAuth,
    }: {
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: Array<B2bRfq>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/rfqs',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * Request a quote
     * Creates a request for quote for the given line items. The supplier prices it
     * into a quote you can later accept. Requires an Idempotency-Key header.
     *
     * @returns any RFQ created
     * @throws ApiError
     */
    public createRfq({
        idempotencyKey,
        requestBody,
        xAuthToken,
        xExternalAuth,
    }: {
        /**
         * A unique key so a retried create is not duplicated.
         */
        idempotencyKey: string,
        requestBody: {
            /**
             * The items to be quoted.
             */
            line_items: Array<{
                variant_id: string;
                quantity: number;
                note?: string;
            }>;
            note?: string;
            expires_at?: string;
        },
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: B2bRfq;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/b2b/rfqs',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * Get one of your RFQs
     * @returns any RFQ retrieved
     * @throws ApiError
     */
    public getRfq({
        id,
        xAuthToken,
        xExternalAuth,
    }: {
        id: string,
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: B2bRfq;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/rfqs/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Get a quote addressed to you
     * @returns any Quote retrieved
     * @throws ApiError
     */
    public getQuote({
        id,
        xAuthToken,
        xExternalAuth,
    }: {
        id: string,
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: B2bQuote;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/quotes/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Accept a quote
     * Accepts a sent quote and creates a purchase order from it. The purchase order
     * awaits the supplier's confirmation before an invoice is issued.
     *
     * @returns any Quote accepted, purchase order created
     * @throws ApiError
     */
    public acceptQuote({
        id,
        xAuthToken,
        xExternalAuth,
    }: {
        id: string,
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: {
            quote_id?: string;
            purchase_order_id?: string;
            po_number?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/b2b/quotes/{id}/accept',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Reject a quote
     * @returns any Quote rejected
     * @throws ApiError
     */
    public rejectQuote({
        id,
        xAuthToken,
        xExternalAuth,
    }: {
        id: string,
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: {
            quote_id?: string;
            status?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/b2b/quotes/{id}/reject',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * List your purchase orders
     * @returns any Purchase orders retrieved
     * @throws ApiError
     */
    public listPurchaseOrders({
        xAuthToken,
        xExternalAuth,
    }: {
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: Array<B2bPurchaseOrder>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/purchase-orders',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * Get one of your purchase orders
     * @returns any Purchase order retrieved
     * @throws ApiError
     */
    public getPurchaseOrder({
        id,
        xAuthToken,
        xExternalAuth,
    }: {
        id: string,
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: B2bPurchaseOrder;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/purchase-orders/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * List your invoices
     * @returns any Invoices retrieved
     * @throws ApiError
     */
    public listInvoices({
        xAuthToken,
        xExternalAuth,
    }: {
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: Array<B2bInvoice>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/invoices',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
            },
        });
    }
    /**
     * Get one of your invoices
     * @returns any Invoice retrieved
     * @throws ApiError
     */
    public getInvoice({
        id,
        xAuthToken,
        xExternalAuth,
    }: {
        id: string,
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: B2bInvoice;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/b2b/invoices/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Pay an invoice
     * Records a payment against an invoice. Payments settle the outstanding balance
     * and never exceed it. Requires an Idempotency-Key header (the payment is keyed on
     * it, so a retry with the same key is safe).
     *
     * @returns any Payment recorded
     * @throws ApiError
     */
    public payInvoice({
        idempotencyKey,
        id,
        requestBody,
        xAuthToken,
        xExternalAuth,
    }: {
        /**
         * A unique key so a retried create is not duplicated.
         */
        idempotencyKey: string,
        id: string,
        requestBody: {
            /**
             * Payment amount (must not exceed the balance).
             */
            amount: number;
            payment_method?: string;
        },
        /**
         * Buyer session token (GC-native). Provide this or x-external-auth.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the buyer. Provide this or x-auth-token.
         */
        xExternalAuth?: string,
    }): CancelablePromise<{
        data?: {
            payment_id?: string;
            amount_paid?: number;
            invoice_status?: string;
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/b2b/invoices/{id}/pay',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                404: `Resource not found`,
            },
        });
    }
}
