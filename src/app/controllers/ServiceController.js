const Service = require('../models/Service');

class ServiceControler {
  getListService(req, res) {
    Service.find({})
      .then(service => res.json(service))
      .catch(err => console.log(err));
  }
}
module.exports = new ServiceControler();
