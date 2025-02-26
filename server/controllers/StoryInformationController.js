const StoryService = require('../services/StoryService')
const StoryActionsDto = require('../DTOs/Data/Actions/StoryActionsDto');
const InformationStoryDto = require('../DTOs/Data/Information/InformationStoryDto');
const { response } = require('express');

class StoryInformationController {
    constructor(
        projectIdProperty = "projectId",
        customerIdProperty = "customerId",
        epicIdProperty = "epicId",
        storyIdProperty = "storyId",
      ) {
        this.PROJECT_ID_PROPERTY = projectIdProperty;
        this.CUSTOMER_ID_PROPERTY = customerIdProperty;
        this.EPIC_ID_PROPERTY = epicIdProperty;
        this.STORY_ID_PROPERTY = storyIdProperty;
      }
      getParamsIdFromReq = (req) => {
        const projectId =Number(req.params[this.PROJECT_ID_PROPERTY]);
        const customerId = Number(req.params[this.CUSTOMER_ID_PROPERTY]);
        const epicId = Number(req.params[this.EPIC_ID_PROPERTY]);
        const storyId = Number(req.params[this.STORY_ID_PROPERTY]);
        return { customerId, projectId,epicId, storyId };
      };
    getStoryIdFromReqParams = (req) => {
        const storyId = req.params[this.STORY_ID_PROPERTY];
        return storyId;
      };
    getStoryActionById = async (req, res, next) => {
        try {
          // Получаем projectId из параметров
          const storyId = this.getStoryIdFromReqParams(req);
          // Получаем данные о проекте
          const data = await StoryService.getStoryActionById(storyId);
          // Создаем DTO для результата
          const resultDto = data.map((item) => new StoryActionsDto(item));
    
          return res.status(200).json({ storyActions: resultDto });
        } catch (err) {
          console.log("Error in catch", err); // Логирование ошибки
          next(err); // Передаем ошибку дальше
        }
      };
    getStoryById = async(req, res, next)=> {
        try {
            const paths = this.getParamsIdFromReq(req);
            const response = await StoryService.getStoryData(paths);
            const result = new InformationStoryDto(response);
            return res.status(200).json(result);
        } catch (err) {
            console.log("Error in getStoryById:", err);
            next(err);
        }
    }

    async createTaskForStory(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in createTaskForStory:", err);
            next(err);
        }
    }

    async updateStoryData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateStoryData:", err);
            next(err);
        }
    }

    async updateTasksOrder(req, res, next) {
        try {
            //TODO Add a method implementation
            const { taskId, nextId } = req.query;
            throw new Error(`Not implemented. Params: taskId=${taskId}, nextId=${nextId}`);
        } catch (err) {
            console.log("Error in updateTasksOrder:", err);
            next(err);
        }
    }

    async deleteStoryById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteStoryById:", err);
            next(err);
        }
    }
    getChainForSelect = async (req, res, next) => {
        try {
            // Получаем projectId из параметров
            const storyId = this.getStoryIdFromReqParams(req);
            // Получаем данные о проекте
            const data = await StoryService.getChainForSelect(storyId); 
            // Создаем DTO для результата
            const resultDto = data.map((item)=>new ChainForSelectionInTheProject(item));
            return res.status(200).json(resultDto);
        } catch (err) {
            console.log("Error in catch", err); // Логирование ошибки
            next(err); // Передаем ошибку дальше
        }
    };
}

module.exports = new StoryInformationController();
