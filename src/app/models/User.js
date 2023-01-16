const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema(
  {
    fistName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
  },
  {timestamps: true, versionKey: false},
);

module.exports = mongoose.model('User', User);
