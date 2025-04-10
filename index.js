import { ServiceLocator } from './src/infrastructure/ServiceLocator.js';
import createLambdaHandler from './src/application/Lambda.js';

/** @type {ServiceLocator} */
const serviceLocator = new ServiceLocator();

const { handleRequest } = createLambdaHandler(serviceLocator);

export const handler = handleRequest


handler({
    "headers": {
        "authorization": "eyJraWQiOiJFM3k2N0pQQXl3UXlLRXY2NDg4MmJsck9hZmtQMEdvbzh1MktLMTdUejRJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoidGpwZG5TQXRUR2xkcWFrbmlLOF9CUSIsInN1YiI6ImI0ODg4NGQ4LTIwNTEtNzBmNC1lYWQ3LTFlMjcwMDQ4OGZkOCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9RVjUyR2YzWVFfQXp1cmVBRCJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1FWNTJHZjNZUSIsImNvZ25pdG86dXNlcm5hbWUiOiJBenVyZUFEX3Ryby1kcmFtaXJlekBrb2FuZGluYS5jb20iLCJvcmlnaW5fanRpIjoiNDJmNTMxOWYtZGU0Zi00YTQ0LWE3OWYtYWYxMWRkMjgxY2YzIiwiYXVkIjoiN242dDA3bTNodGJ1NTgwcGxmYnA5cjZtbTUiLCJpZGVudGl0aWVzIjpbeyJkYXRlQ3JlYXRlZCI6IjE3NDE5NTUyMDAwMjUiLCJ1c2VySWQiOiJ0cm8tZHJhbWlyZXpAa29hbmRpbmEuY29tIiwicHJvdmlkZXJOYW1lIjoiQXp1cmVBRCIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwczpcL1wvc3RzLndpbmRvd3MubmV0XC9hZjVkN2FjNi00Y2RmLTQwMzQtYTAyZC1iN2FjNGE1NzU3ZjdcLyIsInByaW1hcnkiOiJ0cnVlIn1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc0MTk1NTIwMiwiZXhwIjoxNzQyMjQ1NTA3LCJpYXQiOjE3NDIyNDE5MDcsImp0aSI6IjIzMDhmYmJjLWExN2ItNGI3OS05OWM4LWYwYmI5YmE3YjI5YSIsImVtYWlsIjoidHJvLWRyYW1pcmV6QGtvYW5kaW5hLmNvbSJ9.nGX23TM2BV2lnxN2KgjXsq6fnumjCBBNo_ehmVeEHmsJ2lLk-SgVPX2HUPsCwdGUu5v25cnaO0A-ejmrCuqybWty9IRWkvTcpU7kgMbNa0Av8z2sNx4Cc6wDLDpZQOfr_p3nFEO90Jpl7PtaNTh9FFWTr-66ZYJpjn0PjDumBPJ6_Kz3ztoxNJ-i1b_1eA9T6VzU472cyMHxesTI5QQyTx5GSQKAd7Qg_FHxGYtp_oxcEcg2orIvqgswbI9B8_NlWOdwwGhTSWC5XitsQ4siDVWaboEerqQbTBGoh32NDQYEiu49Oi5vF4918qHVerAbw8zuw3f8YTTAVk7ugXx00g",
        "cpgId": "001",
        "countryId": "CL",
        "organizationId": "3043",
        "transactionId": "2727c937-08a7-4416-b6fa-cccc85d889d3",
        "b2bSession": {
            "Authorization": "eyJraWQiOiJFM3k2N0pQQXl3UXlLRXY2NDg4MmJsck9hZmtQMEdvbzh1MktLMTdUejRJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoidGpwZG5TQXRUR2xkcWFrbmlLOF9CUSIsInN1YiI6ImI0ODg4NGQ4LTIwNTEtNzBmNC1lYWQ3LTFlMjcwMDQ4OGZkOCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9RVjUyR2YzWVFfQXp1cmVBRCJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1FWNTJHZjNZUSIsImNvZ25pdG86dXNlcm5hbWUiOiJBenVyZUFEX3Ryby1kcmFtaXJlekBrb2FuZGluYS5jb20iLCJvcmlnaW5fanRpIjoiNDJmNTMxOWYtZGU0Zi00YTQ0LWE3OWYtYWYxMWRkMjgxY2YzIiwiYXVkIjoiN242dDA3bTNodGJ1NTgwcGxmYnA5cjZtbTUiLCJpZGVudGl0aWVzIjpbeyJkYXRlQ3JlYXRlZCI6IjE3NDE5NTUyMDAwMjUiLCJ1c2VySWQiOiJ0cm8tZHJhbWlyZXpAa29hbmRpbmEuY29tIiwicHJvdmlkZXJOYW1lIjoiQXp1cmVBRCIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwczpcL1wvc3RzLndpbmRvd3MubmV0XC9hZjVkN2FjNi00Y2RmLTQwMzQtYTAyZC1iN2FjNGE1NzU3ZjdcLyIsInByaW1hcnkiOiJ0cnVlIn1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc0MTk1NTIwMiwiZXhwIjoxNzQyMjQ1NTA3LCJpYXQiOjE3NDIyNDE5MDcsImp0aSI6IjIzMDhmYmJjLWExN2ItNGI3OS05OWM4LWYwYmI5YmE3YjI5YSIsImVtYWlsIjoidHJvLWRyYW1pcmV6QGtvYW5kaW5hLmNvbSJ9.nGX23TM2BV2lnxN2KgjXsq6fnumjCBBNo_ehmVeEHmsJ2lLk-SgVPX2HUPsCwdGUu5v25cnaO0A-ejmrCuqybWty9IRWkvTcpU7kgMbNa0Av8z2sNx4Cc6wDLDpZQOfr_p3nFEO90Jpl7PtaNTh9FFWTr-66ZYJpjn0PjDumBPJ6_Kz3ztoxNJ-i1b_1eA9T6VzU472cyMHxesTI5QQyTx5GSQKAd7Qg_FHxGYtp_oxcEcg2orIvqgswbI9B8_NlWOdwwGhTSWC5XitsQ4siDVWaboEerqQbTBGoh32NDQYEiu49Oi5vF4918qHVerAbw8zuw3f8YTTAVk7ugXx00g"
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
