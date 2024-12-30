class ProjectInformationController {
    async getProjectById(req,res,next) {
        try {
            throw new Error("Not realized");
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
    async createCustomerForProject(req,res,next) {
        try {
            throw new Error("Not realized");
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
    async updateProjectData(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateCustomerData:", err);
            next(err);
        }
    }

    async updateCustomersOrder(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateEpicsOrder:", err);
            next(err);
        }
    }
    async deleteProjectById(req,res,next) {
        try {
            throw new Error("Not realized");
        }
        catch (err) {
            console.log("Error in catch", err)
            next(err)
        }
    }
}
module.exports = new ProjectInformationController();