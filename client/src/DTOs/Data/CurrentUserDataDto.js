class CurrentUserDataDto {
    constructor({ 
        id, 
        login, 
        surname, 
        name, 
        patronymic, 
        email, 
        phone, 
        role 
    }) {
        this.id = id;
        this.login = login;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.email = email;
        this.phone = phone;
        this.role = role ? { id: role.id, name: role.name } : null; // Обработка вложенного объекта role
    }
}

module.exports = CurrentUserDataDto;
