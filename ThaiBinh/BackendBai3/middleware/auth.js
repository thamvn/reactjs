const jwt=require('jsonwebtoken')
const config=require('config')

auth=(req,res,next)=>{
    //Get token from header

    const token=req.header('x-auth-token');
    //Check for token
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }
    try{
        //verify token
        const decode = jwt.verify(token, config.get('jwtSecret'))
        //Add user from payload
        req.user = decode;
       
        next();
    }
    catch(e){
        res.status(401).json({msg:"Token is not valid"})
    }
    

}
module.exports = auth