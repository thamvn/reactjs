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
    userID:{
        type:String
        
    },
    quantity:{
        type:Number,
        default:1

    },


   
})
module.exports=Cart=mongoose.model("Cart",CartSchema)