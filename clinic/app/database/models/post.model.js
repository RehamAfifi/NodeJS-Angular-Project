// //title, content, file, userId
// const mongoose = require("mongoose")
// const PostSchema = mongoose.Schema({
//     userId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     postType:{
//         type:String,
//         required:true,
//         enum:['text', 'image', 'video']
//     },
//     title:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     content:{
//         type:String,
//         required: function(){return this.postType == 'text'}
//     },
//     file:{
//         type:String,
//         required: function(){return this.postType != 'text'}
//     }
// },{timeStamps:true})
// const Post = mongoose.model("Post", PostSchema)
// module.exports = Post