class StoryForCreationDTO {
    constructor({ 
        name,
        description, 
        next_id,
    }) {
        this.name = name;
        this.description = description;
        this.nextId = next_id;        
    }
}

module.exports = StoryForCreationDTO;
