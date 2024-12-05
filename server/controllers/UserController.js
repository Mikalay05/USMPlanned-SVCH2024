const BaseController = require("./BaseController");

const informationAboutControllerForError = 'CONTROLLER ==> UserController'

class UserController extends BaseController {
    getData = async(req, res) => {
        this.logMessage(`${informationAboutControllerForError} ==> getData`);
    }
}

module.exports = new UserController();