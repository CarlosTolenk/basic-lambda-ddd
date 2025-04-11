import {Seller} from "../../domain/Seller.js";
import {EventLambda} from "../../domain/EventLambda.js";

export class GetSellerByEmail {

    constructor(DynamoManager, CognitoManager, JwtDecoder) {
        this.DynamoManager = DynamoManager;
        this.CognitoManager = CognitoManager;
        this.JwtDecoder = JwtDecoder;
    }

    /**
     * Ejecuta el caso de uso.
     * @param {EventLambda} eventData - Datos del evento recibido
     * @returns {Promise<Seller>}
     * @throws {Error} Cliente no existe
     */
    async execute(eventData) {
        const {headers} = eventData

        const cognitoManager = new this.CognitoManager(headers.authorization);
        const { userName } = this.JwtDecoder.getUserInfoNoVerification(headers.authorization);
        const email = await cognitoManager.getEmailByToken(headers.authorization);

        const tableName = `${headers.getIndexTable()}-sellers`;
        const sellerInfo = await this.DynamoManager.getItem(tableName, { email });
        if (!sellerInfo.Item) {
            console.error(`seller not found with email: ${email}`);
            throw new Error(`seller not found`);
        }

        return new Seller(sellerInfo.Item, userName);
    }
}
