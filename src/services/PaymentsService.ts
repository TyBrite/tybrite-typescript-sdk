/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentInitializeResponse } from '../models/PaymentInitializeResponse';
import type { PaymentMethod } from '../models/PaymentMethod';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PaymentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get available payment methods
     * Retrieve all configured payment methods for the store, including their supported currencies,
     * integration types, and environment status.
     *
     * **Supported Providers:**
     * - **Cash**: Manual payment method
     * - **Bank Transfer**: Manual payment method
     * - **Stripe**: Card payments with redirect to Stripe Checkout
     * - **Paystack**: Card payments with popup integration (Africa-focused)
     * - **M-Pesa**: Mobile money STK Push (Kenya)
     * - **Airtel Money**: Mobile money collection (Kenya, Uganda, Tanzania, Rwanda)
     *
     * **Key Type Support:**
     * - ✅ Secret keys (full access)
     * - ✅ Publishable keys (read-only)
     *
     * @returns any Successfully retrieved payment methods
     * @throws ApiError
     */
    public getPaymentMethods({
        fields,
    }: {
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `provider`, `display_name`, `type`
         * - `supported_currencies`
         * - `environment`, `is_configured`
         *
         */
        fields?: string,
    }): CancelablePromise<{
        methods?: Array<PaymentMethod>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/payments/methods',
            query: {
                'fields': fields,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Initialize payment
     * Initialize a payment transaction with the specified provider. Returns provider-specific
     * data needed to complete the payment flow.
     *
     * **Provider-Specific Flows:**
     *
     * **Stripe (redirect):**
     * 1. Initialize payment with amount, currency, email
     * 2. Redirect customer to `checkout_url`
     * 3. Customer completes payment on Stripe
     * 4. Stripe redirects to success/cancel URL
     * 5. Verify payment status with `/v1/payments/verify`
     *
     * **Paystack (popup):**
     * 1. Initialize payment with amount, currency, email
     * 2. Use returned `public_key` and `reference` to open Paystack popup
     * 3. Customer completes payment in popup
     * 4. Verify payment status with `/v1/payments/verify`
     *
     * **M-Pesa (STK Push):**
     * 1. Initialize payment with amount and phone (254XXXXXXXXX format)
     * 2. Customer receives STK Push prompt on their phone
     * 3. Customer enters M-Pesa PIN
     * 4. Verify payment status with `/v1/payments/verify`
     *
     * **Airtel Money (Collection):**
     * 1. Initialize payment with amount, phone, and country code
     * 2. Customer receives payment prompt
     * 3. Customer authorizes payment
     * 4. Verify payment status with `/v1/payments/verify`
     *
     * **Rate Limiting:**
     * - Additional 100 requests/hour limit for payment initialization
     * - Separate from global API rate limits
     *
     * **Key Type Support:**
     * - ✅ Secret keys (full access)
     * - ❌ Publishable keys (forbidden - returns 403)
     *
     * @returns any Payment initialized successfully
     * @throws ApiError
     */
    public initializePayment({
        requestBody,
    }: {
        requestBody: {
            /**
             * Payment provider to use
             */
            provider: 'stripe' | 'paystack' | 'mpesa' | 'airtel';
            /**
             * Payment amount (must be greater than 0)
             */
            amount: number;
            /**
             * Currency code (ISO 4217). Required for Stripe and Paystack.
             * - Stripe: Defaults to store's default currency
             * - Paystack: Must be one of NGN, GHS, ZAR, KES, USD
             * - M-Pesa: Always KES (ignored)
             * - Airtel: Determined by country code
             *
             */
            currency?: string;
            /**
             * Customer email (required for Stripe and Paystack)
             */
            email?: string;
            /**
             * Customer phone number (required for M-Pesa and Airtel Money)
             * - M-Pesa: Format 254XXXXXXXXX (Kenya)
             * - Airtel: Format {country_prefix}XXXXXXXXX (e.g., 254XXXXXXXXX for Kenya)
             *
             */
            phone?: string;
            /**
             * Country code for Airtel Money (required for Airtel)
             * Supported: KE (Kenya), UG (Uganda), TZ (Tanzania), RW (Rwanda)
             *
             */
            country?: string;
            /**
             * Optional order ID to link payment to an order
             */
            order_id?: string;
            /**
             * Optional idempotency key to prevent duplicate payments
             */
            idempotency_key?: string;
            /**
             * Optional metadata to attach to the payment
             */
            metadata?: Record<string, string>;
            /**
             * Redirect URL after successful payment (Stripe only)
             */
            success_url?: string;
            /**
             * Redirect URL after cancelled payment (Stripe only)
             */
            cancel_url?: string;
            /**
             * Webhook callback URL (Paystack only)
             */
            callback_url?: string;
        },
    }): CancelablePromise<(PaymentInitializeResponse | {
        success?: boolean;
        provider?: string;
        type?: string;
        reference?: string;
        public_key?: string;
        email?: string;
        /**
         * Amount in kobo (smallest currency unit)
         */
        amount?: number;
        currency?: string;
        environment?: string;
    } | {
        success?: boolean;
        provider?: string;
        type?: string;
        reference?: string;
        checkout_request_id?: string;
        merchant_request_id?: string;
        customer_message?: string;
        environment?: string;
    })> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/payments/initialize',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request (missing required fields, invalid provider, unsupported currency, etc.)`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Verify payment status
     * Verify the status of a payment transaction using the payment reference.
     * This endpoint queries the payment provider's API to get the current status.
     *
     * **⚠️ SECRET KEY REQUIRED**
     *
     * This endpoint requires a secret key (tybrite_sk_*). Publishable keys will return 403 Forbidden.
     *
     * **Why Secret Key?** Payment verification accesses sensitive transaction data and provider APIs
     * that should only be called from secure server-side environments. This prevents unauthorized
     * access to payment status information.
     *
     * **Provider-Specific Verification:**
     *
     * **Stripe:**
     * - Queries Stripe Checkout Session API
     * - Returns payment status: `pending`, `paid`, `failed`, `cancelled`
     * - Includes payment intent details
     *
     * **Paystack:**
     * - Queries Paystack Transaction Verification API
     * - Returns payment status and transaction details
     * - Includes gateway response and fees
     *
     * **M-Pesa:**
     * - Queries M-Pesa STK Push Query API
     * - Returns transaction status from Safaricom
     * - Includes M-Pesa receipt number if successful
     *
     * **Airtel Money:**
     * - Queries Airtel Money Transaction Status API
     * - Returns transaction status and details
     * - Includes Airtel transaction ID if successful
     *
     * **Note:** Despite using POST method (for request body), this is a read operation that
     * queries external payment provider APIs.
     *
     * @returns any Payment verification successful
     * @throws ApiError
     */
    public verifyPayment({
        requestBody,
    }: {
        requestBody: {
            /**
             * Payment provider used for initialization
             */
            provider: 'stripe' | 'paystack' | 'mpesa' | 'airtel';
            /**
             * Payment reference returned from initialization
             */
            reference: string;
        },
    }): CancelablePromise<{
        success?: boolean;
        provider?: string;
        reference?: string;
        status?: 'pending' | 'paid' | 'failed' | 'cancelled';
        amount?: number;
        currency?: string;
        payment_method?: string;
        /**
         * Provider-specific transaction ID
         */
        provider_reference?: string;
        paid_at?: string | null;
        /**
         * Provider-specific metadata
         */
        metadata?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/payments/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request (missing required fields, invalid provider)`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Rate limit exceeded`,
                500: `Internal server error`,
            },
        });
    }
}
