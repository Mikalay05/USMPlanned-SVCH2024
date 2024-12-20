const projectRouter = require('express').Router();
const projectController = require('../controllers/ProjectController');

const pk =  "projectId";
projectRouter.get("/", projectController.getAllProjects);
projectRouter.get(`/:${pk}`, projectController.getByIdProject);
// projectRouter.post("/", projectController.createRequest);
// projectRouter.put(`/:${pk}`, projectController.updateRequest);
// projectRouter.delete(`/:${pk}`, projectController.deleteRequest);

module.exports = projectRouter;