class CustomerForCreationDTO {
    constructor({ 
        name, 
        nextId,
    }) {
        this.name = name;
        this.nextId = nextId;        
    }
}

module.exports = CustomerForCreationDTO;
