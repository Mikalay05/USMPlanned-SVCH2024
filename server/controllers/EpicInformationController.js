const EpicService = require('../services/EpicService')
const EpicActionsDto = require('../DTOs/Data/Actions/EpicActionsDto');
const InformationEpicDto = require('../DTOs/Data/Information/InformationEpicDto');
const ChainForSelectionInTheEpic = require('../DTOs/Data/ChainForSelect/ChainForSelectionInTheEpic');
const StoryForCreationDTO = require('../DTOs/ForCreation/StoryForCreationDTO');
const EpicDataForUpdateDto = require('../DTOs/ForUpdate/EpicDataForUpdateDto');


class EpicInformationController {
    constructor(
        projectIdProperty = "projectId",
        customerIdProperty = "customerId",
        epicIdProperty = "epicId"
      ) {
        this.PROJECT_ID_PROPERTY = projectIdProperty;
        this.CUSTOMER_ID_PROPERTY = customerIdProperty;
        this.EPIC_ID_PROPERTY = epicIdProperty;
      }

      getParamsIdFromReq = (req) => {
        const projectId =Number(req.params[this.PROJECT_ID_PROPERTY]);
        const customerId = Number(req.params[this.CUSTOMER_ID_PROPERTY]);
        const epicId = Number(req.params[this.EPIC_ID_PROPERTY]);
        return { customerId, projectId,epicId };
      };
    getEpicActionById = async (req, res, next) => {
        try {
          // Получаем projectId из параметров
          const {epicId} = this.getParamsIdFromReq(req);
          // Получаем данные о проекте
          const data = await EpicService.getEpicActionById(epicId);
          // Создаем DTO для результата
          const resultDto = data.map((item) => new EpicActionsDto(item));
    
          return res.status(200).json({ epicActions: resultDto });
        } catch (err) {
          console.error("Error in catch", err); // Логирование ошибки
          next(err); // Передаем ошибку дальше
        }
      };
    getEpicById = async(req, res, next)=> {
        try {
            const { customerId, epicId } = this.getParamsIdFromReq(req);
            const data = await EpicService.getEpicDataById(epicId);
            const resultDto = new InformationEpicDto(data);
            return res.status(200).json(resultDto);
        } catch (err) {
            console.error("Error in getEpicById:", err);
            next(err);
        }
    }

    createStoryForEpic = async(req, res, next)=> {
        try {
            const paths = this.getParamsIdFromReq(req);
            const dataFromDto = new StoryForCreationDTO(req.body);
            const userId = req.userIdFromToken;
            
            const result = await EpicService.createStoryForEpic(dataFromDto, paths, userId);
            return await this.getChainForSelect(req,res,next);
        } catch (err) {
            console.error("Error in createStoryForEpic:", err);
            next(err);
        }
    }

    updateEpicData = async(req, res, next)=> {
        try {
            const paths = this.getParamsIdFromReq(req);
            const dataFromDto = new EpicDataForUpdateDto(req.body);
            const userId = req.userIdFromToken;
            
            const result = await EpicService.updateEpicData(dataFromDto, paths, userId);
            return await this.getEpicById(req,res,next);
        } catch (err) {
            console.error("Error in updateEpicData:", err);
            next(err);
        }
    }

    async updateStoriesOrder(req, res, next) {
        try {
            //TODO Add a method implementation
            const { storyId, nextId } = req.query;
            throw new Error(`Not implemented. Params: storyId=${storyId}, nextId=${nextId}`);
        } catch (err) {
            console.error("Error in updateStoriesOrder:", err);
            next(err);
        }
    }

     deleteEpicById = async(req, res, next)=> {
        try {
            const paths = this.getParamsIdFromReq(req);
            const userId = req.userIdFromToken; 
            const result = await EpicService.deleteEpicById(paths, userId);
            return res.status(200).json({message: "epic deleted"})
        } catch (err) {
            console.error("Error in deleteEpicById:", err);
            next(err);
        }
    }
    getChainForSelect = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const {epicId, customerId, projectId} = this.getParamsIdFromReq(req);
            // Получаем данные о проекте
            //TODO test this
            const data = await EpicService.getChainForSelect(epicId); 
            // Создаем DTO для результата
            const resultDto = data.map((item)=>new ChainForSelectionInTheEpic(item));
            return res.status(200).json(resultDto);
        } catch (err) {
            console.error("Error in catch", err); // Логирование ошибки
            next(err); // Передаем ошибку дальше
        }
    };
}

module.exports = new EpicInformationController();
