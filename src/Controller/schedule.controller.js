const ScheduleModel = require('../Models/schedule.model');
const EmployeeModel = require('../Models/employee.model');
const PositionModel = require('../Models/employee.model');

//create shift
const addShift = async (req, res) =>  {
    try {
        const { nickname, date, startTime, endTime, position, note } = req.body;
        
        // search Employee by use nickname
        const employee = await EmployeeModel.findOne({ nickName: nickname });       
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // create Schedule by use ObjectId ของ Employee ที่พบ
        const schedule = new ScheduleModel({
            employee: employee._id,
            date: date, //date: new Date(date)
            startTime: startTime,
            endTime: endTime,
            position: position,
            note: note
        });
        await schedule.save();
        res.json({
            message: 'add shift successfully',
            schedule: schedule
        })
    } catch (error) { 
        res.status(500).send(error.message);
    }
};

//edit shift
const editShift = async (req,res) => {
    try {
        const { id } = req.params;
        const { nickname, date, startTime, endTime, position, note } = req.body;

        // ค้นหา _id ของพนักงานที่ตรงกับ nickname
        const employee = await EmployeeModel.findOne({ nickName: nickname });       
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        //find _id of role ที่ตรงกับ position
        const role = await PositionModel.findOne({ position: position });
        position
        if (!role) {
            return res.status(404).json({ message: "Position not found" });
        }

        const updatedShift = await ScheduleModel.findByIdAndUpdate(
            id,
            {
                employee: employee._id, // use _id of employee
                date,
                startTime,
                endTime,
                position: role._id, // use _id of role
                note
            },
            { new: true, runValidators: true }
        );

        if (!updatedShift) {
            return res.status(404).json({ message: "Shift not found" });
        }
        res.json({
            message: 'Shift updated successfully',
            Shift: updatedShift
        });

    } catch (error) { 
        res.status(500).send(error.message);
    }
};
//get date (range of date)
const getShiftForWeek = async (req,res) => {
    try {
        const { startDate } = req.query;

        if (!startDate) {
            return res.status(400).json({ message: "startDate is required" });
        }

        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);

        const schedules = await ScheduleModel.find({
            date: {
                $gte: start,
                $lt: end
            }
        }).populate("employee").populate("position");

        res.status(200).json(schedules);
        

    } catch (error) { 
        res.status(500).send(error.message);
    }
};
//getAllSchedule
//getScheduleById
//delete
module.exports = { addShift, editShift, getShiftForWeek };
