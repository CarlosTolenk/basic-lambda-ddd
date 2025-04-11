import providers from './providers/index.js';
import createServices from '../application/services/index.js';

/**
 * @typedef {import('./providers/index.js').Providers} Providers
 * @typedef {import('../application/services/index.js').Services} Services
 * @typedef {import('../domain/EventLambda.js').EventLambda} EventLambda
 * @typedef {import('../domain/entities/Seller.js').Seller} Seller
 */

/**
 * Tipado completo de métodos públicos del ServiceLocator
 * @typedef {Object} ServiceLocatorInterface
 * @property {(event: EventLambda) => Promise<Seller>} getSellerByEmail
 */

/**
 * @implements {ServiceLocatorInterface}
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

        this._bindServices([
            'getSellerByEmail',
        ]);
    }

    /**
     * Asigna los métodos definidos desde services a this con `execute`.
     * @param {Array<keyof ServiceLocatorInterface>} serviceKeys
     */
    _bindServices(serviceKeys) {
        for (const key of serviceKeys) {
            const service = this.services[key];
            if (!service || typeof service.execute !== 'function') {
                throw new Error(`Service '${key}' not found or missing .execute`);
            }
            this[key] = (...args) => service.execute(...args);
        }
    }

    /**
     * Obtener un provider con tipado estático.
     * @template {keyof Providers} K
     * @param {K} provider
     * @returns {Providers[K]}
     */
    async getProvider(provider) {
        return this.providers[provider];
    }
}
