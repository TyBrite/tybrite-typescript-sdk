/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LeadFormSubmission = {
    submitted: boolean;
    /**
     * True when the signup is waiting for the shopper to confirm from an email.
     */
    pending_confirmation: boolean;
    /**
     * The form's success message, for display.
     */
    message: string;
    submission_id: string;
};

