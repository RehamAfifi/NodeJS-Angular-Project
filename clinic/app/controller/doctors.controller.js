const doctorsModel = require("../database/models/doctors.model")
const sendEmail = require("../helper/sendEmail.helper")
const path = require("path")
const fs = require("fs")

class Doctors{
    static register = async(req,res)=>{
        try{
            const doctors = new doctorsModel(req.body)
            await doctors.save()
            sendEmail(doctors.email)
            res.status(200).send({
                apiStatus:true,
                data: doctors,
                message:"doctors added successfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data: e.message,
                message:"doctors adding problem"
            })

        }
    }
    static login = async(req,res)=>{
        try{
            let doctors = await doctorsModel.logindoctors(req.body.email,req.body.password)
            let token = await doctors.generateToken()
            res.status(200).send({
                apiStatus:true, 
                data:{doctors, token}, 
                message:"doctors logged in"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"invalid login"})
        }
    } 
    
    static me = async(req,res)=>{
        res.send(req.doctors)
    }
    
    static availability = async(req,res)=>{
        try{
            req.doctors.available_days = req.body.available_days;
            await req.doctors.save()
            res.status(200).send({
                apiStatus:true,
                data:"updated",
                message:"available days updated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e.message, 
                message:"error on update available days"})
        }
    }
    
    static logOut = async(req,res)=>{
        try{
            req.doctors.tokens = req.doctors.tokens.filter(singleToken =>{
                return singleToken.token != req.token
            } )
            await req.doctors.save()
            res.status(200).send({
                apiStatus:true,
                message:"logged out",
                data:{}
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error on logout"})
        }
    }
    static logOutAll = async(req,res)=>{
        try{
            req.doctors.tokens = []
            await req.doctors.save()
            res.status(200).send({
                apiStatus:true,
                message:"logged out",
                data:{}
            })

        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"error on logout"})
        }
    }
    static editPassword = async(req,res)=>{
        try{
            const isValid = await req.doctors.checkPass(req.body.currentPass)
            if(!isValid) throw new Error("invalid Password")
            req.doctors.password = req.body.newPass
            await req.doctors.save()
            res.status(200).send({
                apiStatus:true,
                data:"updated",
                message:"password updated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                data:e.message, 
                message:"error on update password"})
        }
    }
    
    static alldoctorss = async(req,res)=>{
        try{
            const limitCount = Number(req.params.limitCount)
            const skipCount = Number(req.params.pageNum)*limitCount
            const doctorss = await doctorsModel.find().skip(skipCount).limit(limitCount)
            res.status(200).send({
                apiStatus:true,
                data:doctorss,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in fetching"
            })
        }
    }
    static singledoctors = async(req,res)=>{
        try{
            const doctors = await doctorsModel.findById(req.params.id)
            if(!doctors)
                return res.status(404).send({ apiStatus:false, data:{}, message:"doctors not found"})    
            res.status(200).send({ apiStatus:true, data:doctors, message:"data fetched" })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }

    }
    static editdoctors = async(req,res)=>{
        try{
            const invalidEdits = ["password", "tokens", "status", "__v", "updatedAt"]
            for (const property in req.body) {
                if(!invalidEdits.includes(property)) 
                    req.doctors[property] = req.body[property]
            }
            req.doctors.save()
            res.send({
                  apiStatus:true,
                  data:req.doctors,
                  message:"data updated"
              })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }
    }
    static activate =async(req,res)=>{
        try{
            if(req.doctors.status) throw new Error("already active")
            req.doctors.status=true
            await req.doctors.save()
            res.status(200).send({
                apiStatus:true,
                message:"updated",
                data: req.doctors
            })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }

    }
    static activateWithoutLogin =async(req,res)=>{
        try{
            const doctors = await doctorsModel.logindoctors(req.body.email, req.body.password)
//            if(!doctors) throw new Error("invalid")
            if(doctors.status) throw new Error("alerady activated")
            doctors.status=true
            await doctors.save()
            res.status(200).send({
                apiStatus:true,
                message:"updated",
                data:"updated"
            })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }
    }
    static changeImage =async(req,res)=>{
        try{
            // const filename= req.file.path +(path.extname(req.file.originalname)).toLowerCase()
            // fs.rename(req.file.path, filename, ()=>{})
            //req.file => originalname
            // req.doctors.image = filename
            req.doctors.image = req.file.path
            await req.doctors.save()
            res.send({
                apiStatus:true,
                data:req.doctors,
                message:"updated"
            })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }

    }
}
module.exports = Doctors