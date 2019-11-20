const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

//Create Schema
const UserSchema = new Schema({
    name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    status:{
        type:Boolean,
        default:false
    }
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

module.exports = User = mongoose.model('User',UserSchema,'users')
// const Account = mongoose.model('Account',UserSchema,'accounts');
// module.exports = Account;