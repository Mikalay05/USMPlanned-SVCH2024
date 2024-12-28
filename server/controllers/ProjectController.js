const ProjectService = require("../services/ProjectService");
const ApiError = require("../error/ApiError");
const ProjectForCreationDTO = require('../DTOs/ForCreation/ProjectForCreationDTO');
const ProjectForUpdateDto = require('../DTOs/ForUpdate/ProjectForUpdateDto');
const ProjectDTO = require('../DTOs/Data/ProjectDTO');

const NAME_OF_SHOW_PRECENT_OF_TASK = 'showPrecentTask';
const NAME_OF_SHOW_ACTIVE = 'showActive';

class ProjectController {
    constructor(pk = "projectId") {
        this.pk = pk;
    }

    async getAllProjects(req, res, next) {
        try {
            const showActive = req.query[NAME_OF_SHOW_ACTIVE] === 'true';  
            const showPrecent = req.query[NAME_OF_SHOW_PRECENT_OF_TASK] === 'true';
            const dataProjectsFromDb = await ProjectService.getAllProjects(showActive,showPrecent);
            const result = dataProjectsFromDb.map((row) => new ProjectDTO(row));
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async getByIdProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const showActive = req.query[NAME_OF_SHOW_ACTIVE] === 'true';
            const showPrecent = req.query[NAME_OF_SHOW_PRECENT_OF_TASK] === 'true';
            const dataProjectsFromDb = await ProjectService.getProjectById(projectId, showPrecent, showActive);
            const result = new ProjectDTO(dataProjectsFromDb);
            console.log("dataProjectsFromDb", dataProjectsFromDb)
            console.log("result", result)
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async createRequest(req, res, next) {
        try {
            const projectForm = req.body;
            const userId = 1;  // TODO: получить ID пользователя из запроса
            const projectFormDto = new ProjectForCreationDTO(projectForm);
            const newProject = await ProjectService.createProject(projectFormDto, userId);
            return res.status(200).json(newProject);
        } catch (err) {
            next(err);
        }
    }

    async updateRequest(req, res, next) {
        try {
            const {projectId} = req.params;
            const projectForm = req.body;
            const userId = 1;  // TODO: получить ID пользователя из запроса
            const projectFormDto = new ProjectForUpdateDto({...projectForm, project_id: projectId});
            const updatedProject = await ProjectService.updateProject(projectFormDto, userId);
            return res.status(200).json(updatedProject);
        } catch (err) {
            next(err);
        }
    }

    async deleteRequest(req, res, next) {
        try {
            const { projectId } = req.params;  // Если используете параметры пути
            const userId = 1;  // TODO: получить ID пользователя из запроса
            const resultOfDeleteProject = await ProjectService.deleteProject(projectId, userId);
            console.log(resultOfDeleteProject)
            return res.status(200).json(resultOfDeleteProject);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProjectController();