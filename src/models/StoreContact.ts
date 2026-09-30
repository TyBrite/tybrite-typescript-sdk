/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * How a shopper reaches the store. `email` and `phone` fall back to the store's own contact details when the merchant has not set dedicated support ones.
 */
export type StoreContact = {
    email?: string | null;
    phone?: string | null;
    /**
     * A WhatsApp number shoppers can message.
     */
    whatsapp?: string | null;
    /**
     * Free text, as the merchant wrote it.
     */
    support_hours?: string | null;
    /**
     * The merchant's own contact page, when they host one.
     */
    contact_page_url?: string | null;
};

