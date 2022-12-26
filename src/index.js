//Import các thư viện cần dùng
const express = require('express');
const morgan = require('morgan');
const db = require('./config/db');
const port = 3000;
const app = express();
const route = require('./routes');

db.connect();

app.use(morgan('combined'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
