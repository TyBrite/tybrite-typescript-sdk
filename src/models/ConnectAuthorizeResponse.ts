/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ConnectAuthorizeResponse = {
    valid: boolean;
    client: {
        client_id: string;
        name: string;
        description?: string | null;
        logo_url?: string | null;
    };
    request: {
        redirect_uri: string;
        scopes: Array<string>;
        state: string;
        environment: ConnectAuthorizeResponse.environment;
        /**
         * True when the application registered a webhook URL, so connecting also creates a webhook
         * subscription for the store (the consent screen can disclose the resulting event feed).
         *
         */
        receives_webhooks?: boolean;
    };
};
export namespace ConnectAuthorizeResponse {
    export enum environment {
        SANDBOX = 'sandbox',
        PRODUCTION = 'production',
    }
}

