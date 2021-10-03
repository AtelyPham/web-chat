const mongoose = require('mongoose');
const userList = new mongoose.Schema({
    username: String, 
    password: String,
});

module.exports = mongoose.model('user',userList);