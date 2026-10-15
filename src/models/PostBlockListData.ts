/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * `list` block.
 */
export type PostBlockListData = {
    style?: PostBlockListData.style;
    /**
     * Plain strings (older posts) or objects with `content` (inline HTML), `items` (a nested list of the same shape) and `meta`.
     */
    items?: Array<(string | {
        content?: string;
        items?: Array<Record<string, any>>;
        meta?: Record<string, any>;
    })>;
};
export namespace PostBlockListData {
    export enum style {
        ORDERED = 'ordered',
        UNORDERED = 'unordered',
    }
}

