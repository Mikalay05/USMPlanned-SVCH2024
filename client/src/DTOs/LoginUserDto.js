class LoginUserDto {
    constructor({ 
        login, 
        password, 
    }) {
        this.login = login;
        this.password = password;
    }
}

module.exports = LoginUserDto;
