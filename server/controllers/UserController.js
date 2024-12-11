const BaseCRUDController = require('./BaseCRUDController'); 
const { User } = require('../models/models');
const UserService = require("../services/UserService")
const PersonService = require("../services/PersonService")

class UserController extends BaseCRUDController {
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat)
    this.NAME_CONRTOLLER_IN_ERROR = "CONTROLLER = UserController";
  }
   registrationRequire = async(req,res,next) => {
    try {
      //создаем информацию о персоне
      const {surname, name, patronymic, email, phone} = req.body;
      const validPersonData = await PersonService.validation(surname, name, patronymic, email, phone);
      //создаем пользователя с ссылкой на данные пользователя
      const {login, password, roleId} = req.body;
      const validDataUser = await UserService.validation(login, password, roleId, newPerson.id);

      const newPerson = await PersonService.createPerson(validPersonData);
      const user =  await UserService.createUser(validDataUser)

      const refreshToken = UserService.generateRefreshToken();
      const accessToken = UserService.generateAccessToken();
      
      res.status(200).json({mess: "created user", newPerson, user, refreshToken, accessToken})
    }
    catch(err){
      console.log(`${this.NAME_CONRTOLLER_IN_ERROR}. Method ==> registrationRequire`, err)
      next(err)
    }

  }
}

const ApiError = require('../error/ApiError');
module.exports = new UserController(User, 'Role', 'login', 'login', [
      { key: "login", unique: true, require: true},
      { key: "passwordHash", require: true},
      { key: "roleId", require: true},
      { key: "personId", require: true}
]);