const InformationProjectDto = require("../DTOs/Data/Information/InformationProjectDto");
const ProjectActionsDto = require("../DTOs/Data/Actions/ProjectActionsDto");
const ProjectForUpdateDto = require("../DTOs/ForUpdate/ProjectForUpdateDto");
const ProjectService = require("../services/ProjectService");
const ChainForSelectionInTheProject = require("../DTOs/Data/ChainForSelect/ChainForSelectionInTheProject");
const CustomerForCreationDTO = require("../DTOs/ForCreation/CustomerForCreationDto");

class ProjectInformationController {
    constructor(projectIdProperty = "projectId") {
        this.PROJECT_ID_PROPERTY = projectIdProperty
    }
    getProjectIdFromReqParams = (req) => {
        const projectId = req.params[this.PROJECT_ID_PROPERTY];
        return projectId;
    }
    getProjectActionById = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const projectId = this.getProjectIdFromReqParams(req);
            // Получаем данные о проекте
            const data = await ProjectService.getProjectActionById(projectId);
            // Создаем DTO для результата
            const resultDto = data.map(item => new ProjectActionsDto(item));

            return res.status(200).json({projectActions: resultDto});
        } catch (err) {
            console.log("Error in catch", err); // Логирование ошибки
            next(err); // Передаем ошибку дальше
        }
    };
    getProjectDataById = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const projectId = this.getProjectIdFromReqParams(req);
            // Получаем данные о проекте
            const data = await ProjectService.getProjectById(projectId); 
            // Создаем DTO для результата
            const resultDto = new InformationProjectDto(data);

            return res.status(200).json(resultDto);
        } catch (err) {
            console.log("Error in catch", err); // Логирование ошибки
            next(err); // Передаем ошибку дальше
        }
    };
    getChainForSelect = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const projectId = this.getProjectIdFromReqParams(req);
            // Получаем данные о проекте
            const data = await ProjectService.getChainForSelect(projectId); 
            // Создаем DTO для результата
            const resultDto = data.map((item)=>new ChainForSelectionInTheProject(item));
            return res.status(200).json(resultDto);
        } catch (err) {
            console.log("Error in catch", err); // Логирование ошибки
            next(err); // Передаем ошибку дальше
        }
    };
    createCustomerForProject = async (req,res,next)=> {
        try {
            
            const projectId = this.getProjectIdFromReqParams(req);
            const customerDataForCreate = new CustomerForCreationDTO(req.body);
            const userId = req.userIdFromToken;
            const result = await ProjectService.createCustomer(projectId, customerDataForCreate, userId);
            await this.getChainForSelect(req,res,next);
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
    updateProjectData= async (req, res, next)=> {
        try {
            const projectId = this.getProjectIdFromReqParams(req);
            const userId = req.userIdFromToken;

            const projectData = {
                project_id: projectId,
                ...req.body
            };

            const projectDataForUpdate = new ProjectForUpdateDto(projectData);    
            const result = await ProjectService.updateProject(projectDataForUpdate, userId);
            const resultDto = new InformationProjectDto(result);

            return res.status(200).json(resultDto);
        } catch (err) {
            console.log("Error in updateCustomerData:", err);
            next(err);
        }
    }

     updateCustomersOrder =async(req, res, next)=> {
        try {
            const projectId = this.getProjectIdFromReqParams(req);

            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateEpicsOrder:", err);
            next(err);
        }
    }
    deleteProjectById=async(req,res,next)=> {
        try {
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