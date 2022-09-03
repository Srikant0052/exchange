const express = require('express')
const app = express()
let port  = 3000
const userRoute = require('./src/Routes/userRoute')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/', userRoute)


app.listen(port, _ => console.log(`server is running on port ${port}`))

