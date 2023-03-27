const express = require("express");
const { PostModel } = require("../model/postModel");


const postroute = express.Router();


postroute.post("/post",async(req,res)=>{
    try {
        const post = new PostModel(req.body);
        await post.save();

    } catch (error) {
        console.log(error);
    }
})


postroute.get("/", async(req,res)=>{
    try {
        
        const postdata= await PostModel.find();

        res.send(postdata);

    } catch (error) {
    res.send(error);    
    }
})


postroute.patch("/update/:id", async(req,res)=>{
    try {
        await PostModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.send("post updated");
    } catch (error) {
        res.send(error);
    }
})

postroute.delete("/delete/:id", async(req,res)=>{
    try {
        await PostModel.findByIdAndDelete({_id:req.params.id},req.body);
        res.send("post updated");
    } catch (error) {
        res.send(error);
    }
})


module.exports={postroute};

