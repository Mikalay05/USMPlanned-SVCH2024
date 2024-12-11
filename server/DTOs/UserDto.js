module.exports = class UserDto{
    name;
    surname;
    patronymic;
    email;
    phone;
    login;
    role;
    constructor(model) {
        this.name = model.name;
        this.surname = model.surname;
        this.patronymic = model.patronymic;
        this.email = model.email;
        this.phone = model.phone;
        this.login = model.login;
        this.role = model.role;
    }
}