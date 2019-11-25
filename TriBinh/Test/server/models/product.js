const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isAdded:{
        type:Boolean,
        default:false
    }
});

module.exports = Products = mongoose.model('products',ProductSchema)

