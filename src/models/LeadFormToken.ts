/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LeadFormToken = {
    /**
     * Sent back unchanged as `form_token` on submit. A submission carrying a token that is not valid for this form, or that arrives within two seconds of the token being issued, is acknowledged and discarded.
     */
    form_token: string;
};

