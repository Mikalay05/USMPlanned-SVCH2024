const QUERIES = {
    GET_ALL_PROJECTS: `SELECT * FROM get_project_data();`, // Получение всех проектов
    GET_PROJECT_BY_ID: `SELECT * FROM get_project_data($1);`, // Получение проекта по ID
    CREATE_PROJECT: `SELECT create_project_and_action($1,$2,$3,$4,$5);`, // Создание проекта
};

module.exports = QUERIES;
