//create the api
const exp=require('express')
const authorApp=exp.Router();
const bcryptjs=require('bcrypt')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
const VerfiyToken=require('../Middleware/VerfiyToken')
require('dotenv').config
let authorCollection
let articleCollection
authorApp.use((req,res,next)=>{
 authorCollection=req.app.get("authorCollection")
 next()
})
authorApp.use((req,res,next)=>{
    articleCollection =req.app.get('articleCollection')
    next()
})


authorApp.post('/authorNewUser',async (req,res)=>{
    const newuser=req.body
    const dbuser=await authorCollection.findOne({username:newuser.username})
    if(dbuser!==null)
    {
        res.send({message:"Already user exist"})
    }
    else{
        const hashedpass=await bcryptjs.hash(newuser.password,6)
        newuser.password=hashedpass
        await authorCollection.insertOne(newuser)
        res.send({message:"user created",payload:newuser})
    }
})
authorApp.post('/authorLogin',async(req,res)=>{
    const user=req.body;
    
    const dbuser=await authorCollection.findOne({username:user.username})
    
    if(dbuser===null)
    {
        res.send({message:"enter correct username"})

    }
    else{
        const status =await bcryptjs.compare(user.password,dbuser.password)
       
        if(status===false)
        {
            res.send({message:"Invalid password"})
        }
        else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_CODE,{expiresIn:900000})
            res.send({message:"done",Token:signedToken,user:dbuser})
        }
    }
})

authorApp.delete('/user',async(req,res)=>{
    await authorcollection.deleteMany()
    res.send({message:"everything deleted"})
})


authorApp.post('/new-article',VerfiyToken,expressAsyncHandler(
    async(req,res)=>{
        let newArticle=req.body
        await articleCollection.insertOne(newArticle);
        res.send({message:"new article created"})
    }
))

authorApp.get('/articles/:username',VerfiyToken,expressAsyncHandler((async(req,res)=>{
  
    let authorname=req.params.username
   
 let articles=await articleCollection.find({$and:[{author:authorname},{status:true}]}).toArray()

 res.send({message:"done",payload:articles})
})))
authorApp.put('/article',VerfiyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
   
    //update by article id
   let result= await articleCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articleCollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Article modified",article:latestArticle})
}))





//delete an article by article ID
authorApp.put('/article/:articleId',
VerfiyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.articleId);
    //get article 
    const articleToDelete=req.body;
      console.log(articleToDelete,artileIdFromUrl)
    if(articleToDelete.status===true){
       let modifiedArt= await articleCollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       console.log(modifiedArt)
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articleCollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
   
   
}))

//export module
module.exports=authorApp;