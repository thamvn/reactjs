const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const utils = require('../../config/utils');
var validator = require("email-validator");
//User model
const User = require('../../models/User');

router.get('/',(req,res)=>{
  User.find()
        .then(users=>{return res.json(users)})
        .catch()
});

//Register user
router.post('/signup', (req,res,next)=>{
    const {body} = req;
    const {
        name,
        password
    } = body;
    
    let {email} = body;

    if(!name){
        return res.send({
            success: false,
            message: 'Error: Name cannot be blank.'
        });
    }
    if(!email){
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if(!password){
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    email = email.toLowerCase();

    User.find({
        email:email
    },(err,previousUsers)=>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error.'
            }); 
        }
        else if(previousUsers.length>0){
            return res.send({
               success:false,
               message:'Error: Account already exist.'
            });
        }

        if(!validator.validate(email)){
          return res.send({
            success:false,
            message:'Error: Invalid Email .... Ex: binh@gmail.com.'
         });
        }
        //Save new User
        const newUser = new User();
        newUser.email = email;
        newUser.name = name;
        newUser.password = newUser.generateHash(password);
        newUser.save((err,user)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: Server error.'
                 });
            }
            else{
                return res.send({
                    success:true,
                    message:`Account : ${user.name} signed up`
                    })
                }
            });
        });
    });
// router.post('/add',(req,res)=>{
//     const newUser = new user({
//         username:req.body.username,
//         password:req.body.password,
//         displayname:req.body.displayname,
//         phonenumber:req.body.phonenumber,
//         status:true
//     });
//     newUser.save().then(item => res.json(item))
//                      .catch(err=>res.status(500).send(err))
//  });

 router.post('/login', (req, res) => {
    const {body} = req;
    const {password} = body;
    let {email} = body;

    if(!email){
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if(!password){
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    
    email = email.toLowerCase();
    
      User.findOne({email}).then(
        user=>{
          if(!user){
            return res.send({
              success: false,
              message: 'Error: Invalid Email.'
          });
        }
          if(!user.validPassword(password))
          {
            return res.send({
              success: false,
              message: 'Error: Invalid Password.'
            });
          }else{
            if(user.status==false){
              return res.send({
                success: false,
                message: 'Error: Your Account is disabled!!'
              })
            }
            else{
              const payload={
                user : [
                   user.name,
                   user.roleAdmin,
                   user.status
                ]
              }
              const token = jwt.sign(payload, config.secret, 
                {expiresIn: config.tokenLife}
              );
  
              //get token to db
              user.token = token;
              user.save().then(res=>{return console.log(res)})
              return res.json({token,user:{name:user.name,roleAdmin:user.roleAdmin,status:user.status}})
            }
          }
      })
  })

  const TokenCheckMiddleware = async (req, res, next) => {
    // Lấy thông tin mã token được đính kèm trong request
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
      // Xác thực mã token và kiểm tra thời gian hết hạn của mã
      try {
        const decoded = await utils.verifyJwtToken(token, config.secret);
  
        // Lưu thông tin giã mã được vào đối tượng req, dùng cho các xử lý ở sau
        req.decoded = decoded;
        next();
      } catch (err) {
        // Giải mã gặp lỗi: Không đúng, hết hạn...
        console.error(err);
        return res.status(401).json({
          message: 'Unauthorized access.',
        });
      }
    } else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  }
  
  router.use(TokenCheckMiddleware);
  router.get('/profile',(req,res)=>{
    res.json(req.decoded)
  })


module.exports = router;