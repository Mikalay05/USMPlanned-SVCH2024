const ApiError = require("../error/ApiError");
const { User, Role } = require("../models/models");
const bcrypt = require("bcrypt");
const UserDto = require("../DTOs/UserDto");

const TEST_IN_CONSOLE = true;
function cl(message) {
  if(TEST_IN_CONSOLE) {
    console.log(message);
  }
}

class UserService {
  COUNT_PASSWORD_HASH = 5;
  NAME_SERVICE_IN_ERROR = "SERVICE = UserService";
  ROLE_PK_NAME = "id";
  async validationLogin(login) {
    // Наличие значения логина
    if (!login) {
      throw ApiError.badRequest("Некорректный логин пользователя.");
    }
    // Уникальность
    const candidate = await User.findOne({ where: login });
    if (candidate) {
      throw ApiError.badRequest("Логин уже занят.");
    }
  }
  validationSurname(surname) {
    // not null
    if (!surname) {
      throw ApiError.badRequest("Surname is required.");
    }
    // only letters of any case
    if (!/^[a-zA-Zа-яА-Я]+$/.test(surname)) {
      throw ApiError.badRequest("Surname must contain only letters.");
    }
  }

  validationName(name) {
    // not null
    if (!name) {
      throw ApiError.badRequest("Name is required.");
    }
    // only letters of any case
    if (!/^[a-zA-Zа-яА-Я]+$/.test(name)) {
      throw ApiError.badRequest("Name must contain only letters.");
    }
  }

  validationPatronymic(patronymic) {
    // only letters of any case
    if (patronymic && !/^[a-zA-Zа-яА-Я]+$/.test(patronymic)) {
      throw ApiError.badRequest("Patronymic must contain only letters.");
    }
  }

  async validationEmail(email) {
    // not null
    if (!email) {
      throw ApiError.badRequest("Email is required.");
    }
    // masked
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw ApiError.badRequest("Email is invalid.");
    }
    // unique
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest("Email is already in use.");
    }
  }

  validationPhone(phone) {
    // masked or null
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phone && !phoneRegex.test(phone)) {
      throw ApiError.badRequest("Phone number is invalid.");
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
    const candidate = await Role.findOne({
      where: { [this.ROLE_PK_NAME]: roleId },
    });
    if (!candidate) {
      throw ApiError.badRequest("Некорректная роль пользователя.");
    }
  }

  async validation(
    login,
    password,
    roleId,
    surname,
    name,
    patronymic,
    email,
    phone
  ) {
    try {
      await this.validationLogin(login);
      const passwordHash = await this.validationPassword(password);
      await this.validationRole(roleId);
      this.validationSurname(surname);
      this.validationName(name);
      this.validationPatronymic(patronymic);
      await this.validationEmail(email);
      this.validationPhone(phone);

      return {
        login: login,
        passwordHash: passwordHash,
        role_id: roleId,
        surname: surname,
        name: name,
        patronymic: patronymic,
        email: email,
        phone: phone,
      };
    } catch (err) {
      console.log(`${this.NAME_SERVICE_IN_ERROR}. Method = validation`);
      throw err;
    }
  }

  async createUser(validDataUser) {
    const user = await User.create(validDataUser);
    return new UserDto(user);
  }
  async doesUserExist(login) {
    const userInDB = await User.findOne({ where: {login} });

    if (!userInDB) {
      throw ApiError.badRequest("Login not found");
    }
    console.log("Login exist");
    return userInDB;
  }
  async verifyPassword(password, correctPassowrdHash) {
    if (!password) {
      throw ApiError.badRequest("The password must be provided");
    }
    if (!correctPassowrdHash) {
      throw ApiError.badRequest("Error in DB with password");
    }
    const resultCompare = await bcrypt.compare(password, correctPassowrdHash);
    if (!resultCompare) {
      throw ApiError.badRequest("incorrect password");
    }
  }
  async loginUser(login, password) {
    const userData = await this.doesUserExist(login);
    await this.verifyPassword(password, userData.passwordHash);

    const userDtoData = new UserDto(userData);
    return userDtoData;
  }
}

module.exports = new UserService();
