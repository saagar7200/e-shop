const app = require('./app');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

// const dotenv = require('dotenv');

//handle uncaught error
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log( `Shutting down the server due to Uncaught Exception`);
    process.exit(1);
    
})



const connectDatabase = require('./config/database');


//config



// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

//always call db after setting dotenv : else env is not called 
//connectiong database




connectDatabase();

//cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



//creating server 

const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})


//unhandled Promise Rejection 
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log( `Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
});