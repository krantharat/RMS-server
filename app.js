const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    morgan = require('morgan'),
    cors = require("cors")

// import router root
const scheduleRouter = require('./src/Routers/schedule.router');
const userRouter = require('./src/Routers/userRouter');
const menuRouter = require('./src/Routers/menu.router');
const summaryRouter = require('./src/Routers/summary.router');
const employeeRouter = require('./src/Routers/employee.router')
const stockRouter = require('./src/Routers/stock.router')

require('dotenv').config();

require('./src/Config/config').connection;


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
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
app.use("/api/menu", menuRouter);
app.use("/api/summary", summaryRouter);
app.use("/api/employee", employeeRouter)
app.use("/api/stock", stockRouter)

//port listen
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });