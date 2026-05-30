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
    };
};
export namespace ConnectAuthorizeResponse {
    export enum environment {
        SANDBOX = 'sandbox',
        PRODUCTION = 'production',
    }
}

