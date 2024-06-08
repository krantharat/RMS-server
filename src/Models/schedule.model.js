const mongoose = require('mongoose');

const Schedule = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", 
        required: true
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false //optional
    }

});

const ScheduleModel = mongoose.model('Schedule',Schedule)

module.exports = ScheduleModel;