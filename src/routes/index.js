const usersRouter = require('./users');
const servicesRouter = require('./services');

function route(app) {
  app.use('/users', usersRouter);
  app.use('/services', servicesRouter);
}
module.exports = route;
