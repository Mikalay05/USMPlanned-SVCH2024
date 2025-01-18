class ProjectForUpdateDto {
    constructor({
        name,               // Новое имя проекта
        description,        // Новое описание проекта
        status_id,      // Новый статус проекта
    }) {
        this.name = name;
        this.description = description;
        this.status_id = status_id;
    }
}

module.exports = ProjectForUpdateDto;
