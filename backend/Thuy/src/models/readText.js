const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
//=========================================
const texts = new Schema({
  id: ObjectId,
  text: String,
  userID: String
});
module.exports = mongoose.model('text', texts);