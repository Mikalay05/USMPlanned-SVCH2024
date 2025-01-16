class TaskInformationController {
    async getTaskById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in getTaskById:", err);
            next(err);
        }
    }

    async updateTaskData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateTaskData:", err);
            next(err);
        }
    }

    async deleteTaskById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteTaskById:", err);
            next(err);
        }
    }
}

module.exports = new TaskInformationController();
