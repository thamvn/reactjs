const express=require('express')
const router=express.Router();
const Cart=require('../../models/Cart')
const auth=require('../../middleware/auth')


//@route GET api/cart
// @des get cart
//@access Public
router.get('/',(req,res)=>{
    Cart.find()
        .then(carts=>res.json(carts))
        .catch(err =>res.status(400).send("Err: "+err))
});
//@route post api/cart
// @des create new cart
//@access Public
router.post('/',(req,res)=>{
    const newCart=new Cart({
        name:req.body.name,
        price:req.body.price,
        img:req.body.img,
        productId:req.body.productId,
        userId:req.body.userId,
        quantity:req.body.quantity  
        
    });
    newCart.save().then(cart=>res.json(cart))
                    .catch(err =>console.log(err))
 });
router.delete('/:id',(req,res)=>{
    Cart.findById(req.params.id)
    .then((cart)=>{
        if (cart) {
            cart.remove().then(product=>res.json(product))
        }
        else res.status(400).send("item is not exist");    
    })
    
    .catch(err=>console.log(err))
})
//get product in cart of specific user
router.get('/:userId/:productId',(req,res)=>{
    Cart.find({$and:[{userId:req.params.userId},{productId:req.params.productId}]})
        .then(product=>{
            if(product)
            res.json(product[0])
            else res.status(404).json({msg:'Item not exist'})
        })
        .catch(err=>console.log(err))

});
//Get user cart
router.get('/:id',(req,res)=>{
    let userId=req.params.id
   
    Cart.find({userId:userId})
        .then(products=>{
            if(products)
            res.json(products)
            else res.status(404).json({msg:'Not found'})
        })
        .catch(err=>console.log(err))
})


router.put('/:id',(req,res)=>{
    Cart.findById(req.params.id)
    .then(product=>{
        if(product){
       
        product.quantity=req.body.quantity
        }else res.status(500).send("Cannot find product")
        product.save()
    })
    
    .catch(err=>res.status(404).json({success:false}))
 });


module.exports=router;