const express=require('express')
const router=express.Router();
const Cart=require('../../models/Cart')


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
        productId:req.body._id,
        
    });
    newCart.save().then(cart=>res.json(cart))
                    .catch(err =>console.log(err))
 });
router.delete('/:id',(req,res)=>{
    Cart.findById(req.params.id)
    .then((cart)=>{
        if (cart) cart.remove();
        else res.status(400).send("k co item nay");    
    })
    .then((product)=>res.json({product}))
    .catch(err=>console.log(err))
})
router.get('/:id',(req,res)=>{
    Cart.findById(req.params.id)
        .then(product=>{
            if(product)
            res.json(product)
            else res.status(404).send('Item not exist')
        })
        .catch(err=>console.log(err))

});
router.put('/:id',(req,res)=>{
    Cart.findById(req.params.id)
    .then(product=>{
        if(product){
        product.name=req.body.name,
        product.price=req.body.price,
        product.img=req.body.img,
        product.productId=req.body._id,
        product.quantity=req.body.quantity
        }else res.status(500).send("Cannot find product")
        product.save()
    })
    
    .catch(err=>res.status(404).json({success:false}))
 });


module.exports=router;