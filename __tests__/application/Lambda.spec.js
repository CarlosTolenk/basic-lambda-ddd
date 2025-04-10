import { describe, test, expect, beforeEach, jest } from '@jest/globals';

import createLambdaHandler from '../../application/Lambda.js';
import { EventLambda } from '../../domain/EventLambda.js';
import { ResponseLambda } from '../../domain/Response.js';
import {EventDataBuilder} from "../../__mocks__/EventDataBuilder.js";

describe('createLambdaHandler', () => {
    let serviceLocatorMock;
    let handler;

    beforeEach(() => {
        serviceLocatorMock = {
            getSellerByEmail: jest.fn()
        };

        // Obtenemos la instancia de nuestro handler a partir del mock.
        handler = createLambdaHandler(serviceLocatorMock);
    });

    test('debe retornar una respuesta 200 con los datos del seller', async () => {
        // Preparamos datos de prueba
        const eventData = new EventDataBuilder()
            .withHeaders({
                Authorization: 'token123',
                b2bSession: { Authorization: 'b2bToken456' },
                cpgId: 'CPG-001',
                countryId: 'CO',
                organizationId: 'ORG-123',
                transactionId: 'TXN-789',
                appID: 'myApp',
                appVersion: '1.0.0',
                appOs: 'iOS',
                appOsVersion: '14.4',
            })
            .withClientId('client-123')
            .withLongitude(-74.08175)
            .withLatitude(4.60971)
            .withDeliveryDate('2025-12-31')
            .withDeliveryFrozenDate('2025-12-31')
            .withPaymentMethod('CREDIT')
            .build();
        const mockSeller = { name: 'Test Seller', email: 'test@example.com' };

        // Configuramos el mock para que devuelva un seller.
        serviceLocatorMock.getSellerByEmail.mockResolvedValue(mockSeller);

        // Ejecutamos el método handleRequest.
        const response = await handler.handleRequest(eventData);

        // Aseguramos que getSellerByEmail haya sido llamado con una instancia de EventLambda
        expect(serviceLocatorMock.getSellerByEmail).toHaveBeenCalledWith(expect.any(EventLambda));

        // Verificamos que el handler retorne una instancia de ResponseLambda
        expect(response).toBeInstanceOf(ResponseLambda);

        // Validamos que la respuesta es la esperada
        // expect(response.data).toEqual(mockSeller);
        expect(response.statusCode).toBe(200);
        // expect(response.headers).toBeUndefined(); // Por defecto, en este caso no se están seteando headers.
    });

    test('debe manejar errores y retornar código 500', async () => {
        // Preparamos datos de prueba
        const eventData = new EventDataBuilder()
            .withHeaders({
                Authorization: 'token123',
                b2bSession: { Authorization: 'b2bToken456' },
                cpgId: 'CPG-001',
                countryId: 'CO',
                organizationId: 'ORG-123',
                transactionId: 'TXN-789',
                appID: 'myApp',
                appVersion: '1.0.0',
                appOs: 'iOS',
                appOsVersion: '14.4',
            })
            .withClientId('client-123')
            .withLongitude(-74.08175)
            .withLatitude(4.60971)
            .withDeliveryDate('2025-12-31')
            .withDeliveryFrozenDate('2025-12-31')
            .withPaymentMethod('CREDIT')
            .build();
        const errorMessage = 'Error en getSellerByEmail';

        // Configuramos el mock para que lance un error.
        serviceLocatorMock.getSellerByEmail.mockRejectedValue(new Error(errorMessage));

        // Ejecutamos el método handleRequest.
        const response = await handler.handleRequest(eventData);

        // Aseguramos que se haya invocado getSellerByEmail
        // expect(serviceLocatorMock.getSellerByEmail).toHaveBeenCalledWith(expect.any(EventLambda));

        // Verificamos que el handler retorne una instancia de ResponseLambda
        expect(response).toBeInstanceOf(ResponseLambda);

        // Validamos el contenido de la respuesta de error
        expect(response.statusCode).toBe(500);
        // expect(response.body).toBeNull();
        // expect(response.headers).toEqual(JSON.stringify({ error: errorMessage }));
    });
});
