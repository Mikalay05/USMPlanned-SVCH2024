const {Token }= require("../models/models")

class TokenController {
  PERENT_USER = 'user_login'
  async saveToken(userLogin, refreshToken) {
    const candidate = await Token.findOne({[this.PERENT_USER]: userLogin})
    console.log("USERLOGIN")
    console.log({[this.PERENT_USER]: userLogin})
    if(candidate) {
        candidate.value = refreshToken;
        return candidate.save();
    }
    const tokenInDb = await Token.create({[this.PERENT_USER]: userLogin, value: refreshToken})
    return tokenInDb
}
}

module.exports = new TokenController();