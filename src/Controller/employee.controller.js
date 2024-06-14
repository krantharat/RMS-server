const EmployeeModel = require("../Models/employee.model");

// Create Employee
const getNextEmployeeNumber = async (req, res) => {
    try {
      const lastEmployee = await EmployeeModel.findOne().sort({ employeeID: -1 });
      let nextEmployeeID = '0001';
  
      if (lastEmployee) {
        const lastID = parseInt(lastEmployee.employeeID, 10);
        nextEmployeeID = (lastID + 1).toString().padStart(4, '0');
      }
  
      res.json({ nextEmployeeID });
    } catch (error) {
      console.error('Error fetching next employee ID:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
  
const createEmployee = async (req, res) => {
    try {
      // หาพนักงานคนล่าสุดจากฐานข้อมูล โดยเรียงลำดับตาม employeeID จากมากไปน้อย
      const lastEmployee = await EmployeeModel.findOne().sort({ employeeID: -1 });
      let newEmployeeID = '0001';
      
      // ถ้ามีพนักงานอยู่แล้ว จะใช้ employeeID ล่าสุดแล้วเพิ่ม 1 และแปลงเป็น string ที่มี 4 หลัก
      if (lastEmployee) {
        const lastID = parseInt(lastEmployee.employeeID, 10);
        newEmployeeID = (lastID + 1).toString().padStart(4, '0');
      }
  
      // ดึง identificationNumber จาก request body
      const { identificationNumber } = req.body;
  
      // ตรวจสอบว่า identificationNumber ต้องมีความยาวเท่ากับ 13 ตัวอักษร
      if (!/^\d{13}$/.test(identificationNumber)) {
        return res.status(400).json({ message: 'Identification number must be exactly 13 digits long' });
      }
  
      // ตรวจสอบว่า identificationNumber นี้มีในฐานข้อมูลแล้วหรือไม่
      const existingIdentificationNumber = await EmployeeModel.findOne({ identificationNumber });
      if (existingIdentificationNumber) {
        return res.status(400).json({ message: 'Already have this identification number in the database' });
      }
  
      // สร้างข้อมูลพนักงานใหม่
      const employeeData = {
        ...req.body,
        employeeID: newEmployeeID
      };
  
      // บันทึกข้อมูลพนักงานใหม่ลงในฐานข้อมูล
      const employee = new EmployeeModel(employeeData);
      await employee.save();
  
      // ส่ง response กลับไปยังไคลเอนต์
      res.json({
        message: 'Employee created successfully',
        employee: employee
      });
    } catch (err) {
      // จัดการข้อผิดพลาดและส่ง response กลับไปยังไคลเอนต์
      console.error('Error creating employee:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };
  

// Get All Employees
const allEmployee = async (req, res) => {
    try {
        const employees = await EmployeeModel.find()
            .populate('position')
            .populate('gender');

        res.json(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Search Employee by ID or Name
const searchEmployee = async (req, res) => {
    try {
        const { name, employeeID } = req.query;
        let selectedEmployee;

        if (name) {
            selectedEmployee = await EmployeeModel.findOne({ firstName: name }).populate('position').populate('gender');
        } else if (employeeID) {
            selectedEmployee = await EmployeeModel.findOne({ employeeID: employeeID }).populate('position').populate('gender');
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

// Edit Employee
const editEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const updateEmployee = req.body;

        console.log(`Received ID: ${id}`);

        const existingEmployee = await EmployeeModel.findById(id);
        if (!existingEmployee) {
            console.error('Employee not found with ID:', id);
            return res.status(404).json({ message: 'Employee not found' });
        }

        console.log('Existing Employee:', existingEmployee);

        if (updateEmployee.identificationNumber.trim() !== existingEmployee.identificationNumber.trim()) {
            const duplicateEmployee = await EmployeeModel.findOne({ identificationNumber: updateEmployee.identificationNumber.trim() });
            if (duplicateEmployee) {
                return res.status(400).json({ message: 'Already have this identificationNumber in database' });
            }
        }

        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
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
            console.error('Employee not found after update attempt with ID:', id);
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({
            message: 'Update employee complete!',
            employee: updatedEmployee 
        });

    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};




// Delete Employee
const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
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
    createEmployee,
    allEmployee,
    searchEmployee,
    editEmployee,
    deleteEmployee,
    getNextEmployeeNumber
};
