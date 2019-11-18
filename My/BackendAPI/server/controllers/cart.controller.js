var Cart = require('../models/cart.model')

module.exports.index=function(req, res,) {
     Cart.find().then(function(items){
    //    res.render('index',{products:products})
        res.status(200).send(items)
     });
}
module.exports.add =async function(req,res){
     console.log(req.body)
    var i = await Cart.create(req.body);
    res.status(200).json(item);
}
module.exports.remove =async function(req,res){
   var name=req.params.name;
   Cart.findOneAndRemove({name:name},function(err){
       if(err){
        return res.status(500).send();
       }
       return res.status(200).send();

   })

}