export class Seller {
    /**
     * Crea una instancia de Seller.
     * @param {import('./dtos/index.js').SellerData} data - Datos de las cabeceras.
     * @param {string} userName -userName
     */
    constructor(data, userName) {
        this.updateDate = data.updateDate;
        this.avatar = data.avatar;
        this.registerDate = data.registerDate;
        this.documentId = data.documentId;
        this.lastName = data.lastName;
        this.legajo = data.legajo;
        this.email = data.email;
        this.name = data.name;
        this.username = userName;
        this.gender = data.gender;
        this.roleId = data.roleId;
        this.active = data.active;
        this.birthdate = data.birthdate;
        this.cellphone = data.cellphone;
        this.registeredBy = data.registeredBy;
        this.routeId = data.routeId;
        this.profileId = data.profileId;
    }
}
