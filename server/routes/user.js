const userRouter = require('express').Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/AuthMiddleware')

const pk =  'userId';
//Авторизация пользователя
userRouter.post("/login", userController.login);
//Получить список всех пользователей
userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter.get("/currentUserData", authMiddleware, userController.getCurrentUserData);


//Регистрация пользователя
userRouter.post("/reg", authMiddleware, userController.registration);



userRouter.post("/logout", authMiddleware, userController.logout);
userRouter.post(`/updateToken`, authMiddleware, userController.updateToken);
userRouter.get(`/data/:${pk}`, authMiddleware, userController.getByIdUser);



module.exports = userRouter;