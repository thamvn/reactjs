var express = require('express');
var router = express.Router();



//
var productController=require('../controllers/product.controller')

/* GET home page. */
router.get('/',productController.index);
<<<<<<< HEAD:My/backend_API/server/routes/index.js
router.get('/cart',cartController.index)

router.post('/cart/add',cartController.add);
router.delete('/cart/remove/:name',cartController.remove);
=======

>>>>>>> master:My/LoginExercise/server/routes/index.js

module.exports = router;
