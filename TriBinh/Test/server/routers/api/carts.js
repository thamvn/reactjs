const express = require('express');
const router = express.Router();

//Item Model
const cart = require('../../models/cart');

// @route GET api/carts
// @desc Get All Items
// @access Public
router.get('/',(req,res)=>{
    cart.find()
    .then(item => res.json(item))
    .catch()
});

// @route POST api/carts
// @desc Create a Post
// @access Public
router.post('/add',(req,res)=>{
   const newCart = new cart({
       name: req.body.name,
       price: req.body.price,
       productId:req.body._id
       
   });
   newCart.save().then(item => res.json(item))
                    .catch(err=>res.status(500).send(err))
});
router.delete('/remove/:id',(req,res)=>{
    var id=req.params.id;
    cart.deleteMany({productId:id},function(err){
        if(err){
         return res.status(500).send();
        }
        return res.status(200).send();
    })
    // cart.findById(id).then(
    //     product=>{
    //         product.remove()
    //                 .then(cart=>res.json(cart))
    //                 .catch(err=>res.status(400).send(err))
    //     }
    // ).catch(err=>res.status(500).send("Product not exist"))

})
module.exports = router;