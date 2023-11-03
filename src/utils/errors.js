export class CustomError {
    static createError({statusCode = 500, name= "Error", cause, message, code = 1}) {
        const error = new Error(message, {cause})
        error.status = statusCode
        error.name = name
        error.code = code
        throw error
    }
}

export const errorCodes = {
    INVALID_TYPES_ERROR: 1,
    DATABASE_ERROR: 2,
    MISSING_DATA: 3,
    RENDERING_ERROR: 4,
    ROUTING_ERROR: 5
}

export class generateErrorInfo {
    
    static getId(id) {
        return `Not a valid ID ${id}.`;
    }

    static idNotFound() {
        return 'The ID doesnt exist.';
    }

    static missingInfo() {
        return "Incomplete fields.";
    }

    static unauthorized() {
        return "The user was unauthorized."
    }
}