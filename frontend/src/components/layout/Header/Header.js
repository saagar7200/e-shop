import React, { Fragment, useState } from 'react';
import "./Header.css"
// import logo from "../../../images/logo/logo.png";
// import cart from "../../../images/logo/cart.png";
import user from "../../../images/logo/user.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCartIcom from "@material-ui/icons/ShoppingCart"
// import HomeIcom from "@material-ui/icons/Home"


// import {FaUserAlt} from "react-icons/all"

import { Link } from 'react-router-dom';


const searchicon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox='0 0 35 35' ><path d="M39.8 41.95 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L42 39.75ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55Z"/></svg>

const Header = ( ) => {

  const {cartItems} = useSelector((state) => state.cart);


  const history = useNavigate();

  const [keyword, setKeyword]= useState(" ");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if(keyword.trim()){
      history(`/products/${keyword}`);
      console.log(keyword)
    }else{
      history("/products");
    }
  }


  return (
    
    <Fragment>
    <div className='nav'>
      <div className='logo'>
        
         <Link to="/">
        {/* <p className=" logotohome"> <HomeIcom/></p> */}
        {/* <p className=" logotohome"> e-sh0p</p>  */}
        <p className='logotohome'>e-shop</p>

      
      
      </Link>

      </div>

      <Link  className='navlinks' to="/">Home</Link>
      <Link  className='navlinks' to="/products">Products</Link>
      <Link  className='navlinks' to="/contact">Contact</Link>
      <Link  className='navlinks' to="/about">About</Link>


      
      <form className='searchbox' onSubmit={searchSubmitHandler }   >
        
          <input type="text"
          placeholder="search a product. . . ." 
          onChange={(e) => setKeyword(e.target.value)} />  
          <a onClick={searchSubmitHandler }> { searchicon }  </a>

      </form >


       <div className='navIcons'>
                {/* <a href='/login'>{<FaUserAlt/>}</a> */}
          <Link to="/login "><img id="userIcon"src= { user } alt="login"/></Link>  

            {/* <Link to="/cart "><img className="cartIcon" src={cart} alt="cart"  style={{color: cartItems.length >0? "tomato" : "unset"}}  />({cartItems.length})</Link>  */}
          <Link to="/cart" className="cartIcon"> <ShoppingCartIcom style={{color: cartItems.length >0? "tomato" : "unset"}}/ >({cartItems.length}) </Link>
      
      </div>

     

    </div>
    
  
    </Fragment>
    )

  
}

export { Header}