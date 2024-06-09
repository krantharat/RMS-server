const mongoose = require('mongoose');

// // Gender Schema
// const Gender = new mongoose.Schema({
//     genderType: {
//         type: String,
//         required: true
//     },
// });

// const GenderModel = mongoose.model('Gender',Gender) 
// module.exports = GenderModel;


// // Position Schema
// const Position = new mongoose.Schema({
//     position: {
//         type: String,
//         required: true
//     }
// });

// const PositionModel = mongoose.model('Position',Position) 
// module.exports = PositionModel;

//Employee Schema
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
    // required: true
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  identificationNumber: {
    type: String,  // Ensure this matches the data type from the frontend
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