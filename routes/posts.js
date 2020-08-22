const express=require("express");
const router=express.Router();
const Post=require('../models/Post');
const { json } = require("body-parser");
const { update } = require("../models/Post");


//get
router.get('/',async (req,res) => {
    try {
        const posts=await Post.find();
        res.json(posts);

    } 
    catch (err) {
        res.json({message:err});
    }
});

//submit post
router.post('/', async (req,res)=>{
    const post=new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost= await post.save();
        res.json(savedPost);
    }
    catch(err){
        res.json({message : err});
    }
});



//spesific post
router.get('/:postId', async (req,res) => { 
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }
    catch(err){
        res.json({message:err})
    }
});

//delete post
router.delete('/:postId', async (req,res) =>{
    try{
        const removedPost= await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }
    catch(err){
        res.json({message:err});
    }
});


//update post
router.put('/:postId',  async(req,res)=>{
    try{
        const updatePost= await  Post.updateOne(
            {_id: req.params.postId},
            {$set: {title:req.body.title} }
        );
        res.json(updatePost);
    }
        
    catch(err){
        res.json({message:err});

    }
});



module.exports=router;

