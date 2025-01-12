const userRouter = require('express').Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/AuthMiddleware')

const pk =  'userId';
//Получить список всех пользователей
userRouter.get("/", userController.getAllUsers);
userRouter.get('/updateToken',userController.updateToken)


//Регистрация пользователя
userRouter.post("/reg", authMiddleware, userController.registration);
//Авторизация пользователя
userRouter.post("/login", userController.login);


userRouter.post("/logout", userController.logout);
userRouter.post(`/updateToken`, userController.updateToken);
//Получить данные конкретного пользователя
userRouter.get(`/:${pk}`, userController.getByIdUser);


module.exports = userRouter;