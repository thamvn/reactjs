var Cart = require('../models/cart.model')

module.exports.index=function(req, res,) {
     Cart.find().then(function(items){
        res.status(200).send(items)
     });
}
module.exports.add =async function(req,res){
    await Cart.create(req.body.item);
    res.status(200).json({success:true});
}
module.exports.remove =async function(req,res){
   var productID = req.body.item._id
   Cart.findByIdAndRemove({_id:productID},function(err){
       if(err){
        return res.status(500).send();
       }
       return res.status(200).send({success:true});

   })
}