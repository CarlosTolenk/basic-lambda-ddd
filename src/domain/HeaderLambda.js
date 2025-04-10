const COUNTRY_CL = 'CL'


export class HeaderLambda {
    /**
     * Crea una instancia de Header.
     * @param {import('./dtos/index.js').HeaderData} data - Datos de las cabeceras.
     * @throws {Error} Si el token de autorización no está presente.
     */
    constructor(data) {
        const authorizationHeader = data.Authorization || data.authorization;
        this.ensureAuthenticated(authorizationHeader);

        this.authorization = data.Authorization || data.authorization;
        this.b2bSessionToken = data.b2bSession?.Authorization || null;
        this.cpgId = data.cpgId;
        this.countryId = data.countryId;
        this.organizationId = data.organizationId;
        this.transactionId = data.transactionId;
        this.appID = data.appID;
        this.appVersion = data.appVersion;
        this.appOs = data.appOs;
        this.appOsVersion = data.appOsVersion;
    }

    /**
     * Ejecuta el caso de uso.
     * @param {string} authorizationHeader
     * @returns {void}
     * @throws {Error} Si el token de autorización no está presente.
     */
    ensureAuthenticated(authorizationHeader) {
        if (!authorizationHeader) {
            throw new Error(JSON.stringify({
                code: 'UNAUTHORIZED',
                message: 'Unauthorized',
            }, null, 2));
        }
    }


    /**
     * Devolver el index para consultar tablas por país.
     * @returns {string}
     */
    getIndexTable() {
        return `mk-${this.cpgId}-${this.countryId}-${this.organizationId}`;
    }

    /**
     * Devolver un boolean si el país es CL.
     * @returns {boolean}
     */
    // isCountryCL() {
    //     return this.countryId === COUNTRY_CL;
    // }
}
