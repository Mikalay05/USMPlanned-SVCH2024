const TaskStatusDto = require("../DTOs/Data/TaskStatusDto");
const TaskStatusService = require("../services/TaskStatusService");

class TaskStatusController {
    constructor(pk = "taskStatusId") {
        this.pk = pk;
    }
    async getAllTaskStatuses(req, res, next) {
        try {
            const data = await TaskStatusService.getAllTaskStatuses();
            console.log("data",data)
            const result = data.map((element)=> {
                return new TaskStatusDto(element);
            })
            return res.status(200).json(result); 
        } catch (err) {
            next(err);
        }
    }

    async getByPkTaskStatus(req, res, next) {
        try {
            const { taskStatusId } = req.params; 
            const data = await TaskStatusService.getByPkTaskStatus(taskStatusId);
            return res.status(200).json(data);  
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TaskStatusController();