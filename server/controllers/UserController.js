const ApiError = require("../error/ApiError");

class UserController {

    Settings_PKNameInRequest = 'userLogin';
    Settings_ObjectBodyFormat = {
        login: "login",
        passwordHash: "passwordHash",
        personId: "personId", 
        roleId: "roleId"
    };
    nameModel = "User";

    getDataFromBody(body) {
        let result = {};
        for (const key of Object.keys(this.Settings_ObjectBodyFormat)) {
            result[key] = body[this.Settings_ObjectBodyFormat[key]];
        }
        return result;
    }

    getPKFromParams(params) {
        const { [this.Settings_PKNameInRequest]: pk } = params; 
        return pk;
    }

    /*
   *========== Request ==========
   */

  getDataRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
      res.status(200).json({ message: `${this.nameModel} ${pk}` });
    } catch (err) {
        next(ApiError.badRequest("Контроллер RoleController = Исключение в getDataRequest"));
    }
  };

  getAllRequest = async (req, res, next) => {
    try {
      res.status(200).json({ message: `All ${this.nameModel} fetched` });
    } catch (err) {
        next(ApiError.badRequest("Контроллер RoleController = Исключение в getAllRequest"));
    }
  };

  deleteRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
      res.status(200).json({ message: `Deleted ${this.nameModel} ${pk}` });
    } catch (err) {
        next(ApiError.badRequest("Контроллер RoleController = Исключение в deleteRequest"));
    }
  };

  createRequest = async (req, res, next) => {
    try {
      const newObject = this.getDataFromBody(req.body);
      res.status(201).json({ message: `Created ${this.nameModel}`, newObject });
    } catch (err) {
        next(ApiError.badRequest("Контроллер RoleController = Исключение в createRequest"));
    }
  };

  updateRequest = async (req, res, next) => {
    try {
      const pk = this.getPKFromParams(req.params);
      const newObject = this.getDataFromBody(req.body);
      res
        .status(200)
        .json({ message: `Updated ${this.nameModel} ${pk}`, newObject });
    } catch (err) {
      next(ApiError.badRequest("Контроллер RoleController = Исключение в updateRequest"));
    }
  };
}

module.exports = new UserController();
