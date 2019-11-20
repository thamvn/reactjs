var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  email: String,
  password: String,
  key: String,
  secret_key: String
});
var Users = mongoose.model('Users',usersSchema,'users');
module.exports = Users