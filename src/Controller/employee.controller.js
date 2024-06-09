const EmployeeModel = require("../Models/employee.model");

// Create Employee
const createEmployee = async (req, res) => {
    try {
        const employeeData = req.body;
        const employee = new EmployeeModel(employeeData);
        await employee.save();

        res.json({
            message: 'Employee created successfully',
            employee: employee
        });
    } catch (err) {
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
    deleteEmployee
};
