
const createError = require('http-errors')
const logger = require('../config/logger');

const notFound = (req, res, next) => {
    next(createError(404, 'The Page You are Looking for is Not Found'))
    logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
}

const errorHandler = (err, req, res, next) => {

    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
}

/*                                          Exporting To Index.js                                        */

module.exports = {

    notFound,
    errorHandler

}