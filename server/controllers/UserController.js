const { User } = require("../models/models");
const UserService = require("../services/UserService");
const TokenService = require("../services/TokenService");

/*
 * ====================
 * DTO require
 * ====================
 */
const UserDto = require("../DTOs/Data/UserDto");

class UserController {
  constructor() {}

  registrationRequire = async (req, res, next) => {
    try {
      const { surname, name, patronymic, email, phone } = req.body;
      const { login, password, roleId } = req.body;

      const validDataUser = await UserService.validation(
        login,
        password,
        roleId,
        surname,
        name,
        patronymic,
        email,
        phone
      );

      const user = await UserService.createUser(validDataUser);

      if (!user) {
        throw ApiError.badRequest("Не удалось создать пользователя");
      }

      const tokenInDb = await TokenService.getTokenForUser(user);
      res.cookie(this.NAME_COOKIE_REFRESH_TOKEN, tokenInDb.value, {
        maxAge: this.MAX_AGE_FOR_REFRESH_TOKEN,
        httpOnly: true,
      });
      return res.status(200).json({ mess: "created user", user, ...tokenInDb });
    } catch (err) {
      console.log(
        `${this.NAME_CONRTOLLER_IN_ERROR}. Method ==> registrationRequire`,
        err
      );
      next(err);
    }
  };
  loginRequire = async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const user = await UserService.loginUser(login, password);

      const tokenInDb = await TokenService.getTokenForUser(user);
      res.cookie(this.NAME_COOKIE_REFRESH_TOKEN, tokenInDb.value, {
        maxAge: this.MAX_AGE_FOR_REFRESH_TOKEN,
        httpOnly: true,
      });

      return res.status(200).json({ mess: "login user", user, tokenInDb });
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
      const {userId} = req.params;
      const result = await UserService.getByIdUser(userId);
      console.log(result)
      const resultDto = new UserDto(result[0]);
      console.log(resultDto)
      res.status(200).json(resultDto);
    } catch (err) {
      console.log("error in request getAllUsers", err);
      next(err);
    }
  }
}

module.exports = new UserController();
