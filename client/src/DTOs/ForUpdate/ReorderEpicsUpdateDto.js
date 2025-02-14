class ReorderEpicsUpdateDto {
    constructor({
        nextId,
        epicId
    }) {
        this.nextId = nextId; // Идентификатор пользователя
        this.epicId = epicId; // Логин пользователя
    }
}

module.exports = ReorderEpicsUpdateDto;
