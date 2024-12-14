const BaseCRUDController = require("./BaseCRUDController");
const { User } = require("../models/models");
const UserService = require("../services/UserService");
const TokenService = require("../services/TokenService");
const TokenController = require("./TokenController");

class UserController extends BaseCRUDController {
  constructor(
    model,
    modelName,
    pkNameInRequest = "id",
    pkNameInDb = "id",
    objectBodyFormat = null
  ) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat);
    this.NAME_CONRTOLLER_IN_ERROR = "CONTROLLER = UserController";
    this.NAME_COOKIE_REFRESH_TOKEN = "refreshToken";
    this.MAX_AGE_FOR_REFRESH_TOKEN = 30*24*60*60*1000;
  }
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

      
      const tokenInDb = await TokenService.getTokenForUser(user)
      res.cookie(this.NAME_COOKIE_REFRESH_TOKEN, tokenInDb.value, {maxAge: MAX_AGE_FOR_REFRESH_TOKEN, httpOnly: true} )
      return res.status(200).json({ mess: "created user", user, ...tokens });
    } catch (err) {
      console.log(
        `${this.NAME_CONRTOLLER_IN_ERROR}. Method ==> registrationRequire`,
        err
      );
      next(err);
    }
  };
  loginRequire = async(req,res,next) => {
    try {
      const {login, password} = req.body;
      const user = UserService.loginUser(login, password);
      const tokenInDb = await TokenService.getTokenForUser(payload, user.login)
      res.cookie(this.NAME_COOKIE_REFRESH_TOKEN, tokenInDb.value, {maxAge: MAX_AGE_FOR_REFRESH_TOKEN, httpOnly: true} )
      return res.status(200).json({ mess: "created user", user, ...tokens });
    }
    catch(err){
      next(err);
    }
  }
}

const ApiError = require("../error/ApiError");
module.exports = new UserController(User, "Role", "login", "login", [
  { key: "login", unique: true, require: true },
  { key: "passwordHash", require: true },
  { key: "roleId", require: true },
  { key: "surname", require: true },
  { key: "name", require: true },
  { key: "patronymic" },
  {
    key: "email",
    unique: true,
    require: true,
    regex: "/^[^s@]+@[^s@]+.[^s@]+$/",
  },
  { key: "phone", regex: "/^+?[1-9]d{1,14}$/" },
]);
