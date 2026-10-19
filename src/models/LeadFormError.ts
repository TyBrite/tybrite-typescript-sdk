/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LeadFormError = {
    error: {
        code: string;
        /**
         * A sentence suitable for showing to the shopper.
         */
        message: string;
        details?: {
            /**
             * The answer the error refers to: `email`, `answers`, `captcha_token`, `consents.email`, `phone`, or the `name` of a form field.
             */
            field?: string;
            /**
             * Why the submission was refused.
             *
             * - `invalid_email`: the address is missing or malformed.
             * - `invalid_value`: an answer has the wrong type, is outside the field's rules or is not one of the listed options.
             * - `invalid_phone`: a phone answer cannot be read as a phone number.
             * - `required`: a required answer is missing.
             * - `consent_required`: a required consent is unchecked.
             * - `captcha_required`: the form asks for a challenge token and none was sent.
             * - `captcha_failed`: the challenge token did not pass verification.
             * - `plan_required`: the store's plan does not include lead forms (status `403`).
             *
             */
            reason?: LeadFormError.reason;
        };
    };
};
export namespace LeadFormError {
    /**
     * Why the submission was refused.
     *
     * - `invalid_email`: the address is missing or malformed.
     * - `invalid_value`: an answer has the wrong type, is outside the field's rules or is not one of the listed options.
     * - `invalid_phone`: a phone answer cannot be read as a phone number.
     * - `required`: a required answer is missing.
     * - `consent_required`: a required consent is unchecked.
     * - `captcha_required`: the form asks for a challenge token and none was sent.
     * - `captcha_failed`: the challenge token did not pass verification.
     * - `plan_required`: the store's plan does not include lead forms (status `403`).
     *
     */
    export enum reason {
        INVALID_EMAIL = 'invalid_email',
        INVALID_VALUE = 'invalid_value',
        INVALID_PHONE = 'invalid_phone',
        REQUIRED = 'required',
        CONSENT_REQUIRED = 'consent_required',
        CAPTCHA_REQUIRED = 'captcha_required',
        CAPTCHA_FAILED = 'captcha_failed',
        PLAN_REQUIRED = 'plan_required',
    }
}

