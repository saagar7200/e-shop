//const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
//    console.log(req.authorization)
//   console.log(req.path)
// console.log(req.cookies.token);

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));

    }

    const decodedUserData =  jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decodedUserData)

    // console.log(User.findById(decodedUserData.id))



   req.user = await User.findById(decodedUserData.id) ;
//   console.log(req.user)


   next();



    // console.log(token);
});

exports.authorizeRoles = (...roles)=>{
   
    return(req,res,next)=>{
    //    console.log(req.cookies.token)
    //    console.log(roles)

        if(!roles.includes(req.user.role)){
          return  next (new ErrorHandler( `Role: ${req.user.role} is not allowed to access this resource`, 403
          ));
        }


        next();
    };
};