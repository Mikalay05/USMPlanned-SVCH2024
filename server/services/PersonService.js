const ApiError = require('../error/ApiError');
const { Person } = require('../models/models');

class PersonService {
  NAME_SERVICE_IN_ERROR = "SERVICE = PersonService";

  validationSurname(surname) {
    // not null
    if (!surname) {
      throw ApiError.badRequest("Surname is required.");
    }
    // only letters of any case
    if (!/^[a-zA-Zа-яА-Я]+$/.test(surname)) {
      throw ApiError.badRequest("Surname must contain only letters.");
    }
  }

  validationName(name) {
    // not null
    if (!name) {
      throw ApiError.badRequest("Name is required.");
    }
    // only letters of any case
    if (!/^[a-zA-Zа-яА-Я]+$/.test(name)) {
      throw ApiError.badRequest("Name must contain only letters.");
    }
  }

  validationPatronymic(patronymic) {
    // only letters of any case
    if (patronymic && !/^[a-zA-Zа-яА-Я]+$/.test(patronymic)) {
      throw ApiError.badRequest("Patronymic must contain only letters.");
    }
  }

  async validationEmail(email) {
    // not null
    if (!email) {
      throw ApiError.badRequest("Email is required.");
    }
    // masked
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw ApiError.badRequest("Email is invalid.");
    }
    // unique
    const candidate = await Person.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest("Email is already in use.");
    }
  }

  validationPhone(phone) {
    // masked or null
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if ( phone&& !phoneRegex.test(phone)) {
      throw ApiError.badRequest("Phone number is invalid.");
    }
  }

  async validation(surname, name, patronymic, email, phone) {
    try {
      this.validationSurname(surname);
      this.validationName(name);
      this.validationPatronymic(patronymic);
      await this.validationEmail(email);
      this.validationPhone(phone);
      return {
        surname: surname,
        name: name,
        patronymic: patronymic,
        email: email,
        phone: phone
      };
    } catch (err) {
      console.log(`${this.NAME_SERVICE_IN_ERROR}. Method = validation`);
      throw err;
    }
  }
  async createPerson(validationData) {
    const personResult = await Person.create(validationData)
    return personResult;
  }
}

module.exports = new PersonService();