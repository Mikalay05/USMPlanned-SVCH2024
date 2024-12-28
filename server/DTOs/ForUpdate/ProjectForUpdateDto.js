class ProjectForUpdateDto {
    constructor({
        name,               // Новое имя проекта
        description,        // Новое описание проекта
        project_id,         // ID проекта
        status_id,      // Новый статус проекта
        action_description, // Описание действия
    }) {
        this.name = name;
        this.description = description;
        this.project_id = project_id;
        this.status_id = status_id;
        this.action_description = action_description;
    }
}

module.exports = ProjectForUpdateDto;
