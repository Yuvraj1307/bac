const express=require("express")
const {Usermodel}=require("../model/usermodel")
const {Postmodel}=require("../model/postmodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouts=express.Router()

userRouts.post("/register",async (req,res)=>{
    //let data=req.body
    let { name,email,gender,password}=req.body
    try{
        bcrypt.hash(password,5, async (err, hashpass)=> {
            if(err){
                console.log("can't rejister")
                console.log(err)
            }else{
                let user=new Usermodel( { name,email,gender,password:hashpass})
                await user.save()
                 res.send(user)
            }
        });
      
    }catch(err){
        res.send("can't register")
        console.log(err)
    }
     
    })
    userRouts.post("/login",async (req,res)=>{
        let {email,password}=req.body
        try{
            let user=await Usermodel.find({email:email})
            if(user.length>0){
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if(result==true){
                        var token=jwt.sign({userID:user[0]._id},"masai")
                        res.send({"msg":"login success","token":token})
                    }else{
                        res.send("can't hash pass")
                    }
                });
            }else{
                res.send("can't find user")
            }
            //res.send(user)
        }catch(err){
            res.send("can't login")
            console.log(err)
        }
         
        })
        module.exports={
            userRouts
        }