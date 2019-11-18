var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var option= {useNewUrlParser: true,useUnifiedTopology: true}

//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URL,option);
//
var productController=require('../controllers/product.controller')
var cartController = require('../controllers/cart.controller')
/* GET home page. */
router.get('/',productController.index);
router.get('/cart',cartController.index)

router.post('/cart/add',cartController.add);
router.delete('/cart/remove/:name',cartController.remove);

module.exports = router;
