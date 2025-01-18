const QUERIES = {
    GET_ALL_PROJECTS: `SELECT * FROM get_project_data($1,$2,$3);`, // Получение всех проектов
    GET_PROJECT_BY_ID: `SELECT * FROM process_data($1);`, // Получение проекта по ID
    CREATE_PROJECT: `SELECT create_project_and_action($1,$2,$3,$4,$5);`, // Создание проекта
    UPDATE_PROJECT: `SELECT update_project_and_log_action($1,$2,$3,$4,$5, $6);`, // Обновление проекта
    PROCESS_DATA: `SELECT * FROM process_data($1,$2,$3,$4,$5)`, //Данный для information
    GET_USER_DATA: `SELECT GetUser($1);`, 
};

module.exports = QUERIES;
