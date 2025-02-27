class TaskStatusDto {
    constructor(serverData) {
        this.id = serverData.id;
        this.name = serverData.name;
    }
}

module.exports = TaskStatusDto;
