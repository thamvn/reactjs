var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var option= {useNewUrlParser: true,useUnifiedTopology: true}

//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URL,option);
//
var productController=require('../controllers/product.controller')
var cartController = require('../controllers/cart.controller')
var userController = require('../controllers/user.controller')

var verifyToken = require('../middleware/verifyToken')

/*Get login page*/
router.post('/signin',userController.index)
/* GET home page. */
router.get('/product',productController.index);
router.get('/cart',cartController.index)

router.post('/cart/add',verifyToken,cartController.add);
router.post('/cart/remove',verifyToken,cartController.remove);

module.exports = router;
