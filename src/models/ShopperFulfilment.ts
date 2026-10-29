/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One delivered unit of a purchase: a download, a code, an event ticket or a service. An order line with a quantity above one has one entry per unit. Fields beyond the common ones appear when the unit is `delivered` and are chosen by `kind`.
 */
export type ShopperFulfilment = {
    /**
     * The unit's identifier. Used by the reveal and download endpoints.
     */
    id: string;
    order_id?: string | null;
    order_number?: string | null;
    /**
     * The name of the product as it was ordered.
     */
    item_name?: string | null;
    /**
     * Position of the unit within its order line, starting at 1.
     */
    unit_no?: number;
    kind: ShopperFulfilment.kind;
    /**
     * `preparing` while delivery is in progress or being retried, `delivered` once the shopper has the item, `voided` after a refund or return.
     */
    status: ShopperFulfilment.status;
    created_at?: string;
    delivered_at?: string | null;
    /**
     * Files of a `digital` unit.
     */
    downloads?: Array<{
        asset_id?: string;
        file_name?: string | null;
        content_type?: string | null;
        bytes?: number | null;
        /**
         * Whether the file can be downloaded now.
         */
        available?: boolean;
        /**
         * The link to download the file, or `null` when it is not `available`. Opening it answers `302` with a short-lived link to the file.
         */
        download_url?: string | null;
    }>;
    /**
     * The codes of a `code` unit, masked. Read them with the reveal endpoint.
     */
    codes?: {
        count?: number;
        masked?: Array<string>;
        reveal_url?: string;
    };
    /**
     * The tickets of an `event_ticket` unit.
     */
    tickets?: Array<{
        id?: string;
        holder_name?: string | null;
        /**
         * The number of people the ticket admits.
         */
        admits?: number;
        /**
         * `valid` until used, `checked_in` once the holder has been admitted, `voided` after a refund.
         */
        status?: 'valid' | 'checked_in' | 'voided';
        checked_in_at?: string | null;
        event_name?: string | null;
        entry_label?: string | null;
        valid_from?: string | null;
        valid_until?: string | null;
        /**
         * The text to encode as the ticket's QR code; `null` on a voided ticket.
         */
        qr_payload?: string | null;
        /**
         * An SVG image of the ticket's QR code encoding `qr_payload`; `null` on a voided ticket. It scales to its container, so it can be inlined directly.
         */
        qr_svg?: string | null;
    }>;
    /**
     * The confirmation note of a `service` unit.
     */
    note?: string | null;
    /**
     * What the merchant's own delivery integration handed over: links and text. Codes it returned are read with the reveal endpoint.
     */
    details?: Array<{
        type?: 'link' | 'code' | 'text' | 'external';
        label?: string | null;
        value?: string | null;
        url?: string | null;
    }>;
};
export namespace ShopperFulfilment {
    export enum kind {
        DIGITAL = 'digital',
        CODE = 'code',
        EVENT_TICKET = 'event_ticket',
        SERVICE = 'service',
    }
    /**
     * `preparing` while delivery is in progress or being retried, `delivered` once the shopper has the item, `voided` after a refund or return.
     */
    export enum status {
        PREPARING = 'preparing',
        DELIVERED = 'delivered',
        VOIDED = 'voided',
    }
}

