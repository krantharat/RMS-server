const morgan = require('morgan');

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    cors = require("cors");

require('dotenv').config();

require("./Config/config").connection;


const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};

// app use
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cors(corsOptions));

//port 
const PORT = process.env.PORT || 5000;


//port listen
app.listen(PORT, function () {
    console.log("Restaurant server started on:" + PORT);
});