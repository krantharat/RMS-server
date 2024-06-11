const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  nickName: {
    type: String,
  },
  position: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  identificationNumber: {
    type: String, 
    required: true,
    unique: true
  },
  location: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  startDate: {
    type: String,
  }
});

const EmployeeModel = mongoose.model('Employee',Employee) 

module.exports = EmployeeModel;