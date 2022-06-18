const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const read = require("body-parser/lib/read");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const cloudinary = require('cloudinary');
// const { findById } = require("../models/userModel");


//register user

exports.userRegister = catchAsyncError( async (req,res)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width: 150,
        crop:"scale"    
    });
    const {name,email,password} = req.body;

    //console.log(req.body)

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    });

    sendToken(user,201,res);
});


// ---------------------login user----------------

exports.loginUser = catchAsyncError( async (req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password ",400));

    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
       return next(new ErrorHandler("Invalid email or Password ", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    //console.log(isPasswordMatch)
    
    if(!isPasswordMatch){
      return  next( new ErrorHandler("Invalid email or  Password", 401));
    }
    //console.log(password)
    sendToken(user,200,res);   
    //console.log(user)

});

//---------------------logout user------------------

exports.logout = catchAsyncError( async (req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date( Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"logged out"
    })

    next();

});

//.......................forgot password...................
exports.forgotPassword = catchAsyncError( async (req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if (!user){
        return next(new ErrorHandler("user not found",404));
    }

    //get reset password token

    const resetToken =user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    //link to be sent via mail
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your password reset token is: \n\n ${resetPasswordUrl}\n\n.If you have not requested this email
    then, Please ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject:`E-shop password recovery`,
            message,

        });

        res.status(200).json({
            success:true,
            message: `email sent  to ${user.email} successfully`,
        })

    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message,500));
    }

});

///----------------------resetPassword-----------------
exports.resetPassword = catchAsyncError(async (req,res,next)=>{

    // console.log(req.params.token)
    //----creaating token hash
   const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt:Date.now() },
    });
if (!user){
    return next( new ErrorHandler("Reset Password Token is Invalid or Has been Expired",400));

}
if (req.body.password !== req.body.confirmPassword){
    
    return next( new ErrorHandler("Password does't match",400));

}

user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordToken = undefined;

await user.save();

sendToken(user,200,res);



});


//get user details
exports.getUserProfile = catchAsyncError(async (req,res,next)=>{
    // console.log("user loading")
    // console.log(req.user)

 
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user 
    })

});

//-------------change password--------------
exports.updatePassword= catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");


    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    //console.log(isPasswordMatch)
    
    if(!isPasswordMatch){
      return  next( new ErrorHandler("Old  Password is incorrect ", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword){
    
        return next( new ErrorHandler("Password does't match",400));
    
    }

    user. password = req.body.newPassword;

    await user.save();


    sendToken(user,200,res);

    res.status(200).json({
        success:true,
        userProfile 
    })

});

//------------update user profile---------
exports.updateProfile = catchAsyncError( async (req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    //we will add cloudinary later to update profile image
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);

        const inamgeId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(inamgeId);

        const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        });
        newUserData.avatar ={
            public_id: myCloud.public_id,
            url:myCloud.secure_url,
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    

    res.status(200).json({
        success:true,
        user
        
        
    })
    
});


//=================get all user (admin)============

exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    });
});



//==================get single user(admin)============

exports.getUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(
            new ErrorHandler(`user Doesn't exist with ${req.params.id}` )
        );
    }

    res.status(200).json({
        success:true,
        user,
    });
});


//------------update user role...{admin}---------
exports.updateRole = catchAsyncError( async (req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:  req.body.role
    };

    

    const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

   

    res.status(200).json({
        success:true,
        user
        
        
    })
    
});




//------------delete user===admin ---------
exports.deleteUser = catchAsyncError( async (req,res,next)=>{

    
    const user = await User.findById(req.params.id);
    //console.log(user);

        
    if(!user){
        return next(
            new ErrorHandler(`user Doesn't exist with ${req.params.id}` )
        );
    }

    //we will remove cloudinary image to delete user  profile image


  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success:true,
        message:`User ${user.name}  removed successfully `,
        
    })
    
});