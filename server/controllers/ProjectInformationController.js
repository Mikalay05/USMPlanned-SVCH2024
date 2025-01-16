const InformationProjectDto = require("../DTOs/Data/InformationProjectDto");
const ProjectService = require("../services/ProjectService");


class ProjectInformationController {
    constructor(projectIdProperty = "projectId") {
        this.PROJECT_ID_PROPERTY = projectIdProperty
    }
    getProjectById = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const projectId = req.params[this.PROJECT_ID_PROPERTY];
    
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
    async deleteProjectById(req,res,next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not realized");
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
}
module.exports = new ProjectInformationController();