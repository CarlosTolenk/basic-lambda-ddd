import { join } from 'path';

/**
 * @typedef {Object} Providers
 * @property {DynamoManager} DynamoManager
 * @property {CognitoManager} CognitoManager
 * @property {JwtDecoder} JwtDecoder
 */

const basePath = process.env.LAYERS_BASE_PATH || process.cwd();

/** @type {Providers} */
const providers = {
    DynamoManager: await import(join(basePath, 'src', 'b2b-aws-dynamodb', 'DynamoDBManagerV2.js'))
        .then(m => new m.default()),
    CognitoManager: await import(join(basePath, 'src', 'b2b-aws-cognito', 'CognitoManagerV2.js')).then(m => m.default),
    JwtDecoder: await import(join(basePath, 'src', 'b2b-aws-cognito', 'JwtDecoder.js')).then(m => m.default),
};


export default providers;
