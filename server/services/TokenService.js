const jwt = require('jsonwebtoken');
const {Token }= require('../models/models')
class TokenService {
    EXPRES_IN_REFRESH = '30d'
    EXPRES_IN_ASSECC = '30m'
    PERENT_USER = "user_login";

    generateRefreshToken(payload) {
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: this.EXPRES_IN_REFRESH})
        return refreshToken;
    }
    generateAccessToken(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: this.EXPRES_IN_ASSECC})
      return accessToken;
    }
    generateTokens(payload) {
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        return {
            accessToken,
            refreshToken
        }
    }

}

module.exports = new TokenService();