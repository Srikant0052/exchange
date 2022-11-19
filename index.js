const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const userRoute = require("./src/Routes/userRoute");
const walletRoutes = require("./src/Routes/walletRoutes");
const tRoutes = require("./src/Routes/transactionRoute");
const userLogging = require("./src/Routes/userLoginRoute");
const gameRoutes = require("./src/Routes/gamesRoute");

const { notFound, errorHandler } = require("./src/utils/errors");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

let port = process.env.PORT || 4000;
const Data_Base_Url = process.env.DB_URL;

mongoose
    .connect(Data_Base_Url, {
        useNewUrlParser: true,
    })

    .then(() => console.log("mongoDb Is Connected"))
    .catch((err) => console.log(err));

app.use("/", userRoute);
app.use("/", walletRoutes);
app.use("/", tRoutes);
app.use("/", userLogging);
app.use("/", gameRoutes);

//-----------------------------------------------------------------------------------------------------------------

//Error Handlers

app.use(notFound);
app.use(errorHandler);

app.listen(port, (_) => console.log(`server is running on port ${port}`));
