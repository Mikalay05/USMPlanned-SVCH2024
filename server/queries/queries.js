const QUERIES = {
    GET_ALL_PROJECTS: `SELECT * FROM get_project_data();`,
    GET_PROJECT_BY_ID: `SELECT * FROM get_project_data($1)`,
};

module.exports = QUERIES;
