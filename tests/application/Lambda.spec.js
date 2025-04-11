import {describe, test, expect, beforeEach, jest} from '@jest/globals';

import createLambdaHandler from '../../src/application/Lambda.js';
import {EventLambda} from '../../src/domain/EventLambda.js';
import {ResponseLambda} from '../../src/domain/Response.js';
import {EventDataBuilder} from "../__mocks__/EventDataBuilder.js";
import {SellerDataBuilder} from "../__mocks__/SellerDataBuilder.js";
import {HeaderLambda} from "../../src/domain/HeaderLambda.js";

describe('createLambdaHandler', () => {
    let serviceLocatorMock;
    let handler;

    beforeEach(() => {
        serviceLocatorMock = {
            getSellerByEmail: jest.fn()
        };

        handler = createLambdaHandler(serviceLocatorMock);
    });

    test('should return a 200 response with the sellers data', async () => {
        const eventData = new EventDataBuilder()
            .withHeaders({
                Authorization: 'token123',
                b2bSession: {Authorization: 'b2bToken456'},
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
        const mockSeller = new SellerDataBuilder().build();
        serviceLocatorMock.getSellerByEmail.mockResolvedValue(mockSeller);

        const response = await handler.handleRequest(eventData);

        expect(serviceLocatorMock.getSellerByEmail).toHaveBeenCalledWith(expect.any(EventLambda));
        expect(response).toBeInstanceOf(ResponseLambda);
        expect(response.data).toEqual(mockSeller);
        expect(response.statusCode).toBe(200);
        expect(response.error).toEqual(null);
    });

    test('should return an authorization error when the headers are not set appropriately.', () => {
        const badEvent = {
            headers: {
                authorization: "",
                cpgId: "001",
                countryId: "CL",
                organizationId: "3043",
                transactionId: "",
                b2bSession: {
                    Authorization: ""
                },
                appID: "MiMarket",
                appVersion: "1.20.8",
                appOs: "android",
                appOsVersion: "33"
            },
            payload: {
                clientId: "46715",
                paymentMethod: "[{\"segmentId\":1,\"paymentMethod\":\"E\"}]",
                deliveryDate: "2025-03-19T23:59:00.000Z",
                deliveryFrozenDate: "",
                latitude: 6.2117653,
                longitude: -75.6026481,
                orderId: "10013470"
            }
        }

        expect(() => {
            new HeaderLambda(badEvent.headers);
        }).toThrow(
            new Error(JSON.stringify({
                code: 'UNAUTHORIZED',
                message: 'Unauthorized',
            }, null, 2))
        );
    });

    test('should handle errors and return 500 code', async () => {
        const eventData = new EventDataBuilder()
            .withHeaders({
                Authorization: 'token123',
                b2bSession: {Authorization: 'b2bToken456'},
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
        expect(response.error).toEqual(JSON.stringify({error: errorMessage}));
    });
});
