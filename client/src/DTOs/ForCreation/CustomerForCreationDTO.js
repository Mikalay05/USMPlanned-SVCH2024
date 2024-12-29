class CustomerForCreationDTO {
    constructor({ 
        name, 
        next_id,
        project_id
    }) {
        this.name = name;
        this.next_id = next_id;
        this.project_id = project_id;
        
    }
}

module.exports = CustomerForCreationDTO;
