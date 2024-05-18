// Gender part
const GenderModel = require("../Models/employee.model")
const createGender = async (req, res) => {
    try {
        const genderData = req.body
        const gender = new GenderModel({
            genderType: genderData.genderType,
        })
        await gender.save()

        res.json({
            message: 'add gender complete',
            gender: gender
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Position part
const PositionModel = require("../Models/employee.model")
const createPosition = async (req, res) => {
    try {
        const PositionData = req.body
        const position = new PositionModel({
            position: PositionData.position
        })
        await position.save()

        res.json({
            message: 'add position complete',
            position: position
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    createGender,
    createPosition
  };

// Employee part
const EmployeeModel = require("../Models/employee.model")

// สร้างข้อมูล Employee
const createEmployee = async (req, res) => {
    try {
        const EmployeeData = req.body
        const employee = new EmployeeModel({
            firstName: EmployeeData.firstName,
            lastName: EmployeeData.lastName,
            nickName: EmployeeData.nickName,
            position: EmployeeData.position,
            dateOfBirth: EmployeeData.dateOfBirth,
            gender: EmployeeData.gender,
            identificationNumber: EmployeeData.identificationNumber,
            location: EmployeeData.location,
            email: EmployeeData.email,
            phone:EmployeeData.phone,
            startDate:EmployeeData.startDate
        })
        await employee.save()

        res.json({
            message: 'add employee complete',
            employee: employee
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// ดู Employee ทั้งหมด
const allEmployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.find();
    
        res.json(employee);
  
      } catch (err) {
          res.status(500).send(err.message);
      }
}

// search Employee (by Id)
const searchEmployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.find();
        const id = req.params.id
    
        // หา employee จาก id ที่ส่งมา 
        const selectedIndex = employee.findIndex(employee => employee.id == id)
    
        res.json(employee[selectedIndex])

    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    createGender,
    createPosition,
    createEmployee,
    allEmployee,
    searchEmployee
  };