class ProjectDTO {
    constructor({ 
        project_id, 
        project_name, 
        project_description, 
        status_id, 
        status_name, 
        task_status_progress = null, // Прогресс по статусам заданий (JSONB)
        actions = null               // Список действий, связанных с проектом (если указано)
    }) {
        this.id = project_id; // Идентификатор проекта
        this.name = project_name; // Название проекта
        this.description = project_description; // Описание проекта
        this.status_id = status_id; // Идентификатор статуса проекта
        this.status_name = status_name; // Название статуса проекта
        this.task_status_progress = task_status_progress; // Прогресс по статусам заданий
        this.actions = actions ? actions.map(action => ({
            id: action.action_id, // Идентификатор действия
            description: action.description, // Описание действия
            user_id: action.user_id, // ID пользователя, связанного с действием
            created_at: action.created_at // Дата создания действия
        })) : null;
    }
}

module.exports = ProjectDTO;
