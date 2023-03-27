const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const userroute = express.Router();

userroute.post("/register",async (req,res)=>{


    try {
        const userdetails=req.body
        const user = await UserModel.find({email:userdetails.email});
        console.log(user);

        if(user){
            res.send("User already exist, please login")
        }else{

const hashpassword = await bcrypt.hashSync(userdetails.password,5);

userdetails.password=hashpassword;

const newuser = new UserModel(userdetails);
await newuser.save();

res.send("register successfully");

        }


        
    } catch (error) {
        console.log({"msg":error.message})
    }

})



userroute.post("/login" , async(req,res)=>{

    const payload = req.body;

    const user = await UserModel.find({email:payload.email});

    if(user){

        const password=await bcrypt.compareSync(payload.password,user.password);

        if(password){
            const token = await jwt.sign({
                email:user.email,
                userid:user._id
            },"masai");

            res.send("login successfull");
        }

    }else{
        res.send("signup first");
    }


})


module.exports={userroute}
