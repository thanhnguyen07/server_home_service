const User = require('../models/User');

class UsersController {
  dataUsers(req, res) {
    User.find({})
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }

  signUp(req, res) {
    User.find({email: req.body.email}, (err, user) => {
      if (user.length == 0) {
        const user = new User(req.body);
        user
          .save()
          .then(() => {
            console.log(
              '------------\nCreate User: ',
              req.body.email,
              '\n------------',
            );
            User.find({email: req.body.email}, (err, user) => {
              res.status(200).json({
                data: {idUser: user[0]._id},
                msg: 'Sign Up Success',
              });
            });
          })
          .catch(() => {});
      } else {
        console.log('------------\nEmail registered\n------------');
        res.status(500).json({msg: 'Email registered'});
      }
    });
  }
}
module.exports = new UsersController();
