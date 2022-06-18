import React, { Fragment } from 'react';
import "./Home.css";
import {CgMouse} from "react-icons/cg";
// import Product from "./ProductCard.js"
import MetaData  from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useDispatch, useSelector} from "react-redux"; 
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
import ProductCard from './ProductCard.js';




const Home = () => {
  const alert =useAlert(); 
  const dispatch = useDispatch();
   const {loading ,error, products} = useSelector((state) => state.products);


  React.useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getProduct());
  }, [dispatch, error,alert]);

  return (
      <Fragment>
        {loading ?(
        <Loader/> 
        ): ( <Fragment>

{/* metadat is for  title of the page  */}
    <MetaData title="e-SH0P"/> 
<div className='wraper'>
    <div className='banner'>
        <p>Welcome to e-Shop</p>
        <h1>FIND AMAZING PRODUCTS HERE......</h1>

        <a href='#container'>
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
    </div>


    <h2 className='homeHeading'>Featured Products</h2>

    <div className='container' id='container'>
        
        { products && products.map(product =>{
            return <ProductCard key={product._id} product ={product}/>
        })};
    </div>


    </div>

    </Fragment>)}
      </Fragment> 
    
  )
}

export default Home;