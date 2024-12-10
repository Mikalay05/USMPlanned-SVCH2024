const BaseCRUDController = require('./BaseCRUDController'); 
const { User } = require('../models/models');
const UserService = require("../services/UserService")
const PersonService = require("../services/PersonService")

class UserController extends BaseCRUDController {
  NAME_CONRTOLLER_IN_ERROR = "CONTROLLER = UserController";
  COMMON_ROLE_USER = 2;
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat)
  }
  async registrationRequire(req,res,next) {
    try {
      //создаем информацию о персоне
      const {surname, name, patronymic, email, phone} = req.body;
      const validPersonData = await PersonService.validation(surname, name, patronymic, email, phone);
      const newPersonData = await PersonService.createPerson(validPersonData);
      //создаем пользователя с ссылкой на данные пользователя
      const {login, password, roleId} = req.body;
      const validDataUser = await UserService.validation(login, password, roleId, newPersonData.id);
      const user =  await UserService.createUser(validDataUser)

    }
    catch(err){
      console.log(`${NAME_CONRTOLLER_IN_ERROR}. Method ==> registrationRequire`, err)
      next(err)
    }

  }
}

const ApiError = require('../error/ApiError');
const { literal } = require('sequelize');
module.exports = new UserController(User, 'Role', 'login', 'login', [
      { key: "login", unique: true, require: true},
      { key: "passwordHash", require: true},
      { key: "roleId", require: true},
      { key: "personId", require: true}
]);