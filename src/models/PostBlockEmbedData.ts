/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * `embed` block (YouTube, Vimeo, Instagram or X/Twitter).
 */
export type PostBlockEmbedData = {
    service?: string;
    /**
     * The URL the author pasted.
     */
    source?: string;
    /**
     * The player URL for an `iframe`.
     */
    embed?: string;
    width?: number;
    height?: number;
    caption?: string;
};

