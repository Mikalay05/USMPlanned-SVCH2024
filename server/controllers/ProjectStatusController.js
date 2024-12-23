const ProjectStatusService = require("../services/ProjectStatusService");

class ProjectStatusController {
    constructor(pk = "projectStatusId") {
        this.pk = pk;
    }
    async getAllProjectStatuses(req, res, next) {
        try {
            const dataStatusProjects = await ProjectStatusService.getAllProjectStatuses();
            return res.status(200).json(dataStatusProjects); 
        } catch (err) {
            next(err);
        }
    }

    async getByIdProjectStatus(req, res, next) {
        try {
            const { projectStatusId } = req.params; 
            const dataStatusProjects = await ProjectStatusService.getByIdProjectStatus(projectStatusId);
            return res.status(200).json(dataStatusProjects);  
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProjectStatusController();