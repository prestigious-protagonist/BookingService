const {StatusCodes} = require('http-status-codes')

class ServiceError extends Error {
    constructor(name = "ServiceError", message = "Something went wrong", explanation = "Service layer Error", statusCode=StatusCodes.INTERNAL_SERVER_ERROR) {
        super()
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = ServiceError;