const QUERIES = {
  GET_ALL_PROJECTS: `SELECT * FROM get_project_data($1,$2,$3);`, // Получение всех проектов
  GET_PROJECT_DATA_BY_ID: `SELECT * FROM process_project($1);`,
  GET_CUSTOMER_DATA_BY_ID: `SELECT * FROM process_customer($1);`,
  GET_EPIC_DATA_BY_ID: `SELECT * FROM process_epic($1);`,
  GET_STORY_DATA_BY_ID: `SELECT * FROM process_story($1);`,
  GET_TASK_DATA_BY_ID: `SELECT * FROM process_task($1);`,
  CREATE_PROJECT: `SELECT create_project_and_action($1,$2,$3,$4,$5);`, // Создание проекта
  UPDATE_PROJECT: `SELECT update_project_and_log_action($1,$2,$3,$4,$5, $6);`, // Обновление проекта
  PROCESS_DATA: `SELECT * FROM process_data($1,$2,$3,$4,$5)`, //Данный для information
  GET_USER_DATA: `SELECT GetUser($1);`,
  GET_PROJECT_ACTIONS_BY_ID: "SELECT * FROM get_project_actions($1);",
  GET_CUSTOMER_ACTIONS_BY_ID: "SELECT * FROM get_customer_actions($1);",
  GET_EPIC_ACTIONS_BY_ID: "SELECT * FROM get_epic_actions($1);",
  GET_STORY_ACTIONS_BY_ID: "SELECT * FROM get_story_actions($1);",
  GET_TASK_ACTIONS_BY_ID: "SELECT * FROM get_task_actions($1);",
  GET_CHAIN_OF_CUSTOMERS_FOR_PROJECT:
    "SELECT * FROM get_chain_of_customers_for_project($1);", // Цепочка заказчиков для проекта
  GET_CHAIN_OF_EPICS_FOR_CUSTOMER:
    "SELECT * FROM get_chain_of_epics_for_customer($1);", // Цепочка эпиков для заказчика
  GET_CHAIN_OF_STORIES_FOR_EPIC:
    "SELECT * FROM get_chain_of_stories_for_epic($1);", // Цепочка историй для эпика
  GET_CHAIN_OF_TASKS_FOR_STORY:
    "SELECT * FROM get_chain_of_tasks_for_story($1);", // Цепочка задач для истории
  REOREDR_EPICS: "SELECT * FROM reorder_epics_with_log_action($1,$2,$3,$4,$5);",
  CREATE_CUSTOMER:
    "SELECT * FROM create_customer_and_log_action($1,$2,$3, $4,$5);",
  CREATE_EPIC: "SELECT * FROM create_epic_and_log_action($1,$2,$3, $4,$5, $6);",
  CREATE_STORY:
    "SELECT * FROM create_story_and_log_action($1,$2,$3, $4,$5, $6, $7,$8);",
  UPDATE_EPIC_DATA:
    "SELECT * FROM update_epic_with_log($1,$2,$3, $4,$5);",
    DELETE_EPIC: 
    "SELECT * FROM delete_epic($1,$2,$3, $4);"
};

module.exports = QUERIES;
