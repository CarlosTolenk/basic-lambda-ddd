import providers from './providers/index.js';
import createServices from '../application/services/index.js';

/**
 * @typedef {import('./providers/index.js').Providers} Providers
 * @typedef {import('../application/services/index.js').Services} Services
 * @typedef {import('../domain/EventLambda.js').EventLambda} EventLambda
 * @typedef {import('../domain/entities/Seller.js').Seller} Seller
 */

/**
 * @typedef {Object} ServiceLocator
 * @property {(event: EventLambda) => Promise<Seller>} getSellerByEmail
 */

export class ServiceLocator {
    /** @type {Providers} */
    providers;

    /** @type {Services} */
    services;

    /** @type {(event: EventLambda) => Promise<Seller>} */
    getSellerByEmail;

    constructor() {
        this.providers = providers;
        this.services = createServices(this.providers);

        this.getSellerByEmail = (event) =>
            this.services.getSellerByEmail.execute(event);
    }

    /**
     * @template {keyof Providers} K
     * @param {K} provider - Nombre del provider.
     * @returns {Providers[K]}
     */
    async getProvider(provider) {
        return this.providers[provider];
    }
}
