class EpicsOrderUpdateDto {
    constructor({
        epicId,
        nextEpicId
    }) {
        this.epicId = epicId;
        this.nextEpicId = nextEpicId;
    }
}

module.exports = EpicsOrderUpdateDto;
