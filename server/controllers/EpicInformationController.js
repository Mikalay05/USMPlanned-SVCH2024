const EpicService = require('../services/EpicService')
const EpicActionsDto = require('../DTOs/Data/Actions/EpicActionsDto')


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
    getEpicIdFromReqParams = (req) => {
        const epicId = req.params[this.EPIC_ID_PROPERTY];
        console.log("para", req.params)
        console.log("epicId", epicId)
        return epicId;
      };
    getEpicActionById = async (req, res, next) => {
        try {
          // Получаем projectId из параметров
          const epicId = this.getEpicIdFromReqParams(req);
          // Получаем данные о проекте
          const data = await EpicService.getEpicActionById(epicId);
          // Создаем DTO для результата
          const resultDto = data.map((item) => new EpicActionsDto(item));
    
          return res.status(200).json({ epicActions: resultDto });
        } catch (err) {
          console.log("Error in catch", err); // Логирование ошибки
          next(err); // Передаем ошибку дальше
        }
      };
    async getEpicById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in getEpicById:", err);
            next(err);
        }
    }

    async createStoryForEpic(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in createStoryForEpic:", err);
            next(err);
        }
    }

    async updateEpicData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateEpicData:", err);
            next(err);
        }
    }

    async updateStoriesOrder(req, res, next) {
        try {
            //TODO Add a method implementation
            const { storyId, nextId } = req.query;
            throw new Error(`Not implemented. Params: storyId=${storyId}, nextId=${nextId}`);
        } catch (err) {
            console.log("Error in updateStoriesOrder:", err);
            next(err);
        }
    }

    async deleteEpicById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteEpicById:", err);
            next(err);
        }
    }
    getChainForSelect = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const epicId = this.getEpicIdFromReqParams(req);
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
}

module.exports = new EpicInformationController();
