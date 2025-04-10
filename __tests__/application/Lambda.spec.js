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

        handler = createLambdaHandler(serviceLocatorMock);
    });

    test('debe retornar una respuesta 200 con los datos del seller', async () => {
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
        serviceLocatorMock.getSellerByEmail.mockResolvedValue(mockSeller);

        const response = await handler.handleRequest(eventData);

        expect(serviceLocatorMock.getSellerByEmail).toHaveBeenCalledWith(expect.any(EventLambda));
        expect(response).toBeInstanceOf(ResponseLambda);
        expect(response.data).toEqual(mockSeller);
        expect(response.statusCode).toBe(200);
        expect(response.error).toEqual(null);
    });

    test('debe manejar errores y retornar código 500', async () => {
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
        serviceLocatorMock.getSellerByEmail.mockRejectedValue(new Error(errorMessage));

        const response = await handler.handleRequest(eventData);

        expect(serviceLocatorMock.getSellerByEmail).toHaveBeenCalledWith(expect.any(EventLambda));
        expect(response).toBeInstanceOf(ResponseLambda);
        expect(response.statusCode).toBe(500);
        expect(response.data).toBeNull();
        expect(response.error).toEqual(JSON.stringify({ error: errorMessage }));
    });
});
