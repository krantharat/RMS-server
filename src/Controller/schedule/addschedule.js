const ScheduleModel = require('../Models/scheduleSchema');
// const { json, Request, Response } = require("express");

const addSchedule = async (req, res) =>  {
    try {
        const { data } = req.body;
        const newData = JSON.parse(data);
        const schedule = new ScheduleModel({
            ScheduleId : newData.ScheduleId,
            EmployeeId : newData.EmployeeId,
            Date : newData.Date,
            startTime : newData.startTime,
            endTime : newData.endTime,
        });
        await schedule.save();
        res.status(201).send({
            message: "schedule added successfully",
            schedule
        });
    } catch (error) { 
        console.log(error);
        
    }
};