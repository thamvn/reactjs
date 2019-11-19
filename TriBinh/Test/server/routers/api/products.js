const express = require('express');
const router = express.Router();

//Item Model
const product = require('../../models/product');

// @route GET api/products
// @desc Get All Items
// @access Public
router.get('/',(req,res)=>{
    product.find()
    .then(products => res.json(products))
    .catch()
});

// @route POST api/products
// @desc Create a Post
// @access Public
router.post('/add',(req,res)=>{
   const newProduct = new product({
       name: req.body.name,
       price: req.body.price,
   });
   newProduct.save().then(item => res.json(item))
                    .catch(err=>res.status(500).send(err))
});


module.exports = router;