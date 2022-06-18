const Order = require("../models/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
// const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");



exports.newOrder = catchAsyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        
    } = req.body;

    // console.log(req.body)


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user.id,
    });

    // console.log(order)

    res.status(200).json({
        sucess:true,
        order
    });

});


//---------------------get single order---------------------

exports.getSingleOrder = catchAsyncError( async(req,res,next)=>{
    // console.log("hello order details")
    // console.log(req.params.id)

    // const order = await Order.findById(req.params.id).populate(
    //     "user",
    //     " name , email"
    // );

    const order = await Order.findById(req.params.id).populate(
        "user",
        " name , email"
    );
    if(!order){
        return next(new ErrorHandler("order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

//---------------------get logged  in user order---------------------

exports.myOrders = catchAsyncError( async(req,res,next)=>{
    console.log("hello user order");
    const orders = await Order.find({user : req.user._id })
    
    // console.log(orders)
    res.status(200).json({
        success: true,
        orders
    });
});

//---------------------get all order --(Admin)---------------------

exports.getAllOrders = catchAsyncError( async(req,res,next)=>{

    const orders = await Order.find( );
    
    //console.log(orders)


    let totalAmount = 0;

    orders.forEach(o =>{
        totalAmount+= o.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
       
    });
});


//---------------------update order (status) --(Admin)---------------------

exports.updateOrder = catchAsyncError( async(req,res,next)=>{

    const orders = await Order.findById( req.params.id);

    if(!orders){
        return next(new ErrorHandler("order not found with this id", 404));
    }
    
    //console.log(orders)
    if(orders.orderStatus === "Delivered"){
        return next(new ErrorHandler("You hnave already delivered this order",400))
    }



    orders.orderItems.forEach(async (o) => {
    
        if(req.body.status === "Shipped"){
        await updateStock(o.product,o.quantity);

        }


    });

    orders.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        orders.deliveredAt = Date.now();
    }

    await orders.save({validateBeforeSave :false});


    res.status(200).json({
        success: true,
       
        orders,
       
    });


   
});

async function  updateStock(id, qty) {
    // console.log(id)

    const product = await Product.findById(id);
    // console.log(product)

    product.stock -= qty;

    await product.save({ validateBeforeSave :false})

}





//---------------------delete  order --(Admin)---------------------

exports.deleteOrder = catchAsyncError( async(req,res,next)=>{

    const order = await Order.findById( req.params.id);


    if(!order){
        return next(new ErrorHandler("order not found with this id", 404));
    }
    
    //console.log(orders)

    await order.remove()



    res.status(200).json({
        success: true,
      
    });
});