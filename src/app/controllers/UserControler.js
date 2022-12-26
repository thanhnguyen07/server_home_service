const User = require('../models/User');

class UsersController {
  dataUsers(req, res) {
    User.find({})
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
}
module.exports = new UsersController();
