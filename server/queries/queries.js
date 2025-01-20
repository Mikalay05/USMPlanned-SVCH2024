const QUERIES = {
    GET_ALL_PROJECTS: `SELECT * FROM get_project_data($1,$2,$3);`, // Получение всех проектов
    GET_PROJECT_DATA_BY_ID: `SELECT * FROM process_project($1);`, 
    CREATE_PROJECT: `SELECT create_project_and_action($1,$2,$3,$4,$5);`, // Создание проекта
    UPDATE_PROJECT: `SELECT update_project_and_log_action($1,$2,$3,$4,$5, $6);`, // Обновление проекта
    PROCESS_DATA: `SELECT * FROM process_data($1,$2,$3,$4,$5)`, //Данный для information
    GET_USER_DATA: `SELECT GetUser($1);`, 
    GET_PROJECT_ACTIONS_BY_ID: 'SELECT * FROM get_project_actions($1);',
    GET_CUSTOMER_ACTIONS_BY_ID: 'SELECT * FROM get_customer_actions($1);',
    GET_EPIC_ACTIONS_BY_ID: 'SELECT * FROM get_epic_actions($1);',
    GET_STORY_ACTIONS_BY_ID: 'SELECT * FROM get_story_actions($1);',
    GET_TASK_ACTIONS_BY_ID: 'SELECT * FROM get_task_actions($1);',
};

module.exports = QUERIES;
