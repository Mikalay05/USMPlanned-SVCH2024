const ApiError = require("../error/ApiError");

class UserController {
    /*
    *========== Request ==========
    */
    userLoginNameInRequest = 'userLogin';
    userBody = {
        login: "login",
        passwordHash: "passwordHash",
        personId: "personId", 
        roleId: "roleId"
    }

     getDataRequest = async (req, res)=> {
        const { [this.userLoginNameInRequest]: userPK } = req.params; 
        try {
            res.status(200).json({ message: `user ${userPK}` });
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
    deleteRequest = async(req,res) => {
        const { [this.userLoginNameInRequest]: userPK } = req.params;
        try {
            res.status(200).json({ message: `delete user ${userPK}` });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }
    createRequest = async (req,res) => {
        const { [this.userBody.login]: login
            , [this.userBody.passwordHash]: passwordHash
            , [this.userBody.roleId]: roleId
            , [this.userBody.personId]: personId
         } = req.body;

        res.status(200).json({ message: `create user ${login} ${passwordHash} ${roleId} ${personId}` });
    }
}

module.exports = new UserController();