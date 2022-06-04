const jwt = require("jsonwebtoken")
const doctorsModel = require("../database/models/doctors.model")
const auth = async( req, res, next ) =>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "") //bearer ey....
        const decodedtoken = jwt.verify(token, process.env.JWTKEY)
        const doctors = await doctorsModel.findOne({
            _id: decodedtoken._id, 
            'tokens.token': token
        })
        if(!doctors) throw new Error("doctors not found")
        // if(!doctors.status) throw new Error("please activate your account")
        req.doctors= doctors
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"unauthorized"
        })
    }
}
module.exports = auth