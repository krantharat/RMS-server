const ScheduleModel = require('../Models/schedule.model');
const EmployeeModel = require('../Models/employee.model');

//create shift
const addShift = async (req, res) =>  {
    console.log(req.body);
    try {
        const { firstName, date, startTime, endTime, position, note } = req.body;
        const employee = await EmployeeModel.findOne({ firstName: firstName });
        if (!employee) {
            return res.status(400).json({ message: "Employee not found" });
        }
        const schedule = new ScheduleModel({
            firstName: employee._id,
            date: date,
            startTime: startTime,
            endTime: endTime,
            position: employee.position,
        });

        await schedule.save();
        res.json({
            message: 'add shift successfully',
            schedule: schedule
        });
    } catch (error) { 
        res.status(500).send(error.message);
    }
};


//edit shift
const editShift = async (req,res) => {
    try {
        const { id } = req.params;
        const updateShift = req.body;
        const employee = await EmployeeModel.findOne({ firstName: updateShift.firstName });

        const positionData = await PositionModel.findOne({ position: updateShift.position });

        const updatedShift = await ScheduleModel.findByIdAndUpdate(
            { _id: id },{
                $set: {
                    employee: employee._id,
                    date: updateShift.date,
                    startTime: updateShift.startTime,
                    endTime: updateShift.endTime,
                    position: positionData._id,
                    note: updateShift.note,
                }
            }, { new: true, runValidators: true }
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

//get date (range of date) (not finish)
// const getShiftForWeek = async (req,res) => {
//     try {
//         const { startDate } = req.query;

//         if (!startDate) {
//             return res.status(400).json({ message: "startDate is required" });
//         }

//         const start = new Date(startDate);
//         const end = new Date(start);
//         end.setDate(start.getDate() + 7);

//         const schedules = await ScheduleModel.find({
//             date: {
//                 $gte: start,
//                 $lt: end
//             }
//         }).populate("employee").populate("position");

//         res.status(200).json(schedules);
        

//     } catch (error) { 
//         res.status(500).send(error.message);
//     }
// };

//getAllShift
const getAllShift = async (req, res) => {
    try {
        const shift = await ScheduleModel.find();
    
        res.json(shift);
  
      } catch (err) {
          res.status(500).send(err.message);
      }
};

//getScheduleById
const getShiftById = async (req,res) => {
    try {
        const shift = await ScheduleModel.find()
        .populate('employee')
        const id = req.params.id
    
        const selectedIndex = shift.findIndex(shift => shift.id == id)
    
        res.json(shift[selectedIndex])

    } catch (err) {
        res.status(500).send(err.message);
    }
}

//delete
const deleteShift = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteShift = await ScheduleModel.findByIdAndDelete(id)
        if (!deleteShift) {
            return res.status(404).json({ message: 'Shift not found'})
        }
        res.json({
            message: 'Shift deleted successfully',
            shift : deleteShift
        });

    }catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports = { addShift, editShift, getAllShift, getShiftById, deleteShift };
