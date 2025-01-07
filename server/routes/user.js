const userRouter = require('express').Router();
const userController = require('../controllers/UserController');


const pk =  'userId';
//Получить список всех пользователей
userRouter.get("/", userController.getAllUsers);
//Получить данные конкретного пользователя
userRouter.get(`/:${pk}`, userController.getByIdUser);
//Регистрация пользователя
userRouter.post("/reg", userController.registration);
//Авторизация пользователя
userRouter.post("/login", userController.login);


userRouter.post("/logout", userController.logout);
// userRouter.put(`/:${pk}`, userController.updateRequest);
// userRouter.delete(`/:${pk}`, userController.deleteRequest);

userRouter.get('/tokens', userController.getTokens)


module.exports = userRouter;