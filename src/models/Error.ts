/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Error = {
    error: {
        code: string;
        message: string;
        details?: string;
        /**
         * Additional guidance on how to resolve the error.
         */
        hint?: string;
        /**
         * Current stock level (present on insufficient_stock errors).
         */
        available_stock?: number;
        /**
         * Quantity already in cart (present on insufficient_stock errors).
         */
        current_cart_quantity?: number;
        /**
         * Rate limit ceiling (present on rate_limit_exceeded errors).
         */
        limit?: number;
        /**
         * Requests remaining in the current window (present on rate_limit_exceeded errors).
         */
        remaining?: number;
        /**
         * Unix timestamp when the rate limit window resets (present on rate_limit_exceeded errors).
         */
        reset?: number;
    };
};

