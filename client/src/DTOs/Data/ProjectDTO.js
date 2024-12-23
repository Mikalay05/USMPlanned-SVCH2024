class ProjectDTO {
    constructor({ 
        project_id, 
        project_name, 
        project_description, 
        status_name 
    }) {
        this.id = project_id;
        this.name = project_name;
        this.description = project_description;
        this.status = status_name;
    }
}

module.exports = ProjectDTO;
