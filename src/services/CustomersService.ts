/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from '../models/Customer';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CustomersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create customer
     * Requires secret key
     * @returns Customer Customer created
     * @throws ApiError
     */
    public createCustomer({
        requestBody,
    }: {
        requestBody: {
            email: string;
            /**
             * Customer full name
             */
            name?: string;
            phone?: string;
            address?: string;
            status?: 'active' | 'inactive';
            join_date?: string;
        },
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/customers',
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
     * Get customer details
     * @returns Customer Success
     * @throws ApiError
     */
    public getCustomer({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `name`, `email`, `phone`, `address`, `status`
         * - `join_date`, `total_purchases`, `last_purchase`
         * - `created_at`, `updated_at`
         * - `store_metrics`, `store_metrics.*`
         *
         */
        fields?: string,
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}',
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
     * Update customer
     * Partially update customer information. Only provided fields will be updated. Requires secret key.
     * @returns Customer Customer updated successfully
     * @throws ApiError
     */
    public updateCustomer({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            email?: string;
            phone?: string;
            name?: string;
            address?: string;
            status?: 'active' | 'inactive';
        },
    }): CancelablePromise<Customer> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/customers/{id}',
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
     * Get customer gift cards
     * Retrieve gift cards belonging to a customer
     * @returns any Success
     * @throws ApiError
     */
    public getCustomerGiftCards({
        id,
        fields,
    }: {
        id: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `code`, `balance`, `initial_balance`, `currency`, `status`
         * - `expiry_date`, `customer_id`, `issued_date`, `last_used_date`
         * - `created_at`, `updated_at`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        gift_cards?: Array<Record<string, any>>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/customers/{id}/gift-cards',
            path: {
                'id': id,
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
}
