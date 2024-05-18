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
        type: String,
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

});

const Schedule = mongoose.model('Schedule',scheduleSchema)

module.exports = Schedule;