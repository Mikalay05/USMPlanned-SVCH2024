const userRouter = require('express').Router();
const userController = require('../controllers/UserController');


const pk =  'userId';
//Получить список всех пользователей
userRouter.get("/", userController.getAllUsers);
//Получить данные конкретного пользователя
userRouter.get(`/:${pk}`, userController.getByIdUser);
// userRouter.post("/registration", userController.registrationRequire);
// userRouter.post("/login", userController.loginRequire);
// userRouter.delete("/logout", userController.logoutRequire);
// userRouter.put(`/:${pk}`, userController.updateRequest);
// userRouter.delete(`/:${pk}`, userController.deleteRequest);



module.exports = userRouter;