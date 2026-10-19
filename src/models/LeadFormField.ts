/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LeadFormField = {
    /**
     * The key under which the answer is sent in `answers`.
     */
    name: string;
    label: string;
    /**
     * The input the field calls for. `select` takes one entry of `options`, `multiselect` an array of
     * entries, `boolean` and `consent` `true` or `false`, `date` a `YYYY-MM-DD` string, `phone` a phone
     * number in national or international form, and `number` a number. A `consent` field is a checkbox
     * the shopper must tick when `required` is true.
     *
     */
    type: LeadFormField.type;
    required: boolean;
    /**
     * The choices of a `select` or `multiselect` field.
     */
    options?: Array<any>;
    help_text?: string;
    placeholder?: string;
    /**
     * Limits the answer must meet. Only the limits the merchant set are present.
     */
    rules?: {
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        pattern?: string;
    };
};
export namespace LeadFormField {
    /**
     * The input the field calls for. `select` takes one entry of `options`, `multiselect` an array of
     * entries, `boolean` and `consent` `true` or `false`, `date` a `YYYY-MM-DD` string, `phone` a phone
     * number in national or international form, and `number` a number. A `consent` field is a checkbox
     * the shopper must tick when `required` is true.
     *
     */
    export enum type {
        TEXT = 'text',
        TEXTAREA = 'textarea',
        NUMBER = 'number',
        BOOLEAN = 'boolean',
        SELECT = 'select',
        MULTISELECT = 'multiselect',
        DATE = 'date',
        PHONE = 'phone',
        CONSENT = 'consent',
    }
}

