const ApiError = require("../error/ApiError");
const InformationService = require("../services/InformationService");
const InformationProjectDto = require('../DTOs/Data/InformationProjectDto')

class InformationController {
    async getProjectDataRequest(req, res, next) {
        try {
            // Используем req.params для получения параметров из пути
            const { projectId } = req.params;
            console.log('projectId',projectId)
            // Вызываем метод сервиса, передавая параметры
            const result = await InformationService.getData(projectId, null, null, null, null);
            console.log('result', result);
            
            // Создаем DTO, передавая объект, а не весь результат
            const resultDto = new InformationProjectDto(result);
            console.log(resultDto);
            
            // Отправляем результат в ответ
            res.status(200).json(resultDto);
            
        } catch (e) {
            next(e); // Перехватываем ошибку и передаем в следующий обработчик
        }
    }
}

module.exports = new InformationController();
