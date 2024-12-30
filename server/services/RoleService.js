const RoleDto = require("../DTOs/Data/RoleDto");
const ApiError = require("../error/ApiError");
const { Role } = require("../models/models");
class RoleService {
    async getAll() {
        try {
            const data = await Role.findAll();
            return data;
        }
        catch (err) {
            console.error("Error executing getAllProjectStatuses:", err);
            throw ApiError.internal("Ошибка при получении списка ролей");
        }
    }
    async getById(roleId) {
        try {
            const data = await Role.findOne({where: {id:  roleId}});
            return data;
        }
        catch (err) {
            console.error("Error executing getByIdProjectStatus:", err);
            throw ApiError.internal("Ошибка при получении роли");

        }
    }
}

module.exports = new RoleService();
