const ApiError = require("../error/ApiError");

class BaseCRUDController {
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    this.model = model;
    this.nameModel = modelName;
    this.Settings_PKNameInRequest = pkNameInRequest;
    this.Setting_PKNameInDb = pkNameInDb;
    this.Settings_ObjectBodyFormat = objectBodyFormat;
  }

  async getDataFromBody(body) {
    const result = {};

    for (const field of this.Settings_ObjectBodyFormat) {
      const { key } = field;
      result[key] = body[key];
    }
    await this.checkValidationBody(result);
    return result;
  }

  getPKFromParams(params) {
    return params[this.Settings_PKNameInRequest];
  }

  async checkValidationBody(body) {
    for (const field of this.Settings_ObjectBodyFormat) {
      const { key, required = false, regex = null, unique = false } = field; 
      const value = body[key];

      if (required && !value) {
        throw ApiError.badRequest(`Поле ${key} обязательно для заполнения`);
      }

      if (value && regex && !regex.test(value)) {
        throw ApiError.badRequest(`Поле ${key} имеет неверный формат`);
      }

      if (unique && value && !(await this.isUniqueValue(key, value))) {
        throw ApiError.badRequest(`Поле ${key} должно быть уникальным. Значение ${value} уже существует`);
      }
    }
  }

  async isUniqueValue(nameOfField, value) {
    try {
      const valueInDb = await this.model.findOne({ where: { [nameOfField]: value } });
      return !valueInDb;
    } catch (error) {
      throw ApiError.internal("Ошибка при проверке уникальности");
    }
  }

  async createObjectInDataBases(object) {
    try {
      return await this.model.create(object);
    } catch (error) {
      throw ApiError.internal("Ошибка при создании объекта в базе данных");
    }
  }

  async deleteObjectInDataBases(pk) {
    try {
      const deletedResult = await this.model.destroy({ where: { [this.Setting_PKNameInDb]: pk } });
      if (deletedResult === 0) {
        throw ApiError.notFound(`Объект ${this.nameModel} с ID ${pk} не найден для удаления`);
      }
      return deletedResult;
    } catch (error) {
      throw ApiError.internal("Ошибка при удалении объекта из базы данных");
    }
  }

  async getObjectInDataBases(pk) {
    try {
      const data = await this.model.findOne({ where: { [this.Setting_PKNameInDb]: pk } });
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
      return await this.model.findAll();
    } catch (error) {
      throw ApiError.internal("Ошибка при получении объектов из базы данных");
    }
  }

  async updateObjectInDataBases(pk, body) {
    try {
      const [updatedCount, [updatedObject]] = await this.model.update(body, {
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

  // Методы-обработчики запросов
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
      res.status(200).json({ message: `Deleted in ${this.nameModel} element ${pk}. Count deleted: ${resultDeleted}` });
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

module.exports = BaseCRUDController;