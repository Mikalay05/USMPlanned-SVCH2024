class CurrentUserData {
  constructor({
    id,
    login,
    surname,
    name,
    patronymic = null,
    email,
    phone = null,
    roleId,
    accessToken,
    refreshToken
  }) {
    this.id = id; // Идентификатор пользователя
    this.login = login; // Логин пользователя
    this.surname = surname; // Фамилия
    this.name = name; // Имя
    this.patronymic = patronymic; // Отчество (может быть null)
    this.email = email; // Email
    this.phone = phone; // Телефон (может быть null)
    this.roleId  = roleId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
  }
}

module.exports = CurrentUserData;
