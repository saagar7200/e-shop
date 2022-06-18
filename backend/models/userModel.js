const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        maxlength: [30, "name can't exceed 30 charater"],
        minlength: [4, "name  should have more  than 4 charater"]

    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"],

    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password."],
        minlength:[8, "Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,


});

userSchema.pre('save' ,async function(next){

    if(! this.isModified("password")){
        next();
    }


    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getJWTToken =  function ( ){
    return jwt.sign({id: this._id}, process.env.JWT_TOKEN,{
        expiresIn : process.env.JWT_EXPIRE,
    });


} ;


//compare password

userSchema.methods.comparePassword = async function(enteredPassword){

    //console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword,this.password);
    //return legalUser;
}

//Generating password reset token
userSchema.methods.getResetPasswordToken = function (){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding  resetPasswordToken to userschema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15* 60 * 1000;
    return resetToken;
}

module.exports =  mongoose.model("User",userSchema);