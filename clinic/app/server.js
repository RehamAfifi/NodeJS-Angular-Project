const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
app.use(cors())
require('dotenv').config()
require("./database/connect")
const userRoutes = require("../routes/user.routes")
  const postRoutes = require("../routes/post.routes") 
app.use( express.static( path.join(__dirname, "../public") ))
app.use( express.urlencoded( { extended:true } ) )
app.use( express.json() )
app.use('/user',userRoutes) //   /=> /user/
// app.use('/post',postRoutes)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  res.send(req.file)
})
app.all("*", (req,res)=>{
    res.status(404).send({ error: "invalid url segment", apiStautus: false })
})
module.exports = app
// app.post("*", (req,res)=>{
//     res.send({
//         error: "invalid url segment",
//         apiStautus: false
//     })
// })
