class EpicInformationController {
    async getEpicById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in getEpicById:", err);
            next(err);
        }
    }

    async createStoryForEpic(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in createStoryForEpic:", err);
            next(err);
        }
    }

    async updateEpicData(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateEpicData:", err);
            next(err);
        }
    }

    async updateStoriesOrder(req, res, next) {
        try {
            //TODO Add a method implementation
            const { storyId, nextId } = req.query;
            throw new Error(`Not implemented. Params: storyId=${storyId}, nextId=${nextId}`);
        } catch (err) {
            console.log("Error in updateStoriesOrder:", err);
            next(err);
        }
    }

    async deleteEpicById(req, res, next) {
        try {
            //TODO Add a method implementation
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteEpicById:", err);
            next(err);
        }
    }
}

module.exports = new EpicInformationController();
