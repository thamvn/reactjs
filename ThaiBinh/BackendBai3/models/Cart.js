const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CartSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,

    },
    img:String,
    
    productId:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:1

    },


   
})
module.exports=Cart=mongoose.model("Cart",CartSchema)