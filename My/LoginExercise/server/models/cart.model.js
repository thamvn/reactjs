var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  name: String,
  model: String,
  price: String,
  thumbnailFile:String
});
var Cart = mongoose.model('Cart',cartSchema,'cart');
module.exports = Cart