class EpicsOrderUpdateDto {
    constructor({
        epicId,
        nextId
    }) {
        this.epicId = epicId;
        this.nextEpicId = nextId;
    }
}

module.exports = EpicsOrderUpdateDto;
