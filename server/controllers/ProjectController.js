const ProjectService = require("../services/ProjectService");
const ApiError = require("../error/ApiError");
const ProjectForCreationDTO = require('../DTOs/ForCreation/ProjectForCreationDTO')
const ProjectDTO = require('../DTOs/Data/ProjectDTO')

class ProjectController {
    constructor(pk = "projectId") {
        this.pk = pk;
    }

    async getAllProjects(req, res, next) {
        try {
            const dataProjects = await ProjectService.getAllProjects();
            return res.status(200).json(dataProjects); 
        } catch (err) {
            next(err);
        }
    }

    async getByIdProject(req, res, next) {
        try {
            const { projectId } = req.params; 
            const dataProjects = await ProjectService.getProjectById(projectId);
            return res.status(200).json(dataProjects);  
        } catch (err) {
            next(err);
        }
    }

    async createRequest(req, res, next) {
        try {
            const projectForm = req.body;
            //TODO сделать получение ID пользователя из запроса
            const userId = 1;
            const projectFormDto = new ProjectForCreationDTO(projectForm);

            const newProject = await ProjectService.createProject(projectFormDto);
            
            //Вернуть обьект
            return res.status(200).json(newProject);  
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProjectController();
