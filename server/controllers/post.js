const Post = require('../models/post');

exports.getAllPost = async (req, res) => {
    try{
        const allPosts = await Post.find({});
        res.status(200).json({
            posts: allPosts
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({
            message: "There was server side erorr"
        })
    }
}

exports.addPost = async (req, res) => {
    console.log(req.body)
    const newPost = new Post(req.body);
    await newPost.save((error) => {
        if(error){
            res.status(500).json({
                message: "There are server side error"
            })
        }else{
            res.status(200).json({
                message: "Post has been added"
            })
        }
    })
}

exports.singlePost = async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id});
        res.status(200).json({
            post: post
        })
    }catch(error){
        res.status(500).json({
            message: "There was server side error",
            error: error.message
        })
    }
}


// Update a post
exports.updatePost = async (req, res) => {
    try{
        const filter = {_id: req.params.id};
        const result = await Post.updateOne(filter, req.body, { new: true });
        console.log(result);
        res.status(200).json({
            message: "Post has been updated",
            post: result
        })
    }catch(error){
        console.log(error.message);
        res.status(500).josn({
            message: error.message
        })
    }
}

// Delete a post
exports.deletePost = async (req, res) => {
    try{
        await Post.deleteOne({_id: req.params.id});

        res.status(200).json({
            message: "Post has been deleted"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}