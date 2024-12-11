const BaseCRUDController = require('./BaseCRUDController'); 
const { User } = require('../models/models');
const UserService = require("../services/UserService")
const TokenService   = require("../services/TokenService")
const TokenController = require("./TokenController")

class UserController extends BaseCRUDController {
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat)
    this.NAME_CONRTOLLER_IN_ERROR = "CONTROLLER = UserController";
  }
   registrationRequire = async(req,res,next) => {
    try {
      const {surname, name, patronymic, email, phone} = req.body;
      const {login, password, roleId} = req.body;
      
      const validDataUser = await UserService.validation(login, password, roleId, surname, name, patronymic, email, phone);

      const user =  await UserService.createUser(validDataUser)

      const payload = {
        login: user.login,
        login: user.roleId,

      }
      const tokens = TokenService.generateTokens(payload);

      const tokenInDb = await TokenController.saveToken(user.login, tokens.refreshToken);

      res.status(200).json({mess: "created user", user, tokens})
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
      { key: "surname", require: true},
      { key: "name", require: true},
      { key: "patronymic"},
      { key: "email", unique: true, require: true, regex: "/^[^\s@]+@[^\s@]+\.[^\s@]+$/"},
      { key: "phone", regex:"/^\+?[1-9]\d{1,14}$/"},
    ]);