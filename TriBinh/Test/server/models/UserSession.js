const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userID:{
        type:String,
        default:''
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('UserSession',UserSessionSchema)