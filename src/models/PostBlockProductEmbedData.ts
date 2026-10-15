/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * `productEmbed` block.
 */
export type PostBlockProductEmbedData = {
    productId?: string;
    productName?: string;
    productImage?: string | null;
    productPrice?: number;
    displayType?: PostBlockProductEmbedData.displayType;
};
export namespace PostBlockProductEmbedData {
    export enum displayType {
        CARD = 'card',
        INLINE = 'inline',
        MINIMAL = 'minimal',
    }
}

