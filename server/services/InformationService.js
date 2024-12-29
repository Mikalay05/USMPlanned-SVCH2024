const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const ApiError = require("../error/ApiError");

class ProjectService {
    async getData(projectId, customerId, epicId, storyId, taskId) {
        try {
            const params = [
                projectId,
                customerId || null,
                epicId || null,
                storyId || null,
                taskId || null
            ];

            const data = await dbQuery(QUERIES.PROCESS_DATA, params);
            const extractedData = Object.values(data[0])[0];

            return extractedData;
        }
        catch (e) {
            console.log("ERROR in getData in ProjectService", e);
            throw e;
        }
    }
}

module.exports = new ProjectService();
