import providers from "./providers/index.js";
import createServices from "../application/services/index.js";

/**
 * @typedef {import('../infrastructure/providers').Providers} Providers
 * @typedef {import('../application/services/index.js').Services} Services
 */
export class ServiceLocator {

    /** @type {Providers} */
    providers;

    /** @type {Services} */
    services;

    constructor() {
        this.providers = providers;
        this.services = createServices(this.providers);
    }

    /**
     * Obtiene una instancia de un provider.
     * @param {keyof Providers} provider - Nombre del provider.
     * @returns {Providers[keyof Providers]}
     */
    async getProvider(provider) {
        return await this.providers[provider];
    }

    /**
     * Obtiene una instancia de un caso de uso.
     * @param {keyof Services} serviceName - Nombre del servicio
     * @returns {Services[keyof Services]}
     */
    getService(serviceName) {
        return this.services[serviceName];
    }
}
