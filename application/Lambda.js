import {EventLambda} from "../domain/EventLambda.js";

/**
 * @param {ServiceLocator} serviceLocator - Instancia del ServiceLocator con los servicios inyectados
 * @returns {{ handleRequest: Function }} - Retorna el handler de la Lambda
 */
export default function createLambdaHandler(serviceLocator) {
    return {
        /**
         * Manejador principal de la Lambda
         * @param {import('../domain/dtos/index.js').EventData} eventData - Datos del evento recibido
         * @returns {Promise<Object>} - Respuesta HTTP
         */
        async handleRequest(eventData) {
            console.log('Evento recibido:', JSON.stringify(eventData, null, 2));

            try {
                const eventLambda = new EventLambda(eventData);
                const seller = await serviceLocator.getSellerByEmail(eventLambda);
                console.log('seller', seller);


                return seller;
            } catch (error) {
                console.error('Error en la Lambda:', error);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: error.message }),
                };
            }
        },
    };
}
