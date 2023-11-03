import { errorCodes } from "../utils/errors.js";

export default (error, req, res, next) => {
    switch (error.code){
        case errorCodes.INVALID_TYPES_ERROR:
            res.status(error.statusCode).send({status: "error", error: error.name, details: error.message});
            break;
        case errorCodes.DATABASE_ERROR:
            res.status(error.statusCode).send({status: "error", error: error.name || "Database error", details: error.message});
            break;
        case errorCodes.MISSING_DATA:
            res.status(error.statusCode).send({status: "error", error: error.name || "Incomplete fields", details: error.message});
            break;
        case errorCodes.RENDERING_ERROR:
            res.status(error.statusCode).send({status: "error", error: error.name || "Error", details: error.message});
            break;
        case errorCodes.ROUTING_ERROR:
            res.status(error.statusCode).send({status: "error", error: error.name || "Unauthorized", details: error.message});
            break;
        default:
            res.status(500).send({status: "error", error: "Error desconocido"});
    }
}