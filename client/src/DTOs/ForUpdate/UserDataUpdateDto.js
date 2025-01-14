class UserDataUpdateDto {
    constructor({ 
        login, 
        phone, 
    }) {
        this.login = login;
        this.phone = phone;
    }
}

module.exports = UserDataUpdateDto;
