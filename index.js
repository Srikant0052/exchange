const express = require('express')
const mongoose = require('mongoose');
const app = express()
let port  = 3000
const userRoute = require('./src/Routes/userRoute')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://siamaq:admin@cluster0.shuoh8i.mongodb.net/test", {
    useNewUrlParser: true
})

.then( () => console.log("mongoDb Is Connected"))
.catch ( () => console.log(err) )


app.use('/', userRoute)



app.listen(port, _ => console.log(`server is running on port ${port}`))

