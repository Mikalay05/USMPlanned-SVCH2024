const ApiError = require("../error/ApiError");
const { Person } = require("../models/models");

class RoleController {
  Settings_PKNameInRequest = "person_id";
  Settings_ObjectBodyFormat = [
    { key: "surname", required: true},
    { key: "name", required: true},
    { key: "patronymic" },
    { key: "email", required: true, unique: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { key: "phone", unique: false, regex: /^\+?[0-9\s()-]{7,15}$/ },
  ];
  nameModel = "Person";
  Setting_PKNameInDb = "id";

  async getDataFromBody(body) {
    const result = {};

    for (const field of this.Settings_ObjectBodyFormat) {
      const { key } = field;
      result[key] = body[key];
    }
    console.log("получили тело", result);

    await this.checkValidationBody(result);
    console.log("прошел валидацию");
    return result;
  }

  getPKFromParams(params) {
    return params[this.Settings_PKNameInRequest];
  }

  async checkValidationBody(body) {
    for (const field of this.Settings_ObjectBodyFormat) {
      const { key, required = false, regex = null, unique = false } = field; 
      const value = body[key];

      // Проверка обязательных полей
      if (required && !value) {
        throw ApiError.badRequest(`Поле ${key} обязательно для заполнения`);
      }

      // Проверка формата
      if (value && regex && !regex.test(value)) {
        throw ApiError.badRequest(`Поле ${key} имеет неверный формат`);
      }

      // Проверка уникальности
      if (unique && value && !(await this.isUniqueValue(key, value))) {
        throw ApiError.badRequest(
          `Поле ${key} должно быть уникальным. Значение ${value} уже существует`
        );
      }
    }
    console.log("прошел валидацию всех полей");
  }

  async isUniqueValue(nameOfField, value) {
    try {
      const valueInDb = await Person.findOne({ where: { [nameOfField]: value } });
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
      throw ApiError.internal("Ошибка при создании объекта в базе данных");
    }
  }

  async deleteObjectInDataBases(pk) {
    try {
      const deletedResult = await Person.destroy({ where: { [this.Setting_PKNameInDb]: pk } });
      if (deletedResult === 0) {
        throw ApiError.notFound(`Объект ${this.nameModel} с ID ${pk} не найден для удаления`);
      }
      return deletedResult;
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }

  async getObjectInDataBases(pk) {
    try {
      const data = await Person.findOne({ where: { [this.Setting_PKNameInDb]: pk } });
      if (!data) {
        throw ApiError.notFound(`Объект ${this.nameModel} не найден`);
      }
      return data;
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объекта из базы данных");
    }
  }

  async getAllObjectInDataBases() {
    try {
      return await Person.findAll();
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объектов из базы данных");
    }
  }

  async updateObjectInDataBases(pk, body) {
    try {
      const [updatedCount, [updatedObject]] = await Person.update(body, {
        where: { [this.Setting_PKNameInDb]: pk },
        returning: true,
      });
      if (updatedCount === 0) {
        throw ApiError.notFound(`Объект ${this.nameModel} с ID ${pk} не найден для обновления`);
      }
      return updatedObject;
    } catch (error) {
      throw ApiError.internal("Ошибка при обновлении объекта в базе данных");
    }
  }

  // Request Handlers
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
      res.status(200).json({ message: `All ${this.nameModel} fetched`, dataFromDb });
    } catch (err) {
      next(err);
    }
  };

  deleteRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
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
      res.status(201).json({ message: `Created ${this.nameModel}`, resultObject });
    } catch (err) {
      next(err);
    }
  };

  updateRequest = async (req, res, next) => {
    const pk = this.getPKFromParams(req.params);
    try {
      const newObject = await this.getDataFromBody(req.body);
      const resultObject = await this.updateObjectInDataBases(pk, newObject);
      res.status(200).json({ message: `Updated ${this.nameModel} ${pk}`, resultObject });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new RoleController();