const  express=require('express');
const router=express.Router();

//Product Model
const Product=require('../../models/Product')

//@route GET api/products
//@des Get all products
//@access public

router.get('/',(req,res)=>{
    Product.find()
    .then(products=>res.json(products))
    .catch(err=>res.status(400).send(err))
})
//@route Post api/products
//@des create new product
//@access public

router.post('/',(req,res)=>{
    let newProduct=new Product({
        name:req.body.name,
        price:req.body.price,
        img:req.body.img,
        imgThumbnail:req.body.imgThumbnail
    });
    newProduct.save().then(product=>res.json(product))
                    .catch(err=>res.status(400).send(err))
})
//@route Post api/products/:id
//@des Delete a product
//@access public
router.delete('/:id',(req,res)=>{
    Product.findById(req.params.id)
    .then(
        (product)=>{
            if(product)
            {product.remove().then(respone=>res.send({deleted:respone}))}
            else{res.status(400).send('Cannot find the product')}
        }
                        
    )
    .catch(err=>res.status(400).send(err))
})
//@route GET api/products/id
// @des get product by id
//@access Public
router.get('/:id',(req,res)=>{
    Product.findById(req.params.id)
        .then(product=>{
            if(product)
            res.json(product)
            else res.status(404).send('Item not exist')
        })
        .catch(err=>console.log(err))

});
router.put('/:id',(req,res)=>{
    Product.findById(req.params.id)

    .then(product=>{
        product.name=req.body.name,
        product.price=req.body.price,
        product.img=req.body.img,
       
        product.save().then(respone=>res.json(respone))
    })
    
    .catch(err=>res.status(404).json({err}))
 });

module.exports=router;