/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LeadFormSubmission = {
    submitted: boolean;
    /**
     * True when the signup is waiting for the shopper to confirm from an email. A form that asks for confirmation answers true for every address, including one that is already subscribed (which is sent no email), so the reply never reveals who is on the list.
     */
    pending_confirmation: boolean;
    /**
     * The form's success message, for display.
     */
    message: string;
    submission_id: string;
};

