var Users = require('../models/user.model');
var jwt = require('jsonwebtoken');
const configToken = require('./../middleware/configToken');
module.exports.index= async function(req, res) {
    await Users.find(req.body,function (err, docs) {
        if(err){
            console.log(err)
        }
        if(docs.length===1){
            const token = jwt.sign(req.body, configToken.secret, {
                expiresIn: configToken.tokenLife,
            });
            return res.send({token:token})
        }
        else{
            return res.send("Invalid email or password, please try again!");
        }
    })
}