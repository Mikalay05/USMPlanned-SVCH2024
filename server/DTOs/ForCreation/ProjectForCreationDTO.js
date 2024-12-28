class ProjectForCreationDTO {
    constructor({ 
        name, 
        description, 
        status_id, 
    }) {
        this.name = name; // Название проекта
        this.description = description; // Описание проекта
        this.status_id = status_id; // Статус проекта
    }
}

module.exports = ProjectForCreationDTO;
