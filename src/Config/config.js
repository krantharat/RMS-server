const mongoose = require("mongoose");
const url = "mongodb+srv://tenniskrtrkyung:Tennis2002_@cluster0.v2l5lcl.mongodb.net/";
module.exports = {
    connection: mongoose
        .connect(url)
        .then(() => {
            console.log("Successfully connected to MongoDB.");
        })
        .catch(err => {
            console.log("Could not connect to MongoDB.");
            process.exit();
        })
};

