const ApiError = require("../error/ApiError");
const ProjectDTO = require("../DTOs/ProjectDTO"); 
const QUERIES = require("../queries/queries"); 
const { dbQuery } = require("../dbUtils"); 

class ProjectService {
    async getAllProjects() {
        try {
            const data = await dbQuery(QUERIES.GET_ALL_PROJECTS);
            const rows = data[0]
            const projects = rows.map(row => new ProjectDTO(row));
            return projects; 
        } catch (err) {
            console.error("Error executing query:", err);
            throw ApiError.internal("Ошибка при получении списка проектов");
        }
    }

    async getProjectById(projectId) {
        try {
            console.log("Полученный projectId:", projectId);

            const rows = await dbQuery(QUERIES.GET_PROJECT_BY_ID, [projectId]);

            if (rows.length === 0) {
                throw ApiError.notFound("Проект не найден");
            }

            const project = new ProjectDTO(rows[0]);
            return project;
        } catch (err) {
            console.error("Error executing query:", err);
            throw ApiError.internal("Ошибка при получении проекта");
        }
    }
}

module.exports = new ProjectService();
