/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * `video` block.
 */
export type PostBlockVideoData = {
    url?: string;
    caption?: string;
    /**
     * `upload` is a video file for a `video` element; `embed` is a player URL for an `iframe`.
     */
    type?: PostBlockVideoData.type;
    embedCode?: string;
};
export namespace PostBlockVideoData {
    /**
     * `upload` is a video file for a `video` element; `embed` is a player URL for an `iframe`.
     */
    export enum type {
        UPLOAD = 'upload',
        EMBED = 'embed',
    }
}

