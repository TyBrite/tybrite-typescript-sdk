/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * `gallery` block.
 */
export type PostBlockGalleryData = {
    layout?: PostBlockGalleryData.layout;
    images?: Array<{
        url?: string;
        caption?: string;
        alt?: string;
    }>;
};
export namespace PostBlockGalleryData {
    export enum layout {
        _2_COL = '2-col',
        _3_COL = '3-col',
        _4_COL = '4-col',
    }
}

