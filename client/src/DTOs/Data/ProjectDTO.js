class ProjectDTO {
    constructor({ 
        id, 
        name, 
        description, 
        status_id
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status_id = status_id;
    }
}

module.exports = ProjectDTO;
