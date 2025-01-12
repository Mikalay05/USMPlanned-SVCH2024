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
const TokenService = require("../services/TokenService");

const NAME_COOKIE_REFRESH_TOKEN = "refreshToken";
const MAX_AGE_FOR_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000;
class UserController {
  constructor() {}

  registration = async (req, res, next) => {
    try {
      console.log("TTTTTTTTEST");
      const dataDto = new UserForCreationDTO(req.body);
      const user = await UserService.createUser(dataDto);
      if (!user) {
        throw ApiError.badRequest("Не удалось создать пользователя");
      }

      return res
        .status(200)
        .json({ mess: "created user", data: resultUserDto });
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

      TokenService.saveTokenInRequest(resultUserDto.refreshToken, res);

      return res.status(200).json({ message: "login user", resultUserDto });
    } catch (err) {
      console.log(
        `${this.NAME_CONRTOLLER_IN_ERROR}. Method ==> loginRequire`,
        err
      );
      next(err);
    }
  };
  logout = async (req, res, next) => {
    try {
      // Получаем refreshToken из куки
      const refreshToken = req.cookies[NAME_COOKIE_REFRESH_TOKEN];
      console.log(refreshToken);
      console.log(req.cookies); // Для отладки, выводим все куки
      console.log(req.cookies); // Для отладки, выводим все куки

      // Вызываем сервис для выхода
      const resultDelete = await UserService.logout(refreshToken);

      // Очищаем куку
      res.clearCookie(NAME_COOKIE_REFRESH_TOKEN);

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
      console.log("RESULT", result);
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
      console.log("TTTTTTTTESTTTTTT");
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

  async updateToken(req, res, next) {
    try {
      console.log("111111111111")
      const refreshToken = req.cookies[NAME_COOKIE_REFRESH_TOKEN];
      console.log("111111111111")

      const userDataFromToken = await UserService.validateRefreshToken(
        refreshToken
      );
      
      const tokens = await TokenService.getTokenForUser({id: userDataFromToken.id, role_id: userDataFromToken.roleId}) 
      console.log("111111111111")

      TokenService.saveTokenInRequest(tokens.refreshToken, res);
      console.log("111111111111")

      res.status(200).json(tokens);
    } catch (err) {
      console.log("ERROR in request updateToken", err);
      next(err);
    }
  }
}

module.exports = new UserController();
