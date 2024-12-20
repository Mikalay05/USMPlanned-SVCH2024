const ProjectService = require("../services/ProjectService");
const ApiError = require("../error/ApiError");

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
}

module.exports = new ProjectController();
