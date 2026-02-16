/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductCollection = {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    collection_type?: ProductCollection.collection_type;
    is_active?: boolean;
    show_on_homepage?: boolean;
    display_priority?: number;
    created_at?: string;
    updated_at?: string;
};
export namespace ProductCollection {
    export enum collection_type {
        MANUAL = 'manual',
        AUTOMATED = 'automated',
        SMART = 'smart',
    }
}

