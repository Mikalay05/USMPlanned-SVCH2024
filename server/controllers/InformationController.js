const ApiError = require("../error/ApiError");
const InformationService = require("../services/InformationService");
const InformationAboutProjectBasedPath = require('../DTOs/Data/InformationAboutProjectBasedPath')

class InformationController {
    async getRequest(req, res, next) {
        try {
            // Используем req.params для получения параметров из пути
            const { projectId, customerId, epicId, storyId, taskId } = req.params;

            // Вызываем метод сервиса, передавая параметры
            const result = await InformationService.getData(projectId, customerId, epicId, storyId, taskId);
            console.log(result)
            const resultDto = new InformationAboutProjectBasedPath(
                result.projectId,
                result.projectName,
                result.description,
                result.status,
                result.dataForSelect,
                result.actions
              );            console.log(resultDto)

            // Отправляем ответ с результатом
            res.status(200).json(resultDto);
        } catch (e) {
            next(e); // Перехватываем ошибку и передаем в следующий обработчик
        }
    }
}

module.exports = new InformationController();
