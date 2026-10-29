/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Delivery summary of a variant that is not shipped. Carries the kind and the public terms of sale; present only when `fulfilment_kind` is not `shipped`. Terms that the merchant has not set are omitted.
 */
export type ProductFulfilment = {
    /**
     * How the variant is delivered.
     */
    kind: ProductFulfilment.kind;
    /**
     * Event tickets. The earliest moment the ticket admits its holder.
     */
    valid_from?: string;
    /**
     * Event tickets. The moment the ticket stops admitting its holder.
     */
    valid_until?: string;
    /**
     * Event tickets. Sales open at this moment; checkout refuses the variant before it.
     */
    sale_starts_at?: string;
    /**
     * Event tickets. Sales close at this moment; checkout refuses the variant after it.
     */
    sale_ends_at?: string;
    /**
     * Event tickets. The number of people one purchased unit admits.
     */
    admits_per_unit?: number;
    /**
     * Event tickets with `admits_per_unit` above 1. `one_code` issues a single ticket that admits the whole group; `per_person` issues one ticket per person, each with its own holder name.
     */
    group_mode?: ProductFulfilment.group_mode;
    /**
     * Event tickets. The most units of this variant a single order may carry.
     */
    max_per_order?: number;
    /**
     * Event tickets. The tier printed on the ticket and shown at check-in, such as `VIP entrance`.
     */
    entry_label?: string;
    /**
     * Event tickets. `single` admits the holder once; `per_day` admits the holder once on each day of a multi-day event.
     */
    check_in?: ProductFulfilment.check_in;
    /**
     * Event tickets. The number of units that can still be bought: the lesser of the variant's own stock and the room left in the venue capacity it shares with other ticket types, counting units held in open checkouts. `null` means the variant has no limit. The field is omitted when the figure could not be read, in which case the order request is still checked in full. The figure can lag a sale by up to half a minute on a cached response.
     */
    available?: number | null;
};
export namespace ProductFulfilment {
    /**
     * How the variant is delivered.
     */
    export enum kind {
        DIGITAL = 'digital',
        CODE = 'code',
        EVENT_TICKET = 'event_ticket',
        SERVICE = 'service',
    }
    /**
     * Event tickets with `admits_per_unit` above 1. `one_code` issues a single ticket that admits the whole group; `per_person` issues one ticket per person, each with its own holder name.
     */
    export enum group_mode {
        ONE_CODE = 'one_code',
        PER_PERSON = 'per_person',
    }
    /**
     * Event tickets. `single` admits the holder once; `per_day` admits the holder once on each day of a multi-day event.
     */
    export enum check_in {
        SINGLE = 'single',
        PER_DAY = 'per_day',
    }
}

