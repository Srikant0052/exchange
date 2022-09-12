const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
let port = 4000
const userRoute = require('./src/Routes/userRoute')
const walletRoutes = require('./src/Routes/walletRoutes')
const tRoutes = require('./src/Routes/transactionRoute')
const userLogging = require('./src/Routes/userLoginRoute')
const { notFound, errorHandler } = require('./src/utils/errors')


app.use(cors())
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
app.use('/', userLogging)

//-----------------------------------------------------------------------------------------------------------------

//Error Handlers

app.use(notFound)
app.use(errorHandler)



app.listen(port, _ =>
    console.log(`server is running on port ${port}`));

