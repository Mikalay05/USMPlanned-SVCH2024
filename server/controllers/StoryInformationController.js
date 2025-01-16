class StoryInformationController {
    async getStoryById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in getStoryById:", err);
            next(err);
        }
    }

    async createTaskForStory(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in createTaskForStory:", err);
            next(err);
        }
    }

    async updateStoryData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateStoryData:", err);
            next(err);
        }
    }

    async updateTasksOrder(req, res, next) {
        try {
            //TODO Add a method implementation
            const { taskId, nextId } = req.query;
            throw new Error(`Not implemented. Params: taskId=${taskId}, nextId=${nextId}`);
        } catch (err) {
            console.log("Error in updateTasksOrder:", err);
            next(err);
        }
    }

    async deleteStoryById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteStoryById:", err);
            next(err);
        }
    }
}

module.exports = new StoryInformationController();
