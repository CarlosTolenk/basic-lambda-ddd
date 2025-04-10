import providers from './providers/index.js';
import createServices from '../application/services/index.js';

/**
 * @typedef {import('../infrastructure/providers').Providers} Providers
 * @typedef {import('../application/services/index.js').Services} Services
 * @typedef {GetSellerByEmail} getSellerByEmail
 * @typedef {Object} ServiceLocatorMethods
 */

/**
 * @class
 * @implements {ServiceLocatorMethods}
 */
export class ServiceLocator {
    /** @type {Providers} */
    providers;

    /** @type {Services} */
    services;

    /** @type {Function} */
    getSellerByEmail;

    constructor() {
        this.providers = providers;
        this.services = createServices(this.providers);

        this._assignServices();
    }

    _assignServices() {
        for (const [serviceName, serviceInstance] of Object.entries(this.services)) {
            this[serviceName] = (...args) => serviceInstance.execute(...args);
        }
    }

    /**
     * Obtiene una instancia de un provider.
     * @param {keyof Providers} provider - Nombre del provider.
     * @returns {Providers[keyof Providers]}
     */
    async getProvider(provider) {
        return this.providers[provider];
    }
}
