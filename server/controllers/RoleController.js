const BaseCRUDController = require('./BaseCRUDController'); 

class RoleController extends BaseCRUDController {
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat)
  }
}

const { Role } = require('../models/models');
module.exports = new RoleController(Role, 'Role', 'id', 'id', [
      { key: "name", required: true},
]);