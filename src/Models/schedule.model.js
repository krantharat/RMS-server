const mongoose = require('mongoose');
// import { Schema } from 'mongoose';
// import { Timestamp } from './../../node_modules/json/src/timestamp';

const scheduleSchema = new mongoose.Schema({
    // ScheduleId: {
    //     type: Number,
    //     required: true
    // },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },

});

module.exports = mongoose.model("scheduleSchema", scheduleSchema);