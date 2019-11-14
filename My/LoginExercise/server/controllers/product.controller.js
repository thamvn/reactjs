var Product = require('../models/product.model.js')

module.exports.index=function(req, res, next) {
     Product.find().then(function(products){
      //   res.json(products)
        res.status(200).send(products)
     });
}