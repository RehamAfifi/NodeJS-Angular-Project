// const postModel = require("../database/models/post.model")
// class Post{
//     static add = async(req,res)=>{
//         try{
//             const postData = new postModel({
//                 ...req.body,
//                 userId:req.user._id
//             })
//             await postData.save()
//             res.status(200).send({
//                 apiStatus:true,
//                 data:postData,
//                 message:"post added"
//             })
//         }
//         catch(e){
//             res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"post adding error"
//             })
//         }
//     }
//     static all = async(req,res)=>{
//         try{
//             const posts = await postModel.find()
//             res.status(200).send({
//                 apiStatus:true,
//                 data:posts,
//                 message:"data loaded"
//             })
//         }
//         catch(e){
//             res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"error loading data"
//             })
//         }
//     }
//     static myPosts = async(req,res)=>{
//         try{
//             const posts = await postModel.find({userId: req.user._id})
//             res.status(200).send({
//                 apiStatus:true,
//                 data:{posts, user:req.user},
//                 message:"data loaded"
//             })
//         }
//         catch(e){
//             res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"error loading data"
//             })
//         }
//     }
//     static myPostsWithVirtual = async(req,res)=>{
//         try{
//             await req.user.populate("myPosts")
//             res.status(200).send({
//                 apiStatus:true,
//                 data:{posts:req.user.myPosts, user:req.user},
//                 message:"data loaded"
//             })
//         }
//         catch(e){
//             res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"error loading data"
//             })
//         }

//     }
// }
// module.exports = Post