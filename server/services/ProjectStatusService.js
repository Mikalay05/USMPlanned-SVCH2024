const ApiError = require("../error/ApiError");
const ProjectStatusDto = require("../DTOs/Data/ProjectStatusDto"); 
const { ProjectStatus } = require("../models/models");
class ProjectStatusService {
    async getAllProjectStatuses() {
        try {
            const data = await ProjectStatus.findAll();
            const result = data.map(row => new ProjectStatusDto(row));
            return result;
        }
        catch (err) {
            console.error("Error executing getAllProjectStatuses:", err);
            throw ApiError.internal("Ошибка при получении списка статусов проектов");
        }
    }
    async getByIdProjectStatus(projectStatusId) {
        try {
            const data = await ProjectStatus.findOne({where: {id:  projectStatusId}});
            const result =  new ProjectStatusDto(data);
            return result;
        }
        catch (err) {
            console.error("Error executing getByIdProjectStatus:", err);
            throw ApiError.internal("Ошибка при получении статуса проекта");

        }
    }
}

module.exports = new ProjectStatusService();
