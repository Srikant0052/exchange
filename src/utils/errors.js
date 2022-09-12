
const createError = require('http-errors')
const errorLog = require('../Models/errorLogModel')
const moment = require('moment')

const notFound = (req, res, next) => {
    next(createError(404, 'The Page You are Looking for is Not Found'))
}

const errorHandler = async (err, req, res, next) => {

    let errorData = {

        _id: await errorLog.find().count() + 1,
        errMsg: err.message,
        errCode: err.status || 500,
        userIp: req.ip,
        timestamp: moment().format('LLLL')

    }

    await errorLog.create(errorData)
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })

}

/*                                          Exporting To Index.js                                        */

module.exports = {

    notFound,
    errorHandler

}