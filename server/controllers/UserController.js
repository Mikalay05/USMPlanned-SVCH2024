const BaseCRUDController = require('./BaseCRUDController'); 

class UserController extends BaseCRUDController {
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat)
  }
}

const { User } = require('../models/models');
module.exports = new UserController(User, 'Role', 'login', 'login', [
      { key: "login", unique: true, require: true},
      { key: "passwordHash", require: true},
      { key: "roleId", require: true},
      { key: "personId", require: true}
]);