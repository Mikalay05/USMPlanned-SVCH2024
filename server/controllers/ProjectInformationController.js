const InformationProjectDto = require("../DTOs/Data/InformationProjectDto");
const ProjectService = require("../services/ProjectService");


class ProjectInformationController {
    constructor(projectIdProperty = "projectId") {
        this.PROJECT_ID_PROPERTY = projectIdProperty
    }
    getProjectIdFromReqParams = (req) => {
        console.log("PROJECT ID")

        const projectId = req.params[this.PROJECT_ID_PROPERTY];
        console.log("PROJECT ID", projectId)
        return projectId;
    }
    getProjectById = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const projectId = this.getProjectIdFromReqParams(req);
    
            // Получаем данные о проекте
            const data = await ProjectService.getProjectById(projectId, false, true); 
    
            // Создаем DTO для результата
            const resultDto = new InformationProjectDto(data);
            return res.status(200).json(resultDto);
        } catch (err) {
            console.log("Error in catch", err); // Логирование ошибки
            next(err); // Передаем ошибку дальше
        }
    };

    async createCustomerForProject(req,res,next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not realized");
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
    async updateProjectData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateCustomerData:", err);
            next(err);
        }
    }

    async updateCustomersOrder(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateEpicsOrder:", err);
            next(err);
        }
    }
    deleteProjectById=async(req,res,next)=> {
        try {
            console.log("TEST")
            console.log(req.baseUrl)
            const projectId = this.getProjectIdFromReqParams(req);
            const resultOfDelete = await ProjectService.deleteProject(projectId);
            return res.status(200).json(resultOfDelete)
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
}
module.exports = new ProjectInformationController();