const projectRouter = require('express').Router();
const projectController = require('../controllers/ProjectController');

const pk = "projectId";
//Получает все проекты, возращает его данные и проценты по существующий статусам заданий
projectRouter.get("/", projectController.getAllProjects);
//Создает новый проект
projectRouter.post("/", projectController.createRequest);

module.exports = projectRouter;