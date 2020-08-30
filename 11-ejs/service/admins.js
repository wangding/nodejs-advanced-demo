const { JWT_SECRET_KEY, MD5_SECRET_KEY } = require('../conf/constant'),
      jwt     = require('jsonwebtoken'),
      verify  = require('util').promisify(jwt.verify),
      crypto  = require('crypto');

async function getUserInfo(ctx) {
  const token = ctx.header.authorization.split(' ')[1];

  return await verify(token, JWT_SECRET_KEY);
}

function cryptoPwd(pwd) {
  let md5 = crypto.createHash('md5');

  return md5.update(`password=${pwd}&key=${MD5_SECRET_KEY}`)
            .digest('hex');
}

module.exports = {
  getUserInfo,
  cryptoPwd
};
