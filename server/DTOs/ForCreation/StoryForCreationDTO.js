class StoryForCreationDTO {
    constructor({ 
        name,
        description, 
        nextId,
    }) {
        this.name = name;
        this.description = description;
        this.nextId = nextId;        
    }
}

module.exports = StoryForCreationDTO;
