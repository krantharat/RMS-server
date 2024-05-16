const ScheduleModel = require('../Models/schedule.model');

const addSchedule = async (req, res) =>  {
    try {
        const { employeeId, date, startTime, endTime } = req.body;
        const schedule = new ScheduleModel({
            employeeId: employeeId,
            date: date,
            startTime: startTime,
            endTime: endTime
        });
        await schedule.save();
        res.status(201).send({
            message: "Schedule added successfully",
            schedule
        });
    } catch (error) { 
        console.log(error);
        
    }
};
module.exports = { addSchedule };
