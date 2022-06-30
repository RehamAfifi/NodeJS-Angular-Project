const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const patientSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "required name"]
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: [true, "email used before"],
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email address")
        }
    },
    password:{
        type: String,
        trim: true,
        required: [true, "required name"],
        // match:
    },
    phone:{
        type: String,
        trim: true,
        required: [true, "required name"],
        validate(value){
            if(!validator.isMobilePhone(value, 'ar-EG') ) 
                throw new Error("invalid mobile number")
        }
    },  
    age:{
        type:Number,
        // min:21,
        // max:60
    },
    gender:{
        type: String,
        trim: true,
        required: [true, "required name"],
        enum: ['male', 'female']
    },
    status:{
        type:Boolean, default:false
    },
    image:{
        type: String,
        trim: true,
    },
    addresses: [
        {
            address:{
                addrType:{
                    type: String,
                    trim: true,
                    required: [true, "required name"],
                },
                addrDetails:{
                    type: String,
                    trim: true,
                    required: [true, "required name"],
                },
                addrBuildingNum:{
                    type:Number,
                    min:1,
                    max:1000
                }
            }
        }
    ],
    tokens: [{  // [1,3,5,7]
        token: {
            type:String, trim:true, required:true //[{ti=oken:1}, {token:2}, {token:3}]
        }
    }],
    appointmentday:{
        type:String,
        trim:"true",
        required: [true, "required name"],

    },
    selected_doctor:{
        type:String,
        trim:"true",
        required: [true, "required name"],
    }
}, {
    timestamps:true //createdAt, updatedAt
})
// userSchema.virtual('myPosts', {
//     ref:'Post',
//     localField: "_id",
//     foreignField: "userId"
// })
patientSchema.methods.toJSON = function(){
    const patient= this.toObject()
    delete patient.password
    delete patient.__v
    delete patient.tokens
    return patient
}
patientSchema.pre("save", async function(){
    const patientData = this
    if(patientData.isModified("password")) 
    patientData.password = await bcrypt.hash(patientData.password, 10)
})
patientSchema.statics.loginpatient = async(email, password)=>{
    const patient = await Patient.findOne({email})
    if(!patient) throw new Error("invalid email")
    const isValid = await patient.checkPass(password)
    if(!isValid) throw new Error("invalid password")
    return patient
}
patientSchema.methods.generateToken = async function(){
    const patient= this
    const token = jwt.sign({_id:patient._id}, process.env.JWTKEY) //ey......
    patient.tokens = user.tokens.concat( { token } ) //{_id:'', iat:1202}
    await patient.save()
    return token
}
patientSchema.methods.checkPass = async function(current){
    patient = this
    const isValid = await bcrypt.compare(current, patient.password)
    return isValid
}
const Patient= mongoose.model("Patient",patientSchema)
module.exports = Patient