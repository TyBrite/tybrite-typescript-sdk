/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Error = {
    error: {
        code: string;
        message: string;
        /**
         * Further detail about the error: a sentence, or for some errors an object (for example the `missing` list of `billing_location_required` or the `item_index` and `field_name` of `line_field_required`).
         */
        details?: (string | Record<string, any>);
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
         * Rate limit ceiling (present on rate_limited / quota_exceeded errors).
         */
        limit?: number;
        /**
         * Requests remaining in the current window (present on rate_limited / quota_exceeded errors).
         */
        remaining?: number;
        /**
         * Unix timestamp when the rate limit / quota window resets (present on rate_limited / quota_exceeded errors).
         */
        reset?: number;
    };
};

