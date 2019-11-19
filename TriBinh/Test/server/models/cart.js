const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CartSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    }
});

module.exports = Cart = mongoose.model('Cart',CartSchema,'carts')

