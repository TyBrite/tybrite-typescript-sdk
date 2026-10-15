/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostContentBlock } from './PostContentBlock';
/**
 * The article body in Editor.js output format (https://editorjs.io). `blocks` is an ordered list; render it top to bottom.
 *
 * **Block types**
 *
 * | `type` | `data` fields |
 * |---|---|
 * | `paragraph` | `text` (inline HTML) |
 * | `header` | `text` (inline HTML), `level` (1 to 4). Headings are typed `header`, not `heading`. |
 * | `list` | `style` (`ordered` or `unordered`), `items` |
 * | `quote` | `text`, `caption` (inline HTML), `alignment` |
 * | `delimiter` | none (`{}`) |
 * | `table` | `content` (rows of cells, each cell inline HTML), `withHeadings` |
 * | `warning` | `title`, `message` (inline HTML) |
 * | `image` | `url`, `caption`, `alt`, `size` (`small`, `medium`, `large` or `full`) |
 * | `gallery` | `images` (each `url`, `caption`, `alt`), `layout` (`2-col`, `3-col` or `4-col`) |
 * | `video` | `url`, `caption`, `type` (`upload` for a video file, `embed` for an embeddable player URL), `embedCode` |
 * | `embed` | `service`, `source`, `embed` (player URL), `width`, `height`, `caption` |
 * | `productEmbed` | `productId`, `productName`, `productImage`, `productPrice`, `displayType` (`card`, `inline` or `minimal`) |
 *
 * **Rendering rules**
 *
 * - A renderer skips any block whose `type` it does not recognise; new block types can appear
 * without a change to the API version.
 * - `list.items` holds plain strings in older posts and `{ content, items, meta }` objects in
 * current ones, where `content` is inline HTML and `items` nests a sub-list. Both forms occur and
 * both must be handled.
 * - Inline HTML is limited to `<b>`, `<i>`, `<u>`, `<a href>`, `<mark>`, `<code>` and `<br>`.
 * The API returns stored content as written and does not sanitise it on read, so a storefront
 * sanitises inline HTML to that list before inserting it into a page, and accepts only `http`,
 * `https` and `mailto` URLs in `href`.
 * - A `productEmbed` block carries the product as it was when the author placed it. The current
 * price, stock and `variant_id` of the same product are in the post's `products` array, matched
 * on `product_id` (equal to the block's `productId`).
 *
 */
export type PostContent = {
    /**
     * When the document was last saved in the editor, in milliseconds since the epoch.
     */
    time?: number;
    /**
     * Editor.js version that produced the document.
     */
    version?: string;
    blocks?: Array<PostContentBlock>;
};

