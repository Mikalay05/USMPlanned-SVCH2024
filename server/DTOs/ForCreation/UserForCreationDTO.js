class UserForCreationDTO {
    constructor({ 
        name, 
        surname, 
        patronymic, 
        email, 
        phone, 
        role 
    }) {
        this.name = name; // Имя пользователя
        this.surname = surname; // Фамилия пользователя
        this.patronymic = patronymic; // Отчество пользователя
        this.email = email; // Электронная почта пользователя
        this.phone = phone; // Телефон пользователя
        this.role = {
            roleId: role.roleId
        }; 
    }
}

module.exports = UserForCreationDTO;
