const express=require("express")
const {Usermodel}=require("../model/usermodel")
const {Postmodel}=require("../model/postmodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const postRout=express.Router()




postRout.get("/",async (req,res)=>{
    let token=req.query.token
    jwt.verify(token, 'masai', async (err, decoded)=> {
        if(err){
            res.send("invalid token")
        }else{
            let data=await Postmodel.find()
            res.send(data)
        }
      })
    
})
postRout.post("/create",async (req,res)=>{
    let data=req.body
    //let { name,email,gender,password}=req.body
    try{
       
                let user=new Usermodel(data)
                await user.save()
                 res.send(user)
       
        
      
    }catch(err){
        res.send("can't register")
        console.log(err)
    }
     
    })
    postRout.patch("/update:id",async (req,res)=>{
        let id=req.params.id
        let data=req.body
        let post=await Postmodel.findOne({"_id":id})
        let userIdost=post.userID
        let userIDrequest=req.body.userId
        try{
            
         if(userIDrequest==userIdost){
            let newdata=await Postmodel.findByIdAndUpdate({"_id":id},data)
            
            res.send(newdata)
         }
            //res.send(user)
        }catch(err){
            res.send("can't create post")
            console.log(err)
        }
         
        })
        postRout.delete("/delete:id",async (req,res)=>{
            let id=req.params.id
            let data=req.body
            let post=await Postmodel.findOne({"_id":id})
            let userIdost=post.userID
            let userIDrequest=req.body.userId
            try{
                
             if(userIDrequest==userIdost){
                let newdata=await Postmodel.findByIdAndDelete({"_id":id},data)
                
                res.send(newdata)
             }
                //res.send(user)
            }catch(err){
                res.send("can't create post")
                console.log(err)
            }
             
            })
        module.exports={
            postRout
        }