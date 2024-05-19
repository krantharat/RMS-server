const mongoose = require('mongoose');

//drop down name
const employeeName = new mongoose.Schema({
    emName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", //edit later
        require: true
    }
})
const EmployeeNameModel = mongoose.model('emName', employeeName)
module.exports = EmployeeNameModel;


//position
const employeePosition = new mongoose.Schema({
    emPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", //edit later
        require: true
    }
})
const EmployeePositionModel = mongoose.model('emPosition', employeePosition)
module.exports = EmployeePositionModel;


//other detail
const Schedule = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", //edit later
        required: true
    },
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
    note: {
        type: String,
        required: true
    }

});

const ScheduleModel = mongoose.model('Schedule',Schedule)

module.exports = Schedule;