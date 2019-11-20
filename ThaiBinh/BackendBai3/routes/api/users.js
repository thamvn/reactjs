const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
//Product Model
const User = require('../../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
//@route  GET api/users/register
//@desc  register new user
//access public
router.post('/register',
   async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const { name, email, password, img } = req.body;
       try{
           let user=await User.findOne({email});
           if(user){
              return res.status(400).json({msg:'User already exist' })
           }
           user=new User({
               name,
               email,
               password,
               img
           })
           //Encrypt password

            const salt=await bcrypt.genSalt(10);

            user.password=await bcrypt.hash(password,salt);

            await user.save();
            
            const payload={
                user:{
                    id:user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn:3600},
                (err,token)=>{
                    if(err) throw err;
                    res.json({token,user:{name:user.name,email:user.email}})
                }

                
            )


       }catch(err){
           console.log(err.message);
           res.status(500).send('Server Error!')
       }
       //Check if user exist
        // User.findOne({ email })
        //     .then(user => {
        //         if (user) return res.status(400).json({ mes: 'user already exist' })
        //         const newUser = new User({
        //             name,
        //             password,
        //             email,
        //             img
        //         })
        //         //Create salt & hash
        //         bcrypt.genSalt(10, (err, salt) => {
        //             bcrypt.hash(newUser.password, salt, (err, hash) => {
        //                 if (err) throw err
        //                 newUser.password = hash;
        //                 newUser.save()
        //                     .then(user => {
        //                         jwt.sign(
        //                             { id: user.id },
        //                             config.get('jwtSecret'),
        //                             { expiresIn: 1800 },
        //                             (err, token) => {
        //                                 if (err) throw err
        //                                 res.json({
        //                                     token,
        //                                     user:
        //                                     {
        //                                         name: user.name,
        //                                         email: user.email
        //                                     }
        //                                 })
        //                             }
        //                         )
        //                         jwt.sign(a, a)

        //                     })

        //             })
        //         })
        //     })

    })

module.exports = router;