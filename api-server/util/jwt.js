const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  issueNewToken(req, res) {
    const userInfo = req.user;
    const token = jwt.sign(
      {
        userId: userInfo.user_id,
        userName: userInfo.name,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie('user_info', token, {
      httpOnly: false,
    });
  },
  decodeUserToken(req) {
    return req.cookies.user_info
      ? jwt.verify(req.cookies.user_info, process.env.JWT_SECRET_KEY)
      : null;
  },
  decodeJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  },
};
