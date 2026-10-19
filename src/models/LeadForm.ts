/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeadFormField } from './LeadFormField';
export type LeadForm = {
    slug: string;
    title: string;
    description?: string | null;
    submit_label: string;
    success_message: string;
    /**
     * When true, a shopper's signup is held until they confirm it from an email.
     */
    double_opt_in: boolean;
    /**
     * The questions beyond the email address, in display order. The email address is always collected and is not listed.
     */
    fields: Array<LeadFormField>;
    /**
     * The consent checkboxes the form asks for, each with the wording to display. A key is absent when the form does not ask for that consent.
     */
    consents: {
        email?: {
            text?: string;
        };
        sms?: {
            text?: string;
        };
    };
    captcha: {
        /**
         * True when every submission must carry a `captcha_token`.
         */
        required: boolean;
        /**
         * True when the form asks for a challenge only while it is receiving unusually heavy traffic. The submission is then refused with reason `captcha_required` and can be resent with a token.
         */
        on_demand: boolean;
        /**
         * The public key for rendering the challenge widget. Present when the form can ask for a challenge.
         */
        site_key?: string;
    };
    /**
     * The name of a field the storefront renders hidden. A submission that fills it is acknowledged and discarded.
     */
    hp_field: string;
    /**
     * Where the merchant wants the shopper sent after a successful signup. Present only when set.
     */
    redirect_url?: string;
    /**
     * Present when `captcha.required` is true. Sent back unchanged on submit; a submission that arrives within two seconds of it being issued is acknowledged and discarded.
     */
    form_token?: string;
};

