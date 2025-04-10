import { ServiceLocator } from './src/infrastructure/ServiceLocator.js';
import createLambdaHandler from './src/application/Lambda.js';

/** @type {ServiceLocator} */
const serviceLocator = new ServiceLocator();

const { handleRequest } = createLambdaHandler(serviceLocator);

export const handler = handleRequest


handler({
    "headers": {
        "authorization": "",
        "cpgId": "001",
        "countryId": "CL",
        "organizationId": "3043",
        "transactionId": "",
        "b2bSession": {
            "Authorization": ""
        },
        "appID": "MiMarket",
        "appVersion": "1.20.8",
        "appOs": "android",
        "appOsVersion": "33"
    },
    "payload": {
        "clientId": "46715",
        "paymentMethod": "[{\"segmentId\":1,\"paymentMethod\":\"E\"}]",
        "deliveryDate": "2025-03-19T23:59:00.000Z",
        "deliveryFrozenDate": "",
        "latitude": 6.2117653,
        "longitude": -75.6026481,
        "orderId": "10013470"
    }
})
