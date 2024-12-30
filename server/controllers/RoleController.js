const RoleService =  require('../services/RoleService')
const RoleDto = require('../DTOs/Data/RoleDto')

class RoleController {
    constructor() {
        this.Settings_PKNameInRequest='roleId'
    }
async getAllRoles(req,res,next) {
    try {
        const roles =  await RoleService.getAll();
        const result = roles.map(row => new RoleDto(row));

        return res.status(200).json(result); 
    }
    catch(err) {
        console.log("error in getAllRoles", err)
        next(err)
    }
}
async getRoleById(req,res,next) {
    try {
        const { roleId } = req.params;
        console.log(roleId)
        const role =  await RoleService.getById(roleId);
        const result = new RoleDto(role);

        return res.status(200).json(result);     
    }
    catch(err) {
        console.log("error in getRoleById", err)
        next(err)
    }
}
}

module.exports = new RoleController();