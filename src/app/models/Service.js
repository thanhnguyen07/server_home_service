const mongoose = require('mongoose');
const {Schema} = mongoose;

const Service = new Schema(
  {
    serviceName: {type: String},
    image: {type: String},
  },
  {timestamps: true, versionKey: false},
);

module.exports = mongoose.model('Service', Service);
