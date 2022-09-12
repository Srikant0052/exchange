const mongoose = require('mongoose');

const isValid = (value) => {
    if (typeof value == 'undefined' || value == null) return false;
    if (typeof value == 'String' && value.trim().length === 0) return false;
    if (typeof value == 'Number' && value.toString().length === 0) return false;
    return true;
}

const isValidRequestBody = (requestBody) => {
    if (Object.keys(requestBody).length > 0) return true;
    return false;
}

module.exports = { isValid, isValidRequestBody };