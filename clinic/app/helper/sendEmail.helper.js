const nodemailer = require("nodemailer")
const smtpConfig = {
    service:'gmail',
    auth:{
        user: "dr.reham.yousef@gmail.com",
        pass: "czebavrjubvjpvrk"
    }
}
const sendEmail = (doctorsEmail) =>{
    try{
        const transporter = nodemailer.createTransport(smtpConfig)
        let mailOptions = {
            from:"dr.reham.yousef@gmail.com",
            to: doctorsEmail,
            subject:"hello",
            text:"hello from site"
        }
        transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log(e.message);
    }
}

module.exports= sendEmail