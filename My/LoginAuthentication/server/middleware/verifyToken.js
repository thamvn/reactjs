const jwt = require('jsonwebtoken');
const configToken = require('./configToken')
module.exports = (req,res,next)=>{
    const token = req.body.token;
    if(token){
        jwt.verify(token,configToken.secret,{
            expiresIn: configToken.tokenLife,},(err,decode)=>{
            if (err) {
                return res.json({
                  success: false,
                  message: 'Token is not valid'
                });
              } else {
                req.decoded = decode;
                next();
              }
        })
    }
    else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
    }
}