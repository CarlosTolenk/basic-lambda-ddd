import {GetSellerByEmail} from "./GetSellerByEmail.js";

/**
 * @typedef {Object} Services
 * @property {GetSellerByEmail} getSellerByEmail
 */

/**
 * Crea las instancias de los servicios
 * @param {Providers} providers - Instancias de los servicios.
 * @returns {Services}
 */
export default function createServices(providers) {
    return {
      getSellerByEmail: new GetSellerByEmail(providers),
    };
}
