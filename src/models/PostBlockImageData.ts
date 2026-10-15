/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * `image` block.
 */
export type PostBlockImageData = {
    url?: string;
    caption?: string;
    alt?: string;
    /**
     * Display width as a share of the column, from one third (`small`) to the full width.
     */
    size?: PostBlockImageData.size;
};
export namespace PostBlockImageData {
    /**
     * Display width as a share of the column, from one third (`small`) to the full width.
     */
    export enum size {
        SMALL = 'small',
        MEDIUM = 'medium',
        LARGE = 'large',
        FULL = 'full',
    }
}

