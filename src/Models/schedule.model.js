const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    // ScheduleId: {
    //     type: Number,
    //     required: true
    // },
    // employeeId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Employee",
    //     required: true
    // },
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

const ScheduleModel = mongoose.model('Schedule',scheduleSchema) // User Model

module.exports = ScheduleModel;