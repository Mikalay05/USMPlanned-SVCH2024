class ProjectForCreationDTO {
    constructor({ 
        name, 
        description, 
        status_id
    }) {
        this.name = name;
        this.description = description;
        this.status_id = status_id;
    }
}

module.exports = ProjectForCreationDTO;
