export class ResponseLambda {

    constructor(data, statusCode, error = null ) {
        this.data = data
        this.statusCode = statusCode
        this.error = error
    }
}
