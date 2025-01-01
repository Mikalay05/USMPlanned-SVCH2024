const ApiError = require("../error/ApiError");
const { User, Role } = require("../models/models");
const bcrypt = require("bcrypt");
const UserDto = require("../DTOs/Data/UserDto");
const TokenService = require("./TokenService");

/*
* ====================
* Queries to DB
* ====================
*/
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");

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
      throw ApiError.badRequest("Surname is required.", {surnameErr: 'Surname is required.'});
    }
    // only letters of any case
    if (!/^[a-zA-Zа-яА-Я]+$/.test(surname)) {
      throw ApiError.badRequest("Surname must contain only letters.", {surnameErr: 'Surname must contain only letters.'});
    }
  }

  validationName(name) {
    // not null
    if (!name) {
      throw ApiError.badRequest("Name is required.", {nameErr: 'Name is required.'});
    }
    // only letters of any case
    if (!/^[a-zA-Zа-яА-Я]+$/.test(name)) {
      throw ApiError.badRequest("Name must contain only letters.", {nameErr: 'Name must contain only letters.'});
    }
  }

  validationPatronymic(patronymic) {
    // only letters of any case
    if (patronymic && !/^[a-zA-Zа-яА-Я]+$/.test(patronymic)) {
      throw ApiError.badRequest("Patronymic must contain only letters.", {patronymicErr: 'Patronymic must contain only letters.'});
    }
  }

  async validationEmail(email) {
    // not null
    if (!email) {
      throw ApiError.badRequest("Email is required.", {emailErr: 'Email is required.'});
    }
    // masked
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw ApiError.badRequest("Email is invalid.", {emailErr: 'Email is invalid'});
    }
    // unique
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest("Email is already in use.", {emailErr: 'Email is already in use.'});
    }
  }

  validationPhone(phone) {
    // masked or null
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phone && !phoneRegex.test(phone)) {
      throw ApiError.badRequest("Phone number is invalid.", {phoneErr: 'Phone number is invalid'});
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

  async validationRole(role) {
    const roleId = role?.roleId;
    if (!roleId) {
      throw ApiError.badRequest("Отсутствует идентификатор роли пользователя.", {roleErr: 'Нужно выбрать роль'});
    }
  
    const candidate = await Role.findOne({
      where: { [this.ROLE_PK_NAME]: roleId },
    });
    if (!candidate) {
      throw ApiError.badRequest("Некорректная роль пользователя.",{roleErr: 'Некорректная роль пользователя'});
    }
  }
  generatePassword() {
    //TODO принцип гинарции пароля
    const password = '1234qwer'
    return password;
  }
  async validation(name, surname, patronymic, email, phone, role) {
    const errors = {}; // Объект для хранения ошибок
  
    try {
      // Валидация имени
      try {
        this.validationName(name);
      } catch (err) {
        errors.nameErr = err.details?.nameErr || "Invalid name.";
      }
  
      // Валидация фамилии
      try {
        this.validationSurname(surname);
      } catch (err) {
        errors.surnameErr = err.details?.surnameErr || "Invalid surname.";
      }
  
      // Валидация отчества
      try {
        this.validationPatronymic(patronymic);
      } catch (err) {
        errors.patronymicErr = err.details?.patronymicErr || "Invalid patronymic.";
      }
  
      // Валидация email
      try {
        await this.validationEmail(email);
      } catch (err) {
        errors.emailErr = err.details?.emailErr || "Invalid email.";
      }
  
      // Валидация телефона
      try {
        this.validationPhone(phone);
      } catch (err) {
        errors.phoneErr = err.details?.phoneErr || "Invalid phone number.";
      }
  
      // Валидация роли
      try {
        await this.validationRole(role);
      } catch (err) {
        errors.roleErr = err.details?.roleErr || "Invalid role.";
      }
  
      // Если есть ошибки, выбрасываем исключение с объектом ошибок
      if (Object.keys(errors).length > 0) {
        throw ApiError.badRequest("Ошибка валидации", errors);
      }
  
      // Если ошибок нет, возвращаем данные пользователя
      const login = email;
      const password = this.generatePassword();
      const passwordHash = await this.validationPassword(password);
  
      return {
        login: login,
        passwordHash: passwordHash,
        role_id: role.roleId,
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
    return user;
  }
  async doesUserExist(login) {
    const userInDB = await User.findOne({ where: {login} });

    if (!userInDB) {
      throw ApiError.badRequest("Login not found");
    }
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
  async logout(refreshToken) {
    const resultDeleted = TokenService.deleteToken(refreshToken);
    return resultDeleted;
  }
  async getUserDataQuery(userId = null) {
    console.log("=====================")
    console.log("22222Cоздается пользователь")
    console.log("=====================")
    const params = [userId];
    console.log(params)
    // Выполнение запроса
    const resultOfGet = await dbQuery(QUERIES.GET_USER_DATA, params);

    // Проверка результата
    if (resultOfGet && resultOfGet[0] && resultOfGet[0].getuser) {
      console.log(resultOfGet[0].getuser)
        return resultOfGet[0].getuser; // Возвращаем данные
    }

    // Если данные отсутствуют, выбрасываем ошибку
    throw ApiError.notFound("Данные пользователя не найдены", { userId });
}
  async getAllUsers() {
    const result = await this.getUserDataQuery(1);
    return result;
  }
  async getByIdUser(userId) {
    const result = await this.getUserDataQuery(userId);
    return result;
  }
}

module.exports = new UserService();
