/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One merchant-defined field and its value on a record. Definitions are authored by the merchant (or by
 * their platform operator), so the set varies per store and per entity.
 *
 */
export type CustomFieldValue = {
    /**
     * The machine name. Stable across edits to the label, so this is the one to key off in code.
     */
    field_name?: string;
    /**
     * What the merchant calls this field. The string to display.
     */
    field_label?: string;
    /**
     * The shape of `value`: `multiselect` is an array of strings; `json`, `dimensions` and `weight` are
     * objects; the rest are scalars, and a `number` arrives as a number rather than as text.
     *
     */
    field_type?: CustomFieldValue.field_type;
    /**
     * The unit a numeric or measurement field is expressed in, when the merchant set one.
     */
    unit_type?: string | null;
    /**
     * The stored value, in the shape implied by `field_type`. Null when the field is defined but has no
     * value on this record — which is distinct from the field not existing.
     *
     */
    value?: any;
};
export namespace CustomFieldValue {
    /**
     * The shape of `value`: `multiselect` is an array of strings; `json`, `dimensions` and `weight` are
     * objects; the rest are scalars, and a `number` arrives as a number rather than as text.
     *
     */
    export enum field_type {
        TEXT = 'text',
        TEXTAREA = 'textarea',
        NUMBER = 'number',
        BOOLEAN = 'boolean',
        SELECT = 'select',
        MULTISELECT = 'multiselect',
        DATE = 'date',
        JSON = 'json',
        DIMENSIONS = 'dimensions',
        WEIGHT = 'weight',
    }
}

