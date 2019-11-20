var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  model: String,
  price: String,
  status: String,
  selectedFile: String,
  thumbnailFile:String
});
var Product = mongoose.model('Product',productSchema,'products');
module.exports = Product