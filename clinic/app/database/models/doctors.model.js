const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const doctorsSchema = mongoose.Schema({
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
        min:21,
        max:60
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
    available_days:{
        type:  [String],
        trim: true,
        required: [true, "required name"]
    
    },
    tokens: [{  // [1,3,5,7]
        token: {
            type:String, trim:true, required:true //[{ti=oken:1}, {token:2}, {token:3}]
        }
    }]
}, {
    timestamps:true //createdAt, updatedAt
})
// doctorsSchema.virtual('myPosts', {
//     ref:'Post',
//     localField: "_id",
//     foreignField: "doctorsId"
// })
doctorsSchema.methods.toJSON = function(){
    const doctors = this.toObject()
    delete doctors.password
    delete doctors.__v
    delete doctors.tokens
    return doctors
}
doctorsSchema.pre("save", async function(){
    const doctorsData = this
    if(doctorsData.isModified("password")) 
        doctorsData.password = await bcrypt.hash(doctorsData.password, 10)
})
doctorsSchema.statics.logindoctors = async(email, password)=>{
    const doctors = await Doctors.findOne({email})
    if(!doctors) throw new Error("invalid email")
    const isValid = await doctors.checkPass(password)
    if(!isValid) throw new Error("invalid password")
    return doctors
}
doctorsSchema.methods.generateToken = async function(){
    const doctors = this
    const token = jwt.sign({_id:doctors._id}, process.env.JWTKEY) //ey......
    doctors.tokens = doctors.tokens.concat( { token } ) //{_id:'', iat:1202}
    await doctors.save()
    return token
}
doctorsSchema.methods.checkPass = async function(current){
    doctors = this
    const isValid = await bcrypt.compare(current, doctors.password)
    return isValid
}
const Doctors = mongoose.model("Doctors",doctorsSchema)
module.exports = Doctors