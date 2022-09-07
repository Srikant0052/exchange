const express = require('express')
const mongoose = require('mongoose');
const app = express()
let port = 3000
const userRoute = require('./src/Routes/userRoute')
const walletRoutes = require('./src/Routes/walletRoutes')
const tRoutes = require('./src/Routes/transactionRoute')
const { notFound, errorHandler } = require('./src/utils/errors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://admin:admin123@siamaq.h4fjfrg.mongodb.net/test", {
    useNewUrlParser: true
})

    .then(() => console.log("mongoDb Is Connected"))
    .catch(err => console.log(err))


app.use('/', userRoute)
app.use('/', walletRoutes)
app.use('/', tRoutes)

//-----------------------------------------------------------------------------------------------------------------

// Capture 500 errors
app.use(notFound)
app.use(errorHandler)

// app.use((err, req, res, next) => {
//     res.status(500).send('Could not perform the operation!');
//     logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
// })

// // Capture 404 erors
// app.use((req, res, next) => {
//     res.status(404).send("PAGE NOT FOUND");
//     logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
// })


app.listen(port, _ =>
    console.log(`server is running on port ${port}`));

