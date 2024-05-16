const mongoose = require('mongoose');
import { Schema } from './../../node_modules/mongoose/types/index.d';
import { Timestamp } from './../../node_modules/json/src/timestamp';

const schedule = new mongoose.Schema({
    ScheduleId: {
        type: Number, //mongoose.Schema.Types.ObjectId,
        required: true
    },
    EmployeeId: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    startTime: {
        type: DateTime,
        required: true
    },
    endTime: {
        type: DateTime,
        required: true
    },

});

module.exports = mongoose.model("scheduleSchema", scheduleSchema);