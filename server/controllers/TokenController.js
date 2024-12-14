const { Token } = require("../models/models");

class TokenController {
  PERENT_USER = 'user_login';

  async saveToken(userLogin, refreshToken) {

      // Использование where для поиска
      const candidate = await Token.findOne({ where: { [this.PERENT_USER]: userLogin } });
      console.log({ [this.PERENT_USER]: userLogin });

      if (candidate) {
        candidate.value = refreshToken;
        await candidate.save(); // Не забывайте использовать await
        return candidate;
      }

      // Создание нового токена, если не найден
      const tokenInDb = await Token.create({ [this.PERENT_USER]: userLogin, value: refreshToken });
      return tokenInDb;
  }
}

module.exports = new TokenController();