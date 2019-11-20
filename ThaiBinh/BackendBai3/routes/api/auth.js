const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
//Product Model
const User = require('../../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

//@route  GET api/auth
//@desc  Auth user
//access public
router.post('/login', 
    async (req, res) => {
       
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Ivalid Credentials' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({msg:'Ivalid Credentials'})
            }


            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token,user:{name:user.name} })
                }


            )


        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error!')
        }

    })


//@route  GET api/auth/
//@desc  get userdata 
//access private

// router.get('/user', auth ,(req,res)=>{
//     User.findById(req.user.id)
//         .select('-password')
//         .then(user=>res.json(user))
// })
router.get('/user', auth, async (req, res) => {
    try {
        const reqUser = req.user

        const user = await User.findById(reqUser.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router;