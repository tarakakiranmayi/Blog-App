//create the api
const exp=require('express')
const adminApp=exp.Router();
const bcryptjs=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config
let admincollection
adminApp.use((req,res,next)=>{
 admincollection=req.app.get("adminCollection")
 next()
})

adminApp.get('/new-adminUser',(req,res)=>{
    res.send({message:"welcome"})
})
adminApp.post('/adminNewUser',async (req,res)=>{
    const newuser=req.body
    const dbuser=await admincollection.findOne({username:newuser.username})
    if(dbuser!==null)
    {
        res.send({message:"Already user exist"})
    }
    else{
        const hashedpass=await bcryptjs.hash(newuser.password,6)
        newuser.password=hashedpass
        await admincollection.insertOne(newuser)
        res.send({message:"done",payload:newuser})
    }
})
adminApp.post('/adminLogin',async(req,res)=>{
    const user=req.body;
    const dbuser=await admincollection.findOne({username:user.username})
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
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_CODE,{expiresIn:30})
            res.send({message:"done",Token:signedToken})
        }
    }
})

adminApp.delete('/user',async(req,res)=>{
    await admincollection.deleteMany()
    res.send({message:"everything deleted"})
})

//export module
module.exports=adminApp;