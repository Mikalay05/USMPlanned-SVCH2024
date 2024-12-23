class ProjectForCreationDTO {
    constructor({ 
        project_name, 
        project_description, 
        status_id
    }) {
        this.name = project_name;
        this.description = project_description;
        this.status_id = status_id;
    }
}

module.exports = ProjectForCreationDTO;
