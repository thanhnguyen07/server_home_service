const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const username = encodeURIComponent('thanhjang2k');
const password = encodeURIComponent('123456tT');
const cluster = 'cluster0.cz1sb80.mongodb.net';
const authSource = 'retryWrites=true';
const authMechanism = 'w=majority';
const dbName = 'home_service';

mongoose.set('strictQuery', true);
const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?${authSource}&${authMechanism}`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connect MongoDB Cloud successfully!!!');
  } catch (error) {
    console.log('error:', error);
  }
}

module.exports = {connect};
