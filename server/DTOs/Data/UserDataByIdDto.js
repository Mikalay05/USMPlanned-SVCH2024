class UserDataById {
    constructor({
        user_id,
        login,
        surname,
        name,
        patronymic = null,
        email,
        phone = null,
        role
    }) {
        this.id = user_id; // Идентификатор пользователя
        this.login = login; // Логин пользователя
        this.surname = surname; // Фамилия
        this.name = name; // Имя
        this.patronymic = patronymic; // Отчество (может быть null)
        this.email = email; // Email
        this.phone = phone; // Телефон (может быть null)
        this.role = role ? { id: role.roleId, name: role.roleName } : null; // Роль как объект
    }
}

module.exports = UserDataById;
