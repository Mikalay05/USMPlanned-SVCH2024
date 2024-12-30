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
    async createProject(req,res,next) {
        try {
            const body = new ProjectForCreationDTO(req.body);
            //TODO Получить userId
            const userId = 1;
            const resultOfCreate = await ProjectService.createProject(body, userId);
            res.status(201).json(resultOfCreate);
        } catch (err) {
            console.log("Error in createProject:", err);
            next(err);
        }
    }
}

module.exports = new ProjectController();