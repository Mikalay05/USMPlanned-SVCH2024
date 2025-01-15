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
const UserDataUpdateDto = require("../DTOs/ForUpdate/UserDataUpdateDto");
const UserPasswordUpdateDto = require("../DTOs/ForUpdate/UserPasswordUpdateDto");
const CurrentUserData = require("../DTOs/Data/CurrentUserData");
const TokenService = require("../services/TokenService");

const NAME_COOKIE_REFRESH_TOKEN = "refreshToken";
const MAX_AGE_FOR_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000;

const OLD_PASSWORD_ERROR_FIELD = "oldPasswordErr";
const NEW_PASSWORD_ERROR_FIELD = "newPasswordErr";

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
      console.log("111111111111");
      const refreshToken = req.cookies[NAME_COOKIE_REFRESH_TOKEN];
      console.log("111111111111");

      const userDataFromToken = await UserService.validateRefreshToken(
        refreshToken
      );

      const tokens = await TokenService.getTokenForUser({
        id: userDataFromToken.id,
        role_id: userDataFromToken.roleId,
      });
      console.log("111111111111");

      TokenService.saveTokenInRequest(tokens.refreshToken, res);
      console.log("111111111111");

      res.status(200).json(tokens);
    } catch (err) {
      console.log("ERROR in request updateToken", err);
      next(err);
    }
  }
  async getCurrentUserData(req, res, next) {
    try {
      const { userIdFromToken } = req;
      console.log(userIdFromToken);
      // const userDto = await UserService.getByIdUser(userIdFromToken);
      const userData = await UserService.getByIdUser(userIdFromToken);
      const userDto = new UserDto(userData[0]);
      return res.status(200).json(userDto);
    } catch (err) {
      console.log("ERROR in getCurrentUserData", err);
      next(err);
    }
  }
  static getUserIdFromReqParams(req, nameOfPropertyUserId = "userId") {
    const result = req.params[nameOfPropertyUserId];
    if (!result) {
      throw ApiError.badRequest("UserId not has value");
    }
    return result;
  }
  async updateUser(req, res, next) {
    try {
      const userId = UserController.getUserIdFromReqParams(req);
      console.log("USER ID", userId);
      const formData = new UserDataUpdateDto(req.body);
      console.log("formData", formData);

      const result = await UserService.updateUser(userId, formData);
      return res.status(200).json({ message: "Updated data", result });
    } catch (err) {
      console.log("ERROR in updateUser", err);
      next(err);
    }
  }
  static getPasswordsFromReqBody(
    req,
    propertyNameOfOldPassword = OLD_PASSWORD_ERROR_FIELD,
    propertyNameOfNewPassword = NEW_PASSWORD_ERROR_FIELD
  ) {
    const data = new UserPasswordUpdateDto(req.body);
    if (!data.oldPassword) {
      throw ApiError.badRequest("Enter the old password", {
        [propertyNameOfOldPassword]: 'Enter the old password"',
      });
    }
    if (!data.newPassword) {
      throw ApiError.badRequest("Enter the new password", {
        [propertyNameOfNewPassword]: 'Enter the new password"',
      });
    }
    return data;
  }
  async changePassword(req, res, next) {
    try {
      const userId = UserController.getUserIdFromReqParams(req);
      const {oldPassword, newPassword} = UserController.getPasswordsFromReqBody(req);
      console.log("TESSST")
      console.log(userId, oldPassword, newPassword)

      const result = await UserService.changePassword(userId, oldPassword,newPassword);
      return res.status(200).json({message: "Password changed"})

    } catch (err) {
      console.log("ERROR in changePassword", err);
      next(err);
    }
  }
}

module.exports = new UserController();
