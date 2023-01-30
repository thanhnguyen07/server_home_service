const User = require('../models/User');
const dotenv = require('dotenv');
const Token = require('../../utils/token');
const jwt = require('jsonwebtoken');

dotenv.config();

class UsersController {
  signUp(req, res) {
    const body = req.body;
    const email = req.body.email.toLowerCase();
    User.findOne({email: email}, (err, user) => {
      if (!user) {
        const newUser = {
          email: email,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
          type: body.type,
        };
        const createUser = new User(newUser);
        createUser
          .save()
          .then(() => {
            console.log('------------\nCreate User: ', email, '\n------------');
            User.findOne({email: email}, (err, user) => {
              const data = {userEmail: user.email};
              const token = Token.createToken(data);
              const refreshToken = Token.createRefreshToken(data);
              const customeResUser = user.toObject();
              delete customeResUser.password;
              delete customeResUser.createdAt;
              delete customeResUser.updatedAt;
              const resUser = {
                ...customeResUser,
                token: token,
                refreshToken: refreshToken,
                msg: 'Sign Up Success',
              };
              res.status(200).json({
                ...resUser,
              });
            });
          })
          .catch(() => {});
      } else {
        console.log(
          '------------\nEmail registered: ',
          email,
          '\n------------',
        );
        res.status(500).json({msg: 'Email registered'});
      }
    });
  }

  signIn(req, res) {
    const body = req.body;
    const email = body.email.toLowerCase();
    User.findOne({email: email, password: body.password}, (err, user) => {
      if (user) {
        const data = {userEmail: user.email};
        const token = Token.createToken(data);
        const refreshToken = Token.createRefreshToken(data);
        const customeResUser = user.toObject();
        delete customeResUser.password;
        delete customeResUser.createdAt;
        delete customeResUser.updatedAt;
        const resUser = {
          ...customeResUser,
          token: token,
          refreshToken: refreshToken,
          msg: 'Login Successfully',
        };
        res.status(200).json({
          ...resUser,
        });
      } else {
        res.status(400).json({msg: 'Incorrect account information'});
      }
    });
  }

  getProfile(req, res) {
    const _id = req.body._id;
    User.findOne({_id: _id}, (err, user) => {
      if (user) {
        const customeResUser = user.toObject();
        delete customeResUser.password;
        delete customeResUser.createdAt;
        delete customeResUser.updatedAt;
        const resUser = {
          ...customeResUser,
          msg: 'Login Successfully',
        };
        res.status(200).json({
          ...resUser,
        });
      } else {
        res.status(400).json({msg: 'Account does not exist'});
      }
    });
  }

  refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    const _id = req.body._id;
    jwt.verify(
      refreshToken,
      process.env.ACCESS_REFRESH_TOKEN_SECRET,
      (err, data) => {
        if (err) return res.status(403).send({msg: 'Forbidden'});
        User.findOne({_id: _id}, (err, user) => {
          if (user) {
            const data = {userEmail: user.email};
            const token = Token.createToken(data);
            res.status(200).json({
              token: token,
            });
          } else {
            res.status(400).json({msg: 'Account does not exist'});
          }
        });
      },
    );
  }
}
module.exports = new UsersController();
