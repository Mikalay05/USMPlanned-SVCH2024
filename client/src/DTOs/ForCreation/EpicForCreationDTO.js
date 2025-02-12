class CustomerForCreationDTO {
    constructor({ 
        name, 
        next_id,
    }) {
        this.name = name;
        this.nextId = next_id;        
    }
}

module.exports = CustomerForCreationDTO;
