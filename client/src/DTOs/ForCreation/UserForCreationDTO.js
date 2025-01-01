class ProjectForCreationDTO {
    constructor({ name, surname, patronymic, email, phone, status }) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.email = email;
        this.phone = phone;
        this.status = status;
    }
}

module.exports = ProjectForCreationDTO;
