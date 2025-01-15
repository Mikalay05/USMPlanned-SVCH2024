const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

const ApiError = require("../error/ApiError");
const NAME_COOKIE_REFRESH_TOKEN = "refreshToken";
const MAX_AGE_FOR_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000;
class TokenService {
  EXPRES_IN_REFRESH = "30d";
  EXPRES_IN_ASSECC = "30m";
  PERENT_USER = "user_id";
  NAME_TOKEN_VALUE_COLUME_IN_DB = "value";

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

  async saveToken(userId, refreshToken) {
    const candidate = await Token.findOne({
      where: { [this.PERENT_USER]: userId },
    });

    if (candidate) {
      candidate.value = refreshToken;
      await candidate.save();
      return candidate;
    }

    // Создание нового токена, если не найден
    const tokenInDb = await Token.create({
      [this.PERENT_USER]: userId,
      value: refreshToken,
    });
    return tokenInDb;
  }

  async getTokenForUser(user) {
    const payload = {
      id: user.id,
      roleId: user.role_id,
    };
    
    const tokens = this.generateTokens(payload);

    console.log("getTokenForUser");
    console.log(user);
    const tokenInDb = await this.saveToken(user.id, tokens.refreshToken);
    console.log("getTokenForUser End");
    console.log(tokens)
    if (!tokenInDb) {
      throw ApiError.badRequest("Failed to create the token");
    }
    return tokens;
  }
  async deleteToken(refreshToken) {
    if (!refreshToken) {
      throw ApiError.badRequest("Need refreshToken for deletion.");
    }

    try {
      const resultDeleted = await Token.destroy({
        where: { [this.NAME_TOKEN_VALUE_COLUME_IN_DB]: refreshToken },
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
   validateToken(valueToken, secretKey) {
    try {
      if (!valueToken) {
        throw ApiError.unauthorized('Token is missing');
      }
      const result = jwt.verify(valueToken, secretKey);
      return result;
    } catch (err) {
      console.log('Error in TOKEN SERVICE validateToken:', err.message);
      throw err;
    }
  }

   validateAccessToken(valueToken) {
    try {
      const result=  this.validateToken(valueToken, process.env.JWT_ACCESS_SECRET_KEY);

      return result;
    } catch (err) {
      console.log("Error in TOKEN SERVICE validateAccessToken:", err)
      throw err;
    }
  }
   validateRefreshToken(valueToken) {
    try {
      const result = this.validateToken(valueToken, process.env.JWT_REFRESH_SECRET_KEY);
      return result;
    } catch (err) {
      console.log("Error in TOKEN SERVICE validateRefreshToken:", err)
      throw err;
    }
  }
  async findToken(tokenValue) {
    try {
      const tokenInDb = await Token.findOne({where: {value: tokenValue}})
      if(!tokenInDb) {
        throw ApiError.badRequest("Token not found.");
      }
      return tokenInDb;
    }
    catch (err) {
      console.log("Error in TOKEN SERVICE findToken:", err)
      throw err;
    }
  }
  saveTokenInRequest = (token, res, nameCookie=  NAME_COOKIE_REFRESH_TOKEN , maxAgeForToken= MAX_AGE_FOR_REFRESH_TOKEN) => {
    try {
      res.cookie(nameCookie, token, {
        maxAge: maxAgeForToken,
        httpOnly: true,
      });
    }
    catch(err) {
      console.log("Error in saveTokenInRequest", err)
      throw err;
    }
  }
}

module.exports = new TokenService();
