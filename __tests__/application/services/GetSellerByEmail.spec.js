import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { GetSellerByEmail } from '../../../application/services/GetSellerByEmail.js';
import { Seller } from '../../../domain/Seller.js';

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
        const eventData = {
            headers: {
                authorization: 'some-token',
                getIndexTable: jest.fn().mockReturnValue('testTable')
            }
        };

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

        expect(cognitoManagerMock).toHaveBeenCalledWith('some-token');
        expect(jwtDecoderMock.getUserInfoNoVerification).toHaveBeenCalledWith('some-token');
        expect(dynamoManagerMock.getItem).toHaveBeenCalledWith('testTable-sellers', { email: 'email@example.com' });
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
