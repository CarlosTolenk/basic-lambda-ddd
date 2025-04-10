import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { GetSellerByEmail } from '../../../src/application/services/GetSellerByEmail.js';
import { Seller } from '../../../src/domain/Seller.js';
import {EventDataBuilder} from "../../../__mocks__/EventDataBuilder.js";

describe('GetSellerByEmail', () => {
    let dynamoManagerMock;
    let cognitoManagerMock;
    let jwtDecoderMock;
    let getSellerByEmail;

    beforeEach(() => {
        dynamoManagerMock = {
            getItem: jest.fn()
        };

        cognitoManagerMock = jest.fn().mockImplementation(() => {
            return {
                getEmailByToken: jest.fn()
            };
        });

        jwtDecoderMock = {
            getUserInfoNoVerification: jest.fn()
        };

        getSellerByEmail = new GetSellerByEmail(
            dynamoManagerMock,
            cognitoManagerMock,
            jwtDecoderMock
        );
    });

    test('should return a Seller object when the seller exists in DynamoDB', async () => {
        const eventData = new EventDataBuilder()
            .withHeaders({
                Authorization: 'token123',
                b2bSession: { Authorization: 'b2bToken456' },
                cpgId: 'CPG-001',
                countryId: 'CL',
                organizationId: '0043',
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

        cognitoManagerMock.mockImplementation(() => {
            return {
                getEmailByToken: jest.fn().mockResolvedValue('email@example.com')
            };
        });

        jwtDecoderMock.getUserInfoNoVerification.mockReturnValue({ userName: 'testUser' });
        dynamoManagerMock.getItem.mockResolvedValue({
            Item: {
                name: 'John',
                lastName: 'Doe',
                username: 'testUser'
            }
        });

        const seller = await getSellerByEmail.execute(eventData);

        expect(cognitoManagerMock).toHaveBeenCalledWith('token123');
        expect(jwtDecoderMock.getUserInfoNoVerification).toHaveBeenCalledWith('token123');
        expect(dynamoManagerMock.getItem).toHaveBeenCalledWith('mk-CPG-001-CL-0043-sellers', { email: 'email@example.com' });
        expect(seller).toBeInstanceOf(Seller);
        expect(seller.username).toBe('testUser');
    });

    test('should return a Seller object when the seller exists in DynamoDB', async () => {
        const eventData = {
            headers: {
                authorization: 'some-token',
                getIndexTable: jest.fn().mockReturnValue('testTable')
            }
        };

        cognitoManagerMock.mockImplementation(() => {
            return {
                getEmailByToken: jest.fn().mockResolvedValue('non.existent@example.com')
            };
        });
        jwtDecoderMock.getUserInfoNoVerification.mockReturnValue({ userName: 'testUser' });

        dynamoManagerMock.getItem.mockResolvedValue({});

        await expect(getSellerByEmail.execute(eventData))
            .rejects
            .toThrow('seller not found');
    });
});
