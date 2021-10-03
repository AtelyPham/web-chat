const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  author: ObjectId,
  username: String,
  pw: String
});

module.exports = mongoose.model('user', user);