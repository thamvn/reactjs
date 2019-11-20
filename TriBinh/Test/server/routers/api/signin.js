const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const UserSession = require('../../models/UserSession')
const bcrypt = require('bcryptjs')

router.get('/',(req,res)=>{
    User.find()
        .then(account => res.json(account))
        .catch()
})

//Register account
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
                    message:'signed up'
                    })
                }
            });
        });
    });

    //Login account
    router.post('/signin',(req,res,next)=>{
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

        User.find({
            email:email
        },(err,users) => {
            if(err){
                return res.send({
                    success : false,
                    message:"Error: Server error."
                });
            }
            if(users.length!=1){
                return res.send({
                    success: false,
                    message:"Error: Invalid Email"
                });
            }

            const user = users[0];
            console.log(user)
            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message:"Error: Invalid Password"
                });
            }

            const userSession = new UserSession();
            userSession.userID = user._id;
            userSession.save((err,doc)=>{
                if(err){
                    return res.send({
                        success : false,
                        message:"Error: Server error."
                    });
                }
                
                return res.send({
                    success: true,
                    message: 'Valid sign in !! Welcome '+ user.name,
                    token: doc._id
                });
            });

        })
    })

    //Verify
    router.get('/verify',(req,res,next)=>{
    console.log(12)
    //Get the token
    const { query } = req;
    const { token } = query;
    UserSession.find({
        _id:token,
        status: false
    }, (err,session) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server error"
            });
        }

        if(session.length != 1){
            return res.send({
                success: false,
                message: "Error: Invalid Account Session"
            });
        }else{
            return res.send({
                success: true,
                message: "Good"
                });
            }
        })
    })

module.exports = router;