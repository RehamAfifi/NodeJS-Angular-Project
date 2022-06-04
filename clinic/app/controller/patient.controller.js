const patientModel = require("../database/models/patient.model")
const sendEmail = require("../helper/sendEmail.helper")
const path = require("path")
const fs = require("fs")
class Patient{
    static register = async(req,res)=>{
        try{
            const patient = new patientModel(req.body)
            await patient.save()
            sendEmail(patient.email)
            res.status(200).send({
                apiStatus:true,
                data: patient,
                message:"patient added successfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data: e.message,
                message:"patient adding problem"
            })

        }
    }
    static login = async(req,res)=>{
        try{
            let patient = await patientModel.loginpatient(req.body.email,req.body.password)
            let token = await patient.generateToken()
            res.status(200).send({
                apiStatus:true, 
                data:{patient, token}, 
                message:"patient logged in"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"invalid login"})
        }
    } 
    static me = async(req,res)=>{
        res.send(req.patient)
    }
    static logOut = async(req,res)=>{
        try{
            req.patient.tokens = req.patient.tokens.filter(singleToken =>{
                return singleToken.token != req.token
            } )
            await req.patient.save()
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
            req.patient.tokens = []
            await req.patient.save()
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
            const isValid = await req.patient.checkPass(req.body.currentPass)
            if(!isValid) throw new Error("invalid Password")
            req.patient.password = req.body.newPass
            await req.patient.save()
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
    static allpatients = async(req,res)=>{
        try{
            const limitCount = Number(req.params.limitCount)
            const skipCount = Number(req.params.pageNum)*limitCount
            const patients = await patientModel.find().skip(skipCount).limit(limitCount)
            res.status(200).send({
                apiStatus:true,
                data:patients,
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
    static singlepatient = async(req,res)=>{
        try{
            const patient = await patientModel.findById(req.params.id)
            if(!patient)
                return res.status(404).send({ apiStatus:false, data:{}, message:"patient not found"})    
            res.status(200).send({ apiStatus:true, data:patient, message:"data fetched" })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }

    }
    static editpatient = async(req,res)=>{
        try{
            const invalidEdits = ["password", "tokens", "status", "__v", "updatedAt"]
            for (const property in req.body) {
                if(!invalidEdits.includes(property)) 
                    req.patient[property] = req.body[property]
            }
            req.patient.save()
            res.send({
                  apiStatus:true,
                  data:req.patient,
                  message:"data updated"
              })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }
    }
    static activate =async(req,res)=>{
        try{
            if(req.patient.status) throw new Error("already active")
            req.patient.status=true
            await req.patient.save()
            res.status(200).send({
                apiStatus:true,
                message:"updated",
                data: req.patient
            })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }

    }
    static activateWithoutLogin =async(req,res)=>{
        try{
            const patient = await patientModel.loginpatient(req.body.email, req.body.password)
//            if(!patient) throw new Error("invalid")
            if(patient.status) throw new Error("alerady activated")
            patient.status=true
            await patient.save()
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
            // req.patient.image = filename
            req.patient.image = req.file.path
            await req.patient.save()
            res.send({
                apiStatus:true,
                data:req.patient,
                message:"updated"
            })
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error in fetching" })
        }

    }
}
module.exports = Patient