const express = require('express');
const app = express();
var cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");


// const dotenv = require('dotenv');


const errorMiddleware = require("./middleware/error")

//const ErrorHandler = require('./utils/errorHandler');




// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  


//json 
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.urlencoded({ extended:true }));
app.use(fileUpload());



//imports routes here
//route for products  
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");





//routes for products contoller 
app.use("/api/v1",product);
app.use("/api/v1", user );
app.use("/api/v1", order );
app.use("/api/v1", payment );




//for production

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


//middlewre for errors
app.use(errorMiddleware );



//routes for 




module.exports = app;