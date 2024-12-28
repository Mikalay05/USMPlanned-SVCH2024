class InformationAboutProjectBasedPath {
    constructor({ 
        project_id, 
        project_name, 
        project_description, 
        status_id
    }) {
        this.id = project_id;
        this.name = project_name;
        this.description = project_description;
        this.status_id = status_id;
    }
}

module.exports = InformationAboutProjectBasedPath;
