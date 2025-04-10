/**
 * @typedef {Object} SellerData
 * @property {string} updateDate - Fecha de actualización en formato ISO.
 * @property {string} avatar - URL del avatar del usuario.
 * @property {string} registerDate - Fecha de registro en formato ISO.
 * @property {string} documentId - Identificación del usuario.
 * @property {string} lastName - Apellido del usuario.
 * @property {string} legajo - Número de legajo.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} name - Nombre completo del usuario.
 * @property {string} username - Nombre del usuario
 * @property {string} gender - Género del usuario.
 * @property {string} roleId - Identificación del rol del usuario.
 * @property {string} active - Estado del usuario como string ('true' o 'false').
 * @property {string} birthdate - Fecha de nacimiento en formato ISO.
 * @property {string} cellphone - Número de celular.
 * @property {string} registeredBy - Usuario que lo registró.
 * @property {string} routeId - Identificación de la ruta.
 * @property {string} profileId - Perfil del usuario.
 */

/**
 * Clase Builder para construir objetos de tipo {@link SellerData}.
 */
export class SellerDataBuilder {
    constructor() {
        /**
         * @private
         * @type {string}
         */
        this._updateDate = '';

        /**
         * @private
         * @type {string}
         */
        this._avatar = '';

        /**
         * @private
         * @type {string}
         */
        this._registerDate = '';

        /**
         * @private
         * @type {string}
         */
        this._documentId = '';

        /**
         * @private
         * @type {string}
         */
        this._lastName = '';

        /**
         * @private
         * @type {string}
         */
        this._legajo = '';

        /**
         * @private
         * @type {string}
         */
        this._email = '';

        /**
         * @private
         * @type {string}
         */
        this._name = '';

        /**
         * @private
         * @type {string}
         */
        this._username = '';

        /**
         * @private
         * @type {string}
         */
        this._gender = '';

        /**
         * @private
         * @type {string}
         */
        this._roleId = '';

        /**
         * @private
         * @type {string}
         */
        this._active = '';

        /**
         * @private
         * @type {string}
         */
        this._birthdate = '';

        /**
         * @private
         * @type {string}
         */
        this._cellphone = '';

        /**
         * @private
         * @type {string}
         */
        this._registeredBy = '';

        /**
         * @private
         * @type {string}
         */
        this._routeId = '';

        /**
         * @private
         * @type {string}
         */
        this._profileId = '';
    }

    /**
     * @param {string} updateDate
     * @returns {SellerDataBuilder}
     */
    withUpdateDate(updateDate) {
        this._updateDate = updateDate;
        return this;
    }

    /**
     * @param {string} avatar
     * @returns {SellerDataBuilder}
     */
    withAvatar(avatar) {
        this._avatar = avatar;
        return this;
    }

    /**
     * @param {string} registerDate
     * @returns {SellerDataBuilder}
     */
    withRegisterDate(registerDate) {
        this._registerDate = registerDate;
        return this;
    }

    /**
     * @param {string} documentId
     * @returns {SellerDataBuilder}
     */
    withDocumentId(documentId) {
        this._documentId = documentId;
        return this;
    }

    /**
     * @param {string} lastName
     * @returns {SellerDataBuilder}
     */
    withLastName(lastName) {
        this._lastName = lastName;
        return this;
    }

    /**
     * @param {string} legajo
     * @returns {SellerDataBuilder}
     */
    withLegajo(legajo) {
        this._legajo = legajo;
        return this;
    }

    /**
     * @param {string} email
     * @returns {SellerDataBuilder}
     */
    withEmail(email) {
        this._email = email;
        return this;
    }

    /**
     * @param {string} name
     * @returns {SellerDataBuilder}
     */
    withName(name) {
        this._name = name;
        return this;
    }

    /**
     * @param {string} username
     * @returns {SellerDataBuilder}
     */
    withUsername(username) {
        this._username = username;
        return this;
    }

    /**
     * @param {string} gender
     * @returns {SellerDataBuilder}
     */
    withGender(gender) {
        this._gender = gender;
        return this;
    }

    /**
     * @param {string} roleId
     * @returns {SellerDataBuilder}
     */
    withRoleId(roleId) {
        this._roleId = roleId;
        return this;
    }

    /**
     * @param {string} active
     * @returns {SellerDataBuilder}
     */
    withActive(active) {
        this._active = active;
        return this;
    }

    /**
     * @param {string} birthdate
     * @returns {SellerDataBuilder}
     */
    withBirthdate(birthdate) {
        this._birthdate = birthdate;
        return this;
    }

    /**
     * @param {string} cellphone
     * @returns {SellerDataBuilder}
     */
    withCellphone(cellphone) {
        this._cellphone = cellphone;
        return this;
    }

    /**
     * @param {string} registeredBy
     * @returns {SellerDataBuilder}
     */
    withRegisteredBy(registeredBy) {
        this._registeredBy = registeredBy;
        return this;
    }

    /**
     * @param {string} routeId
     * @returns {SellerDataBuilder}
     */
    withRouteId(routeId) {
        this._routeId = routeId;
        return this;
    }

    /**
     * @param {string} profileId
     * @returns {SellerDataBuilder}
     */
    withProfileId(profileId) {
        this._profileId = profileId;
        return this;
    }

    /**
     * Construye y retorna el objeto {@link SellerData}.
     * @returns {SellerData}
     */
    build() {
        return {
            updateDate: this._updateDate,
            avatar: this._avatar,
            registerDate: this._registerDate,
            documentId: this._documentId,
            lastName: this._lastName,
            legajo: this._legajo,
            email: this._email,
            name: this._name,
            username: this._username,
            gender: this._gender,
            roleId: this._roleId,
            active: this._active,
            birthdate: this._birthdate,
            cellphone: this._cellphone,
            registeredBy: this._registeredBy,
            routeId: this._routeId,
            profileId: this._profileId,
        };
    }
}
