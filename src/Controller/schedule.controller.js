const ScheduleModel = require('../Models/schedule.model');

const addSchedule = async (req, res) =>  {
    try {
        const employees = await ScheduleModel.findOne({ genre: genre }).populate("movie_id");
    } catch (error) { 
        console.log(error);
        
    }
};
module.exports = { addSchedule };
