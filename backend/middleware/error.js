const ErrorHandler = require("../utils/errorHandler");


module.exports = (err,req,res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //wrong mongodb Id Error
    if(err.name === "CastError"){
        const message= `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongodb duplicate error

    if (err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err= new ErrorHandler(message,400);

    }

    //wrong jwt error

    if(err.name === "jsonWebTokenError"){
        const message = `json web token is invalid, Try again`;
        err = new ErrorHandler(message , 4000);
    }

    //jwt expire error
    if(err.name === "TokenExpiredError"){
        const message = `json web token is expired, Try again`;
        err = new ErrorHandler(message , 4000);
    } 

    res.status(err.statusCode).json({
        success : false,
        message : err.message,
        
    })
}