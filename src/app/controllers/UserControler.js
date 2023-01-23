const User = require('../models/User');
const dotenv = require('dotenv');
const token = require('../../utils/token');

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
          fistName: body.fistName,
          lastName: body.lastName,
        };
        const createUser = new User(newUser);
        createUser
          .save()
          .then(() => {
            console.log('------------\nCreate User: ', email, '\n------------');
            User.findOne({email: email}, (err, user) => {
              const data = {userEmail: user.email};
              const tokens = token.createToken(data);
              const customeResUser = user.toObject();
              delete customeResUser.password;
              delete customeResUser.createdAt;
              delete customeResUser.updatedAt;
              const resUser = {
                ...customeResUser,
                token: tokens.token,
                refreshToken: tokens.refreshToken,
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
        const tokens = token.createToken(data);
        const customeResUser = user.toObject();
        delete customeResUser.password;
        delete customeResUser.createdAt;
        delete customeResUser.updatedAt;
        const resUser = {
          ...customeResUser,
          token: tokens.token,
          refreshToken: tokens.refreshToken,
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
}
module.exports = new UsersController();
