const ApiError = require("../error/ApiError");
const { Person } = require("../models/models");

class RoleController {
  Settings_PKNameInRequest = "person_id";
  Settings_ObjectBodyFormat = {
    surname: "surname",
    name: "name",
    patronymic: "patronymic",
    email: "email",
    phone: "phone",
  };
  nameModel = "Person";
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
  async createObjectInDataBases(object) {
    try {
      const resultObject = await Person.create(object);
      return resultObject;
    } catch (error) {
      throw ApiError.internal("Ошибка при создании объекта в базе данных");
    }
  }
  async deleteObjectInDataBases(pk) {
    try {
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }
  async getObjectInDataBases(pk) {
    try {
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }
  async getAllObjectInDataBases() {
    try {
      const data = await Person.findAll();
      return data;
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объектов из базы данных");
    }
  }
  async updateObjectObjectInDataBases(pk) {
    try {
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }

  /*
   *========== Request ==========
   */

  getDataRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
      res.status(200).json({ message: `${this.nameModel} ${pk}` });
    } catch (err) {
      next(err);
    }
  };

  getAllRequest = async (req, res, next) => {
    try {
      const dataFromDb = await this.getAllObjectInDataBases();
      res.status(200).json({ message: `All ${this.nameModel} fetched`, dataFromDb });
    } catch (err) {
      next(err);
    }
  };

  deleteRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
      res.status(200).json({ message: `Deleted ${this.nameModel} ${pk}` });
    } catch (err) {
      next(err);
    }
  };

  createRequest = async (req, res, next) => {
    try {
      const newObject = this.getDataFromBody(req.body);
      const resultObject = await this.createObjectInDataBases(newObject);
      res
        .status(201)
        .json({ message: `Created ${this.nameModel}`, resultObject });
    } catch (err) {
      next(err);
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
      next(err);
    }
  };
}

module.exports = new RoleController();
