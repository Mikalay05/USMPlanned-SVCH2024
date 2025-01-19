class EpicActionsDto {
    constructor({
        user, 
        action_id, 
        created_at, 
        description
    }) {
        this.user = {
            login: user.login, // Логин пользователя
            fullName: user.full_name // Полное имя пользователя
        };
        this.action_id = action_id; // Идентификатор действия
        this.created_at = created_at; // Дата и время создания
        this.description = description; // Описание действия
    }
}

module.exports = EpicActionsDto;
