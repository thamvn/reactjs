var Product = require('../models/product.model')

module.exports.index=function(req, res,) {
     Product.find().then(function(products){
     //   res.render('index',{products:products})
        res.status(200).send(products)
        console.log(Product)
     });
}