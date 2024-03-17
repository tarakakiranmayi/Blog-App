
const exp=require('express')
const app=exp()
const path=require('path')
const cors=require('cors')
require('dotenv').config()
const port=process.env.PORT || 5000
//create the client mongobd
const mongoclient=require('mongodb').MongoClient;
const a=process.env.DB_URL


app.use(exp.static(path.join(__dirname,'../client/client/build')))

app.use(exp.json())
//connection of frontend and backend



//when we want to get component through the url path

mongoclient.connect(a)
.then((client)=>{console.log("webs erver connected to database")
const blogdb=client.db('BlogApp')
const usersCollection=blogdb.collection('usersCollection')
const adminCollection=blogdb.collection('adminCollection')
const authorCollection=blogdb.collection('authorCollection')
const articleCollection=blogdb.collection('articleCollection')
app.set('usersCollection',usersCollection)
app.set('adminCollection',adminCollection)
app.set('authorCollection',authorCollection)
app.set('articleCollection',articleCollection)
}
)
.catch((err)=>console.log(err,"why"))



//create api routes
const userApp=require('./API/user-api');
const authorApp=require('./API/author-api');
const adminApp=require('./API/admin-api');
//when /userapi is path send to userApp
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)
//to extract biody of request


app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/client/build/index.html'))
})
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})

app.listen(port,()=>console.log(` web server is running ${port}`))