/**
 * @typedef {Object} HeaderData
 * @property {string} Authorization - Token de autorización
 * @property {Object} [b2bSession] - Información opcional de sesión B2B
 * @property {string} [b2bSession.Authorization] - Token de sesión B2B
 * @property {string} cpgId - Identificador de CPG
 * @property {string} countryId - Identificador de país
 * @property {string} organizationId - Identificador de organización
 * @property {string} transactionId - Identificador de transacción
 * @property {string} appID - Identificador de aplicación
 * @property {string} appVersion - Versión de la aplicación
 * @property {string} appOs - Sistema operativo de la aplicación
 * @property {string} appOsVersion - Versión del sistema operativo
 */

/**
 * @typedef {Object} EventData
 * @property {HeaderData} headers - Cabeceras del evento
 * @property {string} clientId - Identificador del cliente
 * @property {number} longitude - Longitud geográfica
 * @property {number} latitude - Latitud geográfica
 * @property {string} deliveryDate - Fecha de entrega
 * @property {string} deliveryFrozenDate - Fecha de entrega de congelados
 * @property {string} paymentMethod - Método de pago
 */

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
