const mongoose = require('mongoose');

// Gender Schema
const Gender = new mongoose.Schema({
    genderType: {
        type: String,
        required: true
    },
});

const GenderModel = mongoose.model('Gender',Gender) 
module.exports = GenderModel;


// Position Schema
const Position = new mongoose.Schema({
    position: {
        type: String,
        required: true
    }
});

const PositionModel = mongoose.model('Position',Position) 
module.exports = PositionModel;

// Employee Schema
const Employee = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Position",
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Gender",
        required: true
    },
    identificationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
});

const EmployeeModel = mongoose.model('Employee',Employee) 

module.exports = EmployeeModel;