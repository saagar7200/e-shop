//const { findByIdAndRemove, findByIdAndDelete } = require("../models/productModel");
// const req = require("express/lib/request");
// const res = require("express/lib/response");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary');




//create products --- ADMIN 
exports.createProduct = catchAsyncError( async (req, res)=>{


    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    // console.log(images)
    // console.log(req.body)

  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    // console.log(req.body.images)
     req.body.user = req.user.id; 
    const product = await Product.create(req.body);

    // console.log(Products.images)

    
    
    res.status(201).json({
        success : true,
        product
    })

});
 

//get all products
exports.getAllProducts = catchAsyncError( async(req , res, next) =>{

    const resultPerPage = 8;
    const productCount= await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

   apiFeature.pagination(resultPerPage);

      products = await apiFeature.query.clone();

    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    });
});


// get admin  products 

exports.getAdminProducts = catchAsyncError( async(req , res, next) =>{

  

const products = await Product.find()

    res.status(200).json({
        success:true,
        products,
        
});


})

///get products detail

exports.getProductDetails = catchAsyncError( async(req, res ,next ) =>{
    const product = await Product.findById(req.params.id);
    if (!product){
        return next(new ErrorHandler("product not foud.", 404));
    }

    res.status(200).json({
        success: true,
        product
    })


});



//update products --admin




exports.updateProduct = catchAsyncError(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  // console.log(req.body)
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  // console.log(images)
  // console.log("product")
  // console.log(product.images)
  
  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

  


  // console.log("images before upload")
    

  // console.log(images)

    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    // console.log(imagesLinks);

    req.body.images = imagesLinks;
  }


  // console.log(req.body)
  // console.log("links")


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }).clone();



  // console.log(product);


  res.status(200).json({
    success: true,
    product,
  });
});




// exports.updateProduct = catchAsyncError( async (req, res, next) => {
//     console.log(req.body.user);

//     let product = await Product.findById(req.params.id);
    

//     if (!product){
//         return next(new ErrorHandler("product not foud.", 500));
        
//     }


//       // Images Start Here
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   if (images !== undefined) {
//     // Deleting Images From Cloudinary
//     for (let i = 0; i < product.images.length; i++) {
//       await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "products",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//   }




//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     });

//     res.status(200).json({
//         success: true,
//         product
//     });
// });

//delete product ---admin

exports.deleteProduct= catchAsyncError ( async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not foud.", 404));

    }


     // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    //await findByIdAndDelete(req.params.id)
    await product.remove();

    res.status(200).json({
        success:true,
        message: "product deleted successfully",
        product
    })

});

//=========create new review or update the review========

exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId} = req.body;

    const review = {
        user: req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    }
   // console.log(productId)


    const product = await Product.findById(productId);

     if(!product){
        return next(new ErrorHandler("product not found"))
    }
    console.log(product)

    const isReviewed =  product.reviews.find(rev =>rev.user.toString()===req.user._id.toString());
    

    if(isReviewed){
      
        product.reviews.forEach((rev) => {
            if(rev.user.toString()===req.user._id.toString())
            
                rev.rating= rating,
                rev.comment =comment     
            
        });
        

    }
    else{

        product.reviews.push(review);
        product.numofReviews = product.reviews.length;
    }


    //avg rating

    let avg=0;

     product.reviews.forEach((rev)=>{
        // console.log(rev.rating)
        avg+=rev.rating;
        // console.log(avg)

       }) 

      product.ratings= avg/product.reviews.length;

      

    

   await product.save({validateBeforeSave:false});
 
    

     res.status(200).json({
         success:true,
     });


});

//------------get all review----
exports.getProductReviews = catchAsyncError( async(req,res,next)=>{
    
    console.log(req.query.id)
    const product = await Product.findById(req.query.id);
    // console.log(product)

    if(!product){
         return next(new ErrorHandler("product not foud.", 404));
    }


    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
});

//-----------------delete review-------------

exports.deleteReview = catchAsyncError(async(req,res,next)=>{

    console.log(req.query)

    const product = await Product.findById(req.query.productId);

    if(!product){
      return next(new ErrorHandler("product not foud.", 404));
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString());


    //avg rating

    let avg=0;

     product.reviews.forEach((rev)=>{
        // console.log(rev.rating)
        avg+=rev.rating;
        // console.log(avg)

       }) 

       let ratings = 0;

       if (reviews.length === 0) {
         ratings = 0;
       } else {
         ratings = avg / reviews.length;
       }

      // const ratings= avg/reviews.length;

      const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numofReviews
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        
    });

});