const projectRouter = require('express').Router();
const projectController = require('../controllers/ProjectController');
const authMiddleware = require('../middleware/AuthMiddleware')

const pk = "projectId";
//Получает все проекты, возращает его данные и проценты по существующий статусам заданий
projectRouter.get(`/`, authMiddleware, projectController.getAllProjects);
//Создает новый проект
projectRouter.post(`/`, authMiddleware, projectController.createProject);

module.exports = projectRouter;