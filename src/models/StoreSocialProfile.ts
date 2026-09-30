/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoreSocialProfile = {
    platform: StoreSocialProfile.platform;
    /**
     * The profile's address. For a named platform it is always on that platform's domain.
     */
    url: string;
    /**
     * The account name as the merchant wrote it, for display.
     */
    handle?: string | null;
};
export namespace StoreSocialProfile {
    export enum platform {
        INSTAGRAM = 'instagram',
        TIKTOK = 'tiktok',
        FACEBOOK = 'facebook',
        X = 'x',
        YOUTUBE = 'youtube',
        PINTEREST = 'pinterest',
        LINKEDIN = 'linkedin',
        WHATSAPP = 'whatsapp',
        THREADS = 'threads',
        SNAPCHAT = 'snapchat',
        OTHER = 'other',
    }
}

