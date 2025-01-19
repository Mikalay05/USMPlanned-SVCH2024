const TaskService = require('../services/TaskService')
const TaskActionsDto = require('../DTOs/Data/Actions/TaskActionsDto')

class TaskInformationController {
    constructor(
        projectIdProperty = "projectId",
        customerIdProperty = "customerId",
        epicIdProperty = "epicId",
        storyIdProperty = "storyId",
        taskIdProperty = "taskId",

      ) {
        this.PROJECT_ID_PROPERTY = projectIdProperty;
        this.CUSTOMER_ID_PROPERTY = customerIdProperty;
        this.EPIC_ID_PROPERTY = epicIdProperty;
        this.STORY_ID_PROPERTY = storyIdProperty;
        this.TASK_ID_PROPERTY = taskIdProperty;
      }
    getTaskIdFromReqParams = (req) => {
        const taskId = req.params[this.TASK_ID_PROPERTY];
        return taskId;
      };
    getTaskActionById = async (req, res, next) => {
        try {
          // Получаем projectId из параметров
          const taskId = this.getTaskIdFromReqParams(req);
          // Получаем данные о проекте
          const data = await TaskService.getTaskActionById(taskId);
          // Создаем DTO для результата
          const resultDto = data.map((item) => new TaskActionsDto(item));
    
          return res.status(200).json({ taskActions: resultDto });
        } catch (err) {
          console.log("Error in catch", err); // Логирование ошибки
          next(err); // Передаем ошибку дальше
        }
      };

    async getTaskById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in getTaskById:", err);
            next(err);
        }
    }

    async updateTaskData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateTaskData:", err);
            next(err);
        }
    }

    async deleteTaskById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteTaskById:", err);
            next(err);
        }
    }
}

module.exports = new TaskInformationController();
