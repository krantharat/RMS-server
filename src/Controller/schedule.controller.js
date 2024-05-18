const ScheduleModel = require('../Models/schedule.model');

const addSchedule = async (req, res) =>  {
    try {
        const {date, startTime, endTime} = req.body;
        const schedule = new ScheduleModel({
            date: date,
            startTime: startTime,
            endTime: endTime
        });
        await schedule.save();
        res.json({
            message: 'add ok',
            schedule: schedule
        })
    } catch (error) { 
        res.status(500).send(error.message);
    }
};
module.exports = { addSchedule };
