const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    morgan = require('morgan'),
    cors = require("cors")

// import router root
const scheduleRouter = require('./src/Routers/schedule.router');
const userRouter = require('./src/Routers/userRouter')
const menuRouter = require('./src/Routers/menu.router');

require('dotenv').config();

require('./src/Config/config').connection;


const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};

// app use
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(cors(corsOptions));

//port 
const PORT = process.env.PORT || 5000;

// api test
app.get("/", (req, res) => {
    res.send({
        message: "this is homepage",
    });
});

//router
app.use("/api/schedule", scheduleRouter);
app.use("/api/user", userRouter);
app.use("/api/menu", menuRouter)

//port listen
app.listen(PORT, function () {
    console.log("Restaurant server started on:" + PORT);
});