const mongoose = require('mongoose');
const { stringify } = require('querystring');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[ true, 'Please Enter Producct Name'],
        trim: true
    },
    description: {
        type: String,
        required: [ true, 'Please Enter Producct description']
    },
    price:{
        type:Number,
        required:[ true, 'Please Enter Producct Price'],
        maxlength : [8 , 'Price can not exceed 8 char']
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        requied:[true, "Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true , 'Please Enter Product stock '],
        default:1,
        maxlength:[4, "stock can't exceed 4 characters"]
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    ratings:{
        type:Number,
        default: 0

    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now

    }

})


module.exports = mongoose.model("product", productSchema);