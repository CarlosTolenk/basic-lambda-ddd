import { jest, describe, test, beforeEach, expect } from '@jest/globals';

jest.unstable_mockModule('../../infrastructure/providers/index.js', () => ({
    __esModule: true,
    default: {
        providerA: { name: 'ProviderA' },
        providerB: { name: 'ProviderB' },
    },
}));

jest.unstable_mockModule('../../application/services/index.js', () => ({
    __esModule: true,
    default: jest.fn()
}));

const { ServiceLocator } = await import('../../infrastructure/ServiceLocator.js');
const providers = (await import('../../infrastructure/providers/index.js')).default;
const createServices = (await import('../../application/services/index.js')).default;

describe('ServiceLocator', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        createServices.mockReturnValue({
            getSellerByEmail: {
                execute: jest.fn()
            }
        });
    });

    test('should assign providers and services correctly in the constructor.', () => {
        const serviceLocator = new ServiceLocator();

        expect(serviceLocator.providers).toStrictEqual({
            providerA: { name: 'ProviderA' },
            providerB: { name: 'ProviderB' },
        });

        expect(createServices).toHaveBeenCalledWith(providers);

        expect(serviceLocator.services).toStrictEqual({
            getSellerByEmail: {
                execute: expect.any(Function),
            },
        });
    });

    test('should expose methods on the instance that call serviceInstance.execute', () => {
        const serviceLocator = new ServiceLocator();

        expect(typeof serviceLocator.getSellerByEmail).toBe('function');

        serviceLocator.getSellerByEmail('arg1', 'arg2');

        expect(serviceLocator.services.getSellerByEmail.execute).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should getProvider return the correct provider', async () => {
        const serviceLocator = new ServiceLocator();

        const providerA = await serviceLocator.getProvider('providerA');
        expect(providerA).toEqual({ name: 'ProviderA' });

        const providerB = await serviceLocator.getProvider('providerB');
        expect(providerB).toEqual({ name: 'ProviderB' });
    });
});
