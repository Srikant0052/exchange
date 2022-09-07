require('winston-mongodb');

const {
    createLogger,
    transports,
    format
} = require('winston');


const logger = createLogger({

    transports: [
        
    new transports.MongoDB({
            level: 'error',
            db: 'mongodb+srv://admin:admin123@siamaq.h4fjfrg.mongodb.net/test',
            options: { useUnifiedTopology: true },
            collection: 'errorInfo',
            format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.json())
        })
    ]
})

module.exports = logger;