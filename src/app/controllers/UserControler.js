const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
class UsersController {
  signUp(req, res) {
    const body = req.body;
    const email = body.email.toLowerCase();
    User.find({email: email}, (err, user) => {
      if (user.length == 0) {
        const newUser = {
          email: email,
          password: body.password,
        };
        const user = new User(newUser);
        user
          .save()
          .then(() => {
            console.log(
              '------------\nCreate User: ',
              body.email,
              '\n------------',
            );
            User.find({email: email}, (err, user) => {
              res.status(200).json({
                data: {idUser: user[0]._id},
                msg: 'Sign Up Success',
              });
            });
          })
          .catch(() => {});
      } else {
        console.log(
          '------------\nEmail registered: ',
          body.email,
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
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30s',
        });
        const resUser = {idUser: user._id, token: token};
        if (body.password === dataUser.password) {
          res.status(200).json({
            resUser: resUser,
            msg: 'Login Successfully',
          });
        }
      } else {
        res.status(500).json({msg: 'Incorrect account information'});
      }
      // if (user.length == 0) {
      //   const user = new User(req.body);
      //   user
      //     .save()
      //     .then(() => {
      //       console.log(
      //         '------------\nCreate User: ',
      //         req.body.email,
      //         '\n------------',
      //       );
      //       User.find({email: req.body.email}, (err, user) => {
      //         res.status(200).json({
      //           data: {idUser: user[0]._id},
      //           msg: 'Sign Up Success',
      //         });
      //       });
      //     })
      //     .catch(() => {});
      // } else {
      //   console.log(
      //     '------------\nEmail registered: ',
      //     req.body.email,
      //     '\n------------',
      //   );
      //   res.status(500).json({msg: 'Email registered'});
      // }
    });
  }
}
module.exports = new UsersController();
