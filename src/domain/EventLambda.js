import { HeaderLambda } from './HeaderLambda.js';

export class EventLambda {
    /**
     * Crea una instancia de Event.
     * @param {import('./dtos/index.js').EventData} data - Datos de las cabeceras.
     */
    constructor(data) {
        this.headers = new HeaderLambda(data.headers);
        this.clientId = data.clientId;
        this.longitude = data.longitude;
        this.latitude = data.latitude;
        this.deliveryDate = data.deliveryDate;
        this.deliveryFrozenDate = data.deliveryFrozenDate;
        this.paymentMethod = data.paymentMethod;
    }
}
