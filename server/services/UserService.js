const ApiError = require('../error/ApiError');
const { User, Role, Person } = require('../models/models');
const bcrypt = require("bcrypt");

class UserService {
  COUNT_PASSWORD_HASH = 5;
  NAME_SERVICE_IN_ERROR = "SERVICE = UserService";

  async validationLogin(login) {
    // Наличие значения логина
    if (!login) {
      throw ApiError.badRequest("Некорректный логин пользователя.");
    }
    // Уникальность
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.badRequest("Логин уже занят.");
    }
  }

  async validationPassword(password) {
    // Наличие
    if (!password) {
      throw ApiError.badRequest("Некорректный пароль пользователя.");
    }
    // Хеширование
    const passwordHash = await bcrypt.hash(password, this.COUNT_PASSWORD_HASH);
    return passwordHash;
  }

  async validationRole(roleId) {
    const candidate = await Role.findOne({ where: { roleId } });
    if (!candidate) {
      throw ApiError.badRequest("Некорректная роль пользователя.");
    }
  }

  async validationPerson(personId) {
    const candidate = await Person.findOne({ where: { personId } });
    if (!candidate) {
      throw ApiError.badRequest("Некорректные информации о персоне.");
    }
  }

  async validation(login, password, roleId, personId) {
    try {
      await this.validationLogin(login);
      const passwordHash = await this.validationPassword(password);
      await this.validationRole(roleId);
      await this.validationPerson(personId);
      return {
        login: login,
        passwordHash: passwordHash,
        roleId: roleId,
        personId: personId
      };
    } catch (err) {
      console.log(`${this.NAME_SERVICE_IN_ERROR}. Method = validation`);
      throw err;
    }
  }

  async createUser(validDataUser) {
    const user = await User.create(validDataUser);
    return user;
  }
}

module.exports = new UserService();