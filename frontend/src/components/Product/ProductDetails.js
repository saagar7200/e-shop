
import React, { Fragment, useEffect, useState,  } from 'react';
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  clearErrors, getProductDetail, newReview } from '../../actions/productAction';
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetails.css";
import {useAlert} from "react-alert";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from '../../constants/productsConstant';
import { Rating } from '@mui/lab'; 
import { color } from '@mui/system';







const ProductDetails = () => {

const dispatch = useDispatch();
const alert =useAlert(); 

const {loading ,error, product} = useSelector((state) => state.product);
const {success, error:ReviewError} = useSelector(state => state.newReview)
const  {id}  = useParams();
// console.log(id)



const options={
  edit:false,
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",
  size: window.innerWidth < 600 ? 20 : 25,
  value:product.ratings,
  isHalf: true,
}


// const Reviewoptions={
//   edit:true,
//   color:"rgba(20,20,20,0.1)",
//   activeColor:"tomato",
//   size: window.innerWidth < 600 ? 20 : 25,
//   value:product.ratings,
//   isHalf: true,
// }
//---------------------------------------------


 const [quantity, setQuantity]=useState(1);
 const [open ,setOpen] = useState(false);
 const [rating ,setRating] = useState(0);
 const [comment ,setComment] = useState("");

//---------------------------------------------



 const increaseQty = ()=>{
   if(product.stock <= quantity ) return;
   const qty = quantity + 1;
   setQuantity(qty);
 }
//---------------------------------------------


 const decreaseQty = ()=>{
   if( quantity <=1 ) return;
  const qty = quantity -1;
  setQuantity(qty);
}

//---------------------------------------------


const addToCartHandeler = () => {
  dispatch(addItemsToCart(id, quantity));
  alert.success("Item Added To Cart");
}
 
//---------------------------------------------

const submitReviewToggle = () =>{
   open ? setOpen(false) : setOpen(true);
}


//---------------------------------------------


const reviewSubmitHandler = (e) => {
  const myform = new FormData();

  myform.set("rating", rating);
  myform.set("comment", comment);
  myform.set("productId" , id);

  dispatch(newReview(myform));

  setOpen(false);

};


//---------------------------------------------



  useEffect(() => {
    if(error){
    alert.error(error);
    dispatch(clearErrors());
  }

  if(ReviewError){
    alert.error(ReviewError);
    dispatch(clearErrors());
  }

  if(success){
    alert.success("Review Submitted Successfully");
    dispatch({type:NEW_REVIEW_RESET});
  }
    // console.log(id)
    dispatch( getProductDetail(id));

  }, [dispatch,id,alert,error ,ReviewError,success]);


  return (
      <Fragment>
        {loading ? (<Loader/>) : (
          <Fragment>
           <MetaData title={`${product.name}--e-sh0p`}/> 

          <div className='ProductDetails'>
            <div >
              
               <Carousel className='carousel'>
                
                {
                product.images &&
                product.images.map((item,i) =>(
                  <Carousel.Item  key={item.url}>
                  <img 
                    className="d-block "
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
    
                  />
                  </Carousel.Item>
                ))
                }
               </Carousel> 
                
            </div>
    
    
            <div>
                <div className='detailsBlock-1'>
                  <h2>{product.name}</h2>
                  <p>Product category:{product.category} </p>
                </div>
                <div className='detailsBlock-2'>
                    <ReactStars {...options}/>
                    <span>({product.numofReviews} Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                    <h1>{`रु ${product.price}`}</h1>
                      <div className='detailsBlock-3-1'>
                          <div className='detailsBlock-3-1-1'>
    
                            <button onClick={decreaseQty}>-</button>
                            <input value = {quantity} readOnly type='number' />
                            <button onClick={increaseQty}>+</button>
                          </div>
               
                         <button onClick={addToCartHandeler}> Add to Cart</button>
                        </div>
                      <p>
                        Status:
                          <b  className= {product.stock < 1 ? "redColor" : "greenColor"}> 
                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                         </b>
                      </p>
    
                  </div>
               <div className='detailsBlock-4'>
                  Description : <p>{product.description}</p>
    
               </div>
               <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
          </div>
            
          </div>
    
          <h3 className='reviewsHeading'>REVIEWS</h3>

          <Dialog 
          aria-labelledby='simple-dialog-title'
          open={open}
          onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>

            {/* <ReactStars {...Reviewoptions}
            onChange={ (e) => setRating(e.target.value)}
            value={rating}
            /> */}
            <Rating 
            onChange={ (e) => setRating(e.target.value)}
            value={rating}
            size="large"
            precision={0.5}
            
            
            />
            <textarea
            className='submitDialogTextArea'
            cols="30"
            rows="7"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ></textarea>
            </DialogContent>
            <DialogActions>
            <Button onClick={submitReviewToggle} color='secondary' >Cancel</Button>
              <Button onClick={ reviewSubmitHandler}  color='primary'  >Submit</Button>
            </DialogActions>
 
          </Dialog>
    
    
          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews.map(review => <ReviewCard key={review._id} review = {review}/>)}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet.<br></br>Be the First Reviewer.</p>
          )}
             
    
    
            
        
        </Fragment>
        )}
      </Fragment>
  

    
  );
};

export default ProductDetails;


