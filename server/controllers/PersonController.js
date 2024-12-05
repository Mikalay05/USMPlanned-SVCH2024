const ApiError = require('../error/ApiError');

class RoleController {

    Settings_PKNameInRequest = 'person_id';
    Settings_ObjectBodyFormat = {
        surname: "surname",
        name: "name",
        patronymic: "patronymic",
        email: "email",
        phone: "phone"
    };
    nameModel = "Person"
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
            res.status(200).json({ message: `${this.nameModel} ${pk}` });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }

    getAllRequest = async (req, res) => {
        try {
            res.status(200).json({ message: `All ${this.nameModel} fetched` });
        } catch (err) {
            throw ApiError.badRequest(err.message || "An error occurred");
        }
    }

    deleteRequest = async (req, res) => {
        const pk = this.getPKFromParams(req.params); 
        try {
            res.status(200).json({ message: `Deleted ${this.nameModel} ${pk}` });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }

    createRequest = async (req, res) => {
        const newObject = this.getDataFromBody(req.body); 
        res.status(201).json({ message: `Created ${this.nameModel}`, newObject });
    }

    updateRequest = async (req, res) => {
        const pk = this.getPKFromParams(req.params); 
        const newObject = this.getDataFromBody(req.body); 
        res.status(200).json({ message: `Updated ${this.nameModel} ${pk}`, newObject });    
    }
}

module.exports = new RoleController();