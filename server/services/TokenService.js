const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");
const ApiError = require("../error/ApiError");
class TokenService {
  EXPRES_IN_REFRESH = "30d";
  EXPRES_IN_ASSECC = "30m";
  PERENT_USER = "user_login";

  generateRefreshToken(payload) {
    console.log(payload);
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: this.EXPRES_IN_REFRESH,
    });
    return refreshToken;
  }
  generateAccessToken(payload) {
    console.log(payload);
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: this.EXPRES_IN_ASSECC,
    });
    return accessToken;
  }
  generateTokens(payload) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
  async getTokenForUser(user) {
    const payload = {
      login: user.login,
      roleId: user.role_id,
    };
    const tokens = this.generateTokens(payload);

    const tokenInDb = await this.saveToken(login, tokens.refreshToken);
    if (!tokenInDb) {
      throw ApiError.badRequest("Failed to create the token");
    }
    return tokenInDb;
  }
}

module.exports = new TokenService();
