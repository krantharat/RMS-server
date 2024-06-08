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
        const positionData = req.body
        const position = new PositionModel({
            position: positionData.position
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

// Employee part
const EmployeeModel = require("../Models/employee.model")

// สร้างข้อมูล Employee
const createEmployee = async (req, res) => {
    try {
        const employeeData = req.body
        const employee = new EmployeeModel({
            employeeID: employeeData.employeeID,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            nickName: employeeData.nickName,
            position: employeeData.position,
            dateOfBirth: employeeData.dateOfBirth,
            gender: employeeData.gender,
            identificationNumber: employeeData.identificationNumber,
            location: employeeData.location,
            email: employeeData.email,
            phone: employeeData.phone,
            startDate: employeeData.startDate
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
        const employee = await EmployeeModel.find()
        .populate('position')
        .populate('gender');
    
        res.json(employee);
  
      } catch (err) {
          res.status(500).send(err.message);
      }
}

// search Employee (by Id)
const searchEmployee = async (req, res) => {
    try {
        const employees = await EmployeeModel.find()
            .populate('position')
            .populate('gender');

        const { name, employeeID } = req.query;

        let selectedEmployee;

        if (name) {
            selectedEmployee = employees.find(employee => employee.firstName === name);
        } else if (employeeID) {
            selectedEmployee = employees.find(employee => employee.employeeID === employeeID);
        }

        if (selectedEmployee) {
            res.json(selectedEmployee);
        } else {
            res.status(404).send('Employee not found');
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
};


// แก้ไขข้อมูล Employee
const editEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const updateEmployee = req.body;

        // Find the menu by id and update with the new data
        const updatedEmployee = await EmployeeModel.findOneAndUpdate(
            { _id: id }, // ใช้ _id เพราะเป็น key ของ MongoDB
            {
                $set: {
                    employeeID: updateEmployee.employeeID,
                    firstName: updateEmployee.firstName,
                    lastName: updateEmployee.lastName,
                    nickName: updateEmployee.nickName,
                    position: updateEmployee.position,
                    dateOfBirth: updateEmployee.dateOfBirth,
                    gender: updateEmployee.gender,
                    identificationNumber: updateEmployee.identificationNumber,
                    location: updateEmployee.location,
                    email: updateEmployee.email,
                    phone: updateEmployee.phone,
                    startDate: updateEmployee.startDate
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({
            message: 'Update employee complete!',
            menu: updatedEmployee 
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ลบ Menu
const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id; // รับข้อมูลมาเป็น String
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(id) // fundById จะแปลง String -> ObjectId ให้อัตโนมัติ
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({
            message: 'Employee deleted successfully',
            employee: deletedEmployee
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    createGender,
    createPosition,
    createEmployee,
    allEmployee,
    searchEmployee,
    editEmployee,
    deleteEmployee
  };