const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_URL).then(
    (client)  =>  {
      console.log('Connected');
      _db = client.db('shop');
      callback()
    }
  ).catch(err => {
    console.log(err);
    throw err;
  });
}

const getDB = ()=> {
  if(_db) {
    return _db
  }
  throw 'No DB found'
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB