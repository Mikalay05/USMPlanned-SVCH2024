const { pluralize } = require("sequelize/lib/utils");
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
  Settings_requiredFields = [
    this.Settings_ObjectBodyFormat.surname,
    this.Settings_ObjectBodyFormat.name,
    this.Settings_ObjectBodyFormat.email,
  ];
  Settings_uniqueFields = [this.Settings_ObjectBodyFormat.email];
  nameModel = "Person";
  Setting_PKNameInDb = "id";

  async getDataFromBody(body) {
    let result = {};

    for (const key of Object.keys(this.Settings_ObjectBodyFormat)) {
      result[key] = body[this.Settings_ObjectBodyFormat[key]];
    }
    console.log("получили тело", result);

    await this.checkValidationBody(result);
    console.log("прошел валидацию");
    return result;
  }

  getPKFromParams(params) {
    const { [this.Settings_PKNameInRequest]: pk } = params;
    return pk;
  }
  async checkValidationBody(body) {
    //обязательные поля
    for (const field of this.Settings_requiredFields) {
      if (!body[field]) {
        throw ApiError.badRequest(`Поле ${field} обязательно для заполнения`);
      }
    }
    //Формат

    //уникальные значения
    for (const field of this.Settings_requiredFields) {
      if (!(await this.isUniqueValue(field, body[field]))) {
        throw ApiError.badRequest(
          `Поле ${field} должно быть уникальным. Значение ${body[field]} уже существует`
        );
      }
    }
  }
  async isUniqueValue(nameOfField, value) {
    try {
      const valueInDb = await Person.findOne({
        where: { [nameOfField]: value },
      });

      return !valueInDb;
    } catch (error) {
      console.error("Ошибка при проверке уникальности:", error);
      throw error;
    }
  }
  async createObjectInDataBases(object) {
    try {
      const resultObject = await Person.create(object);
      if (!resultObject) {
        throw ApiError.internal(`Объект в ${this.nameModel} не создан`);
      }
      return resultObject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("Ошибка при создании объекта в базе данных");
    }
  }
  async deleteObjectInDataBases(pk) {
    try {
      const deletedResult = await Person.destroy({
        where: { [this.Setting_PKNameInDb]: pk },
      });
      if (deletedResult === 0) {
        throw ApiError.notFound(
          `Объект ${this.nameModel} с ID ${pk} не найден для удаления`
        );
      }
      return deletedResult;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }
  async getObjectInDataBases(pk) {
    try {
      const data = await Person.findOne({
        where: { [this.Setting_PKNameInDb]: pk },
      });
      if (!data) {
        throw ApiError.notFound(`Объект ${this.nameModel} не найден`);
      }
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }
  async getAllObjectInDataBases() {
    try {
      const data = await Person.findAll();
      return data;
    } catch (error) {
      throw ApiError.internal(
        "Ошибка при получении объектов из базы данных" + error
      );
    }
  }
  async updateObjectInDataBases(pk, body) {
    try {
      const [updatedCount, [updatedObject]] = await Person.update(body, {
        where: { [this.Setting_PKNameInDb]: pk },
        returning: true,
      });

      if (updatedCount === 0) {
        throw ApiError.notFound(
          `Объект ${this.nameModel} с ID ${pk} не найден для обновления`
        );
      }
      return updatedObject;
    } catch (error) {
      console.error("Ошибка при обновлении объекта:", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("Ошибка при обновлении объекта в базе данных");
    }
  }

  /*
   *========== Request ==========
   */

  getDataRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
      const data = await this.getObjectInDataBases(pk);
      res.status(200).json({ message: `${this.nameModel} ${pk}`, data });
    } catch (err) {
      next(err);
    }
  };

  getAllRequest = async (req, res, next) => {
    try {
      const dataFromDb = await this.getAllObjectInDataBases();
      res
        .status(200)
        .json({ message: `All ${this.nameModel} fetched`, dataFromDb });
    } catch (err) {
      next(err);
    }
  };

  deleteRequest = async (req, res, next) => {
    try {
      const pk = this.getPKFromParams(req.params);
      const resultDeleted = await this.deleteObjectInDataBases(pk);
      res.status(200).json({
        message: `Deleted in ${this.nameModel} element ${pk}. Count deleted: ${resultDeleted}`,
      });
    } catch (err) {
      next(err);
    }
  };

  createRequest = async (req, res, next) => {
    try {
      const newObject = await this.getDataFromBody(req.body);
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
      console.log("pk", pk);

      const newObject = await this.getDataFromBody(req.body);
      console.log("тело запроса", newObject);

      const resultObject = await this.updateObjectInDataBases(pk, newObject);
      console.log("новый обьект");
      res
        .status(200)
        .json({ message: `Updated ${this.nameModel} ${pk}`, resultObject }); // Исправлено
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new RoleController();
