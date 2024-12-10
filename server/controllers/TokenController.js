const BaseCRUDController = require('./BaseCRUDController'); 

class TokenController extends BaseCRUDController {
  constructor(model, modelName, pkNameInRequest = "id", pkNameInDb = "id", objectBodyFormat = null) {
    super(model, modelName, pkNameInRequest, pkNameInDb, objectBodyFormat)
  }
}

const { Token } = require('../models/models');
module.exports = new TokenController(Token, 'Token', 'id', 'id', [
      { key: "value", unique: true, require: true}
]);