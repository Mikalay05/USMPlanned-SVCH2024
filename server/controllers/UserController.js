const ApiError = require("../error/ApiError");

class UserController {

    Settings_PKNameInRequest = 'userLogin';
    Settings_ObjectBodyFormat = {
        login: "login",
        passwordHash: "passwordHash",
        personId: "personId", 
        roleId: "roleId"
    };

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

    getDataRequest = async (req, res) => {
        const pk = this.getPKFromParams(req.params); 
        try {
            res.status(200).json({ message: `User ${pk}` });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }

    async getAllRequest(req, res) {
        try {
            res.status(200).json({ message: 'All users fetched' });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }

    deleteRequest = async (req, res) => {
        const pk = this.getPKFromParams(req.params); 
        try {
            res.status(200).json({ message: `Deleted user ${pk}` });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }

    createRequest = async (req, res) => {
        const newObject = this.getDataFromBody(req.body); 
        res.status(201).json({ message: 'Created user', newObject });
    }

    updateRequest = async (req, res) => {
        const pk = this.getPKFromParams(req.params); 
        const newObject = this.getDataFromBody(req.body); 
        res.status(200).json({ message: `Updated user ${pk}`, newObject });    
    }
}

module.exports = new UserController();