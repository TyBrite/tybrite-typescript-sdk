/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostBlockEmbedData } from './PostBlockEmbedData';
import type { PostBlockGalleryData } from './PostBlockGalleryData';
import type { PostBlockHeaderData } from './PostBlockHeaderData';
import type { PostBlockImageData } from './PostBlockImageData';
import type { PostBlockListData } from './PostBlockListData';
import type { PostBlockProductEmbedData } from './PostBlockProductEmbedData';
import type { PostBlockQuoteData } from './PostBlockQuoteData';
import type { PostBlockTableData } from './PostBlockTableData';
import type { PostBlockTextData } from './PostBlockTextData';
import type { PostBlockVideoData } from './PostBlockVideoData';
import type { PostBlockWarningData } from './PostBlockWarningData';
export type PostContentBlock = {
    /**
     * Identifier of the block within the document. Present on blocks written by the post editor and used as the `block_id` of a product embedded beside it.
     */
    id?: string;
    /**
     * Block type. See `PostContent` for the types and their `data` fields.
     */
    type: string;
    /**
     * Block payload, shaped by `type`. Fields not listed for a type are ignored; a block without `data` is treated as empty.
     */
    data: (PostBlockTextData | PostBlockHeaderData | PostBlockListData | PostBlockQuoteData | PostBlockTableData | PostBlockWarningData | PostBlockImageData | PostBlockGalleryData | PostBlockVideoData | PostBlockEmbedData | PostBlockProductEmbedData | Record<string, any>);
};

