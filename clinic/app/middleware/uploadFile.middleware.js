const multer  = require('multer')
// const upload = multer({ dest: 'public/images/' })
// module.exports = upload
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/' )
    },
    filename: function(req, file, cb){
        const myName = Date.now()+path.extname(file.originalname).toLowerCase()
        cb(null, myName)
    }
})

const upload = multer({
    storage,
    limits: {fileSize:10000000},
    fileFilter: function(req,file, cb){
        if(path.extname(file.originalname).toLowerCase()!=".jpg") 
            return cb(new Error("invalid ext"), null)
        cb(null, true)
    }
})

module.exports = upload