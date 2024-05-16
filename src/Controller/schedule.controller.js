const ScheduleModel = require('../Models/schedule.model');

const addSchedule = async (req, res) =>  {
    try {
        const userData = req.body
        const schedule = new ScheduleModel({
            employeeId: userData.employeeId,
            date: userData.date,
            startTime: userData.startTime,
            endTime: userData.endTime
        });
        await schedule.save();
        res.json({
            message: 'add ok',
            schedule: schedule
        })
    } catch (error) { 
        res.status(500).send(err.message);

    }
};
module.exports = { addSchedule };