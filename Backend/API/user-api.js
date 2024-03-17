//create the api
const exp=require('express')
const userApp=exp.Router();
const commonApp=require('./common-api')
const bycryptjs=require('bcrypt')
const jwt=require('jsonwebtoken')

const eah=require('express-async-handler')
const VerfiyToken=require('../Middleware/VerfiyToken')
require('dotenv').config
let userCollection
let articleCollection
userApp.use((req,res,next)=>{
     userCollection=req.app.get("usersCollection")
        articleCollection=req.app.get("articleCollection")
    next()
})




userApp.post('/user',eah(
    async(req,res)=>{
        const newuser=req.body;
      
        const dbuser=await userCollection.findOne({username:newuser.username})
        if(dbuser!==null)
        {
            res.send({message:"enter correct username already exist"})
        }
        else{
           const hashedpass= await bycryptjs.hash(newuser.password,6)
           newuser.password=hashedpass
           await userCollection.insertOne(newuser)
           res.send({message:"user created"})
    
        }
    }
))
userApp.post('/login',async(req,res)=>{
    const user=req.body
    const dbuser= await userCollection.findOne({username:user.username})
    console.log(user,dbuser)
    if(dbuser===null)
    {
        res.send({message:"enter correct username"})
    }
    else{
        const status = await bycryptjs.compare(user.password,dbuser.password)
        console.log(status)
        if(status===false)
        {
            res.send({message:"Invalid password"})
        }
        else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_CODE,{expiresIn:300000})
            res.send({message:"done",Token:signedToken,user:dbuser})
        }
    }
})


userApp.delete('/user',async(req,res)=>{
    await userCollection.deleteMany()
    res.send({message:"everything deleted"})
})

userApp.post('/comments/:articleId',eah(async(req,res)=>{
    let articleId1=(+req.params.articleId)
    console.log(articleId1)
    let {comment}=req.body
    console.log(comment)
   let rese= await articleCollection.updateOne({articleId:articleId1},{$addToSet:{comments:comment}})
   
    res.send({message:"done",payload:comment})


}))
userApp.get('/articles',VerfiyToken,eah(async(req,res)=>{
   
    //get all articles
    let articlesList = await articleCollection.find({ status: true })
      .toArray();
    //send res
    res.send({ message: "articles", payload: articlesList });
}))

//export module
module.exports=userApp;