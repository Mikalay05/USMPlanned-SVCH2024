const { User } = require("../models/models");
const UserService = require("../services/UserService");
const ApiError = require("../error/ApiError");

/*
 * ====================
 * DTO require
 * ====================
 */
const UserDto = require("../DTOs/Data/UserDto");
const UserForCreationDTO = require("../DTOs/ForCreation/UserForCreationDto");
const CurrentUserData = require("../DTOs/Data/CurrentUserData");

const NAME_COOKIE_REFRESH_TOKEN = 'refreshToken'
const MAX_AGE_FOR_REFRESH_TOKEN = 30*24*60*60*1000;
class UserController {
  constructor() {}

  registration = async (req, res, next) => {
    try {
      const dataDto = new UserForCreationDTO(req.body);
      const user = await UserService.createUser(dataDto);
      if (!user) {
        throw ApiError.badRequest("Не удалось создать пользователя");
      }
      const resultUserDto = new CurrentUserData(user);
      res.cookie(
        NAME_COOKIE_REFRESH_TOKEN, resultUserDto.refreshToken, {
        maxAge: MAX_AGE_FOR_REFRESH_TOKEN,
        httpOnly: true,
      });
      return res.status(200).json({ mess: "created user", data: resultUserDto });
    } catch (err) {
      console.log(
        `${this.NAME_CONRTOLLER_IN_ERROR}. Method ==> registrationRequire`,
        err
      );
      next(err);
    }
  };
  login = async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const user = await UserService.loginUser(login, password);

      const resultUserDto = new CurrentUserData(user);
      res.cookie(
        NAME_COOKIE_REFRESH_TOKEN, resultUserDto.refreshToken, {
        maxAge: MAX_AGE_FOR_REFRESH_TOKEN,
        httpOnly: true,
      });

      return res.status(200).json({ message: "login user", resultUserDto });
    } catch (err) {
      console.log(
        `${this.NAME_CONRTOLLER_IN_ERROR}. Method ==> loginRequire`,
        err
      );
      next(err);
    }
  };
  logoutRequire = async (req, res, next) => {
    try {
      // Получаем refreshToken из куки
      const refreshToken = req.cookies[this.NAME_COOKIE_REFRESH_TOKEN];

      console.log(req.cookies); // Для отладки, выводим все куки
      // Проверяем, есть ли refreshToken
      if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token found." });
      }

      // Вызываем сервис для выхода
      const resultDelete = await UserService.logout(refreshToken);

      // Очищаем куку
      res.clearCookie(this.NAME_COOKIE_REFRESH_TOKEN);

      // Возвращаем успешный ответ
      return res
        .status(200)
        .json({ message: "User logged out successfully", resultDelete });
    } catch (err) {
      // Логируем ошибку
      console.log(
        `${this.NAME_CONTROLLER_IN_ERROR}. Method ==> logoutRequire`,
        err
      );
      next(err); // Передаем ошибку в следующий middleware
    }
  };

  async getAllUsers(req, res, next) {
    try {
      const result = await UserService.getAllUsers();
      console.log("RESULT",result)
      const resultDto = result.map((user) => {
        return new UserDto(user);
      });
      res.status(200).json(resultDto);
    } catch (err) {
      console.log("error in request getAllUsers", err);
      next(err);
    }
  }
  async getByIdUser(req, res, next) {
    try {
      console.log("=====================");
      console.log("3333Cоздается пользователь");
      console.log("=====================");
      const { userId } = req.params;
      const result = await UserService.getByIdUser(userId);
      console.log(result);
      const resultDto = new UserDto(result[0]);
      console.log(resultDto);
      res.status(200).json(resultDto);
    } catch (err) {
      console.log("error in request getByIdUser", err);
      next(err);
    }
  }
}

module.exports = new UserController();
