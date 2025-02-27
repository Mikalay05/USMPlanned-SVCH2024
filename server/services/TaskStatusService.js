const ApiError = require("../error/ApiError");
const { TaskStatus } = require("../models/models");
const TaskStatusDto = require("../DTOs/Data/TaskStatusDto");
class ProjectStatusService {
    async getAllTaskStatuses() {
        try {
            const data = await TaskStatus.findAll();
            const result = data.map(row => new TaskStatusDto(row));
            return result;
        }
        catch (err) {
            console.error("Error executing getAllTaskStatuses:", err);
            throw ApiError.internal("Ошибка при получении списка статусов task");
        }
    }
    async getByPkTaskStatus(taskStatusId) {
        try {
            const data = await TaskStatus.findOne({where: {id:  taskStatusId}});
            const result =  new TaskStatusDto(data);
            return result;
        }
        catch (err) {
            console.error("Error executing getByPkTaskStatus:", err);
            throw ApiError.internal("Ошибка при получении статуса task");

        }
    }
}

module.exports = new ProjectStatusService();
