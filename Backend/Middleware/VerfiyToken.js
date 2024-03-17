const jsonWebToken=require('jsonwebtoken')
require('dotenv').config
const VerfiyToken=(req,res,next)=>{
const bearer=req.headers.authorization
if(!bearer)
{
    return res.send({message:"User login time out"})
}

    const Token=bearer.split(' ')[1]
    try{
        let decodedToken=jsonWebToken.verify(Token,process.env.SECRET_CODE,'1d')
        next()
    }
    catch(err)
    {
        next(err)
    }
}


module.exports=VerfiyToken
