const  express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth')
const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+ file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true)
    }else{
        cb('please upload an image with format jpeg or png',false);
    }
    
    
}
const upload=multer({
    storage:storage,
    limits:{fileSize: 1024*1024*10},
    fileFilter:fileFilter
});
//Product Model
const Product=require('../../models/Product')


//@route GET api/products/num
//@des Get number of product records
//@access public

router.get('/num',(req,res)=>{
    Product.countDocuments()
            .then(num=>res.json(num))
            .catch(err=>{console.log(err);res.status(400).send(err)})

})

//@route GET api/products
//@des Get all products
//@access public

router.get('/',(req,res)=>{
    Product.find()
    .then(products=>res.json(products))
    .catch(err=>res.status(400).send(err))
})
//@route GET api/products/page
//@des Get products in page
//@access public
router.get('/:page/:size',(req,res)=>{
    let page=parseInt(req.params.page)
    let size=parseInt(req.params.size)
    let skip=size*(page-1)
    if(page<0 || page ===0){
        return res.status(404).json({message:'Invalid page number'})
    }else{
        
        Product.find().skip(skip).limit(size)
                .then(products=>res.json(products))
                .catch(err=>res.status(500).send({message:"Server Error!"}))
    }
})

//@route Post api/products
//@des create new product
//@access private

router.post('/',auth,upload.single('productImage'),(req,res)=>{
    
    let newProduct=new Product({
        name:req.body.name,
        price:req.body.price,
        productImg:req.file.path
        
    });
    newProduct.save().then(product=>res.json(product))
                    .catch(err=>res.status(400).send(err))
})
//@route Post api/products/:id
//@des Delete a product
//@access private
router.delete('/:id',auth,(req,res)=>{
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
//@route PUT api/products/id
// @des edit product by id
//@access Private
router.put('/:id',auth,(req,res)=>{
    Product.findById(req.params.id)

    .then(product=>{
        product.name=req.body.name,
        product.price=req.body.price,
        product.img=req.body.img,
       
        product.save().then(product=>res.json(product))
                        .catch(error=>res.status(400).send(error))
    })
    
    .catch(err=>res.status(404).json({err}))
 });
module.exports=router;