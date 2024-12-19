const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

const ApiError = require("../error/ApiError");

class TokenService {
  EXPRES_IN_REFRESH = "30d";
  EXPRES_IN_ASSECC = "30m";
  PERENT_USER = "user_login";
  NAME_TOKEN_VALUE_COLUME_IN_DB = "value"
  PERENT_USER ='user_login';


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
  
  async saveToken(userLogin, refreshToken) {
      // Использование where для поиска
      const candidate = await Token.findOne({ where: { [this.PERENT_USER]: userLogin } });

      if (candidate) {
        candidate.value = refreshToken;
        await candidate.save();
        return candidate;
      }

      // Создание нового токена, если не найден
      const tokenInDb = await Token.create({ [this.PERENT_USER]: userLogin, value: refreshToken });
      return tokenInDb;
  }

  async getTokenForUser(user) {

    const payload = {
      login: user.login,
      roleId: user.role_id,
    };

    const tokens = this.generateTokens(payload);

    console.log("getTokenForUser")
    const tokenInDb = await this.saveToken(user.login, tokens.refreshToken);
    console.log("getTokenForUser End")

    if (!tokenInDb) {
      throw ApiError.badRequest("Failed to create the token");
    }
    return tokenInDb[this.NAME_TOKEN_VALUE_COLUME_IN_DB];
  }
  async deleteToken(refreshToken) {
    if (!refreshToken) {
        throw ApiError.badRequest("Need refreshToken for deletion.");
    }

    try {
        const resultDeleted = await Token.destroy({
            where: {[this.NAME_TOKEN_VALUE_COLUME_IN_DB]: refreshToken }
        });

        if (resultDeleted === 0) {
            throw ApiError.notFound("Token not found for deletion.");
        }
        return { message: "Token successfully deleted." };
    } catch (error) {
        console.error("Error while deleting token:", error);
        throw ApiError.internal("Error while deleting token.");
    }
}
}

module.exports = new TokenService();
