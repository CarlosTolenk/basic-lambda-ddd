/**
 * @typedef {Object} HeaderData
 * @property {string} Authorization - Token de autorización
 * @property {Object} [b2bSession] - Información opcional de sesión B2B
 * @property {string} [b2bSession.Authorization] - Token de sesión B2B
 * @property {string} cpgId - Identificador de CPG
 * @property {string} countryId - Identificador de país
 * @property {string} organizationId - Identificador de organización
 * @property {string} transactionId - Identificador de transacción
 * @property {string} appID - Identificador de aplicación
 * @property {string} appVersion - Versión de la aplicación
 * @property {string} appOs - Sistema operativo de la aplicación
 * @property {string} appOsVersion - Versión del sistema operativo
 */

/**
 * @typedef {Object} EventData
 * @property {HeaderData} headers - Cabeceras del evento
 * @property {string} clientId - Identificador del cliente
 * @property {number} longitude - Longitud geográfica
 * @property {number} latitude - Latitud geográfica
 * @property {string} deliveryDate - Fecha de entrega
 * @property {string} deliveryFrozenDate - Fecha de entrega de congelados
 * @property {string} paymentMethod - Método de pago
 */

import {HeaderLambda} from "../domain/HeaderLambda.js";

/**
 * Clase Builder para construir objetos de tipo {@link EventData}.
 */
export class EventDataBuilder {
    constructor() {
        /**
         * @private
         * @type {HeaderData}
         */
        this._headers;

        /**
         * @private
         * @type {string}
         */
        this._clientId = '';

        /**
         * @private
         * @type {number}
         */
        this._longitude = 0;

        /**
         * @private
         * @type {number}
         */
        this._latitude = 0;

        /**
         * @private
         * @type {string}
         */
        this._deliveryDate = '';

        /**
         * @private
         * @type {string}
         */
        this._deliveryFrozenDate = '';

        /**
         * @private
         * @type {string}
         */
        this._paymentMethod = '';
    }

    /**
     * Asigna el objeto de cabeceras.
     * @param {HeaderData} headers
     * @returns {EventDataBuilder}
     */
    withHeaders(headers) {
        this._headers = new HeaderLambda(headers);
        return this;
    }

    /**
     * Asigna el identificador del cliente.
     * @param {string} clientId
     * @returns {EventDataBuilder}
     */
    withClientId(clientId) {
        this._clientId = clientId;
        return this;
    }

    /**
     * Asigna la longitud geográfica.
     * @param {number} longitude
     * @returns {EventDataBuilder}
     */
    withLongitude(longitude) {
        this._longitude = longitude;
        return this;
    }

    /**
     * Asigna la latitud geográfica.
     * @param {number} latitude
     * @returns {EventDataBuilder}
     */
    withLatitude(latitude) {
        this._latitude = latitude;
        return this;
    }

    /**
     * Asigna la fecha de entrega.
     * @param {string} deliveryDate
     * @returns {EventDataBuilder}
     */
    withDeliveryDate(deliveryDate) {
        this._deliveryDate = deliveryDate;
        return this;
    }

    /**
     * Asigna la fecha de entrega de productos congelados.
     * @param {string} deliveryFrozenDate
     * @returns {EventDataBuilder}
     */
    withDeliveryFrozenDate(deliveryFrozenDate) {
        this._deliveryFrozenDate = deliveryFrozenDate;
        return this;
    }

    /**
     * Asigna el método de pago.
     * @param {string} paymentMethod
     * @returns {EventDataBuilder}
     */
    withPaymentMethod(paymentMethod) {
        this._paymentMethod = paymentMethod;
        return this;
    }

    /**
     * Construye y retorna el objeto {@link EventData}.
     * @returns {EventData}
     */
    build() {
        return {
            headers: this._headers,
            clientId: this._clientId,
            longitude: this._longitude,
            latitude: this._latitude,
            deliveryDate: this._deliveryDate,
            deliveryFrozenDate: this._deliveryFrozenDate,
            paymentMethod: this._paymentMethod,
        };
    }
}
