class ReorderStoriesUpdateDto {
    constructor({
        nextId,
        storyId
    }) {
        this.nextId = nextId; 
        this.storyId = storyId; 
    }
}

module.exports = ReorderStoriesUpdateDto;
