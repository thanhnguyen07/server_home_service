const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const createToken = data => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign(data, process.env.ACCESS_REFRESH_TOKEN_SECRET, {
    expiresIn: '10 days',
  });
  return {token: token, refreshToken: refreshToken};
};

module.exports = {createToken};
