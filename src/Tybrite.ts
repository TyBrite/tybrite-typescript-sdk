/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AuthenticationService } from './services/AuthenticationService';
import { CartWishlistService } from './services/CartWishlistService';
import { CmsService } from './services/CmsService';
import { CustomersService } from './services/CustomersService';
import { GiftCardsService } from './services/GiftCardsService';
import { MessagingService } from './services/MessagingService';
import { OrdersService } from './services/OrdersService';
import { PaymentsService } from './services/PaymentsService';
import { PricingService } from './services/PricingService';
import { ProductsService } from './services/ProductsService';
import { PromotionsService } from './services/PromotionsService';
import { RecommendationsService } from './services/RecommendationsService';
import { SearchService } from './services/SearchService';
import { ShippingService } from './services/ShippingService';
import { SystemService } from './services/SystemService';
import { TaxonomyService } from './services/TaxonomyService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class Tybrite {
    public readonly authentication: AuthenticationService;
    public readonly cartWishlist: CartWishlistService;
    public readonly cms: CmsService;
    public readonly customers: CustomersService;
    public readonly giftCards: GiftCardsService;
    public readonly messaging: MessagingService;
    public readonly orders: OrdersService;
    public readonly payments: PaymentsService;
    public readonly pricing: PricingService;
    public readonly products: ProductsService;
    public readonly promotions: PromotionsService;
    public readonly recommendations: RecommendationsService;
    public readonly search: SearchService;
    public readonly shipping: ShippingService;
    public readonly system: SystemService;
    public readonly taxonomy: TaxonomyService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.tybritelabs.com',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            apiKey: config?.apiKey,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.authentication = new AuthenticationService(this.request);
        this.cartWishlist = new CartWishlistService(this.request);
        this.cms = new CmsService(this.request);
        this.customers = new CustomersService(this.request);
        this.giftCards = new GiftCardsService(this.request);
        this.messaging = new MessagingService(this.request);
        this.orders = new OrdersService(this.request);
        this.payments = new PaymentsService(this.request);
        this.pricing = new PricingService(this.request);
        this.products = new ProductsService(this.request);
        this.promotions = new PromotionsService(this.request);
        this.recommendations = new RecommendationsService(this.request);
        this.search = new SearchService(this.request);
        this.shipping = new ShippingService(this.request);
        this.system = new SystemService(this.request);
        this.taxonomy = new TaxonomyService(this.request);
    }
}

