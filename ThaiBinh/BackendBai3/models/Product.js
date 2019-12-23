const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//Create Schema
const ProductSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImg:String,
    imgThumbnail:String,
    
})
module.exports=Product=mongoose.model("Product",ProductSchema)