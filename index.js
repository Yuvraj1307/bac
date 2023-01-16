const express=require("express")
const {connection}=require("./config/db")
const {Usermodel}=require("./model/usermodel")
const {Postmodel}=require("./model/postmodel")
const {auth}=require("./middleware/authontication")
//const jwt=require("jsonwebtoken")
const {userRouts}=require("./routs/routs")
const {postRout}=require("./routs/postrout")
//const bcrypt=require("bcrypt")
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/user",userRouts)
app.use(auth)
app.use("/post",postRout)
    
    
 

require('dotenv').config()
app.listen(process.env.port,async()=>{

    try{
        await connection
        console.log("connected to database")
    }catch(err){
        console.log("can't connect database")
        console.log(err)
    }
})







// {
//     "name" : "String",
//   "email":"String",
//   "gender": "String",
//   "password" :"String"
//   }





// {
//     "email":"String",
//     "password" :"String"
//     }