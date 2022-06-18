import React, { useState } from "react"
// import { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader" 
import {Header}  from "./components/layout/Header/Header"
import Footer  from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home"
import ProductDetails  from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import UserOptions from "./components/layout/Header/UserOptions"
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";

import  store  from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/cart/Cart"
import Shipping from "./components/cart/Shipping"
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment.js"
import OrderSuccess from "./components/cart/OrderSuccess"
import MyOrders from "./components/Order/MyOrders"
import OrderDetails from "./components/Order/OrderDetails"
import Dashboard from "./components/Admin/Dashboard"
import ProductList from "./components/Admin/ProductList.js"  
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import UserList from "./components/Admin/UserList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProcessOrder from "./components/Admin/ProcessOrder";
import ProductReviews from "./components/Admin/ProductReviews.js"
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/NotFounf/NotFound";






function App() {

  const { isAuthenticated,user } = useSelector( (state) => state.user );


  const [stripeApiKey, setStripeApiKey] = useState("");
    //  console.log(stripeApiKey)


  async function getStripeApiKey(){
     const {data} = await axios.get("/api/v1/stripeapikey");
    //  console.log(data.stripeApiKey)

     setStripeApiKey(data.stripeApiKey)
  }

  // console.log(user)

  React.useEffect (() => {

    webFont.load({
      google:{
        families:["Roboto", "Drold Sans","Chilanka","cursive"]
  
      },
    });


  store.dispatch(loadUser());
 
  getStripeApiKey();

  }, [])


  return (
  <Router>
  <Header/>

  {isAuthenticated && <UserOptions user = {user} /> }

 
  <Routes>
  <Route exact path ="/" element= {<Home/>} />
  <Route exact path ="/product/:id" element= {<ProductDetails/>} />
  <Route exact path ="/products" element= {<Products/>} />
  <Route  path ="/products/:keyword" element= {<Products/>} />
  <Route exact path ="/login" element= {<LoginSignUp/>} />
  <Route exact path ="/about" element= {<About/>} />
  <Route exact path ="/contact" element= {<Contact/>} />


  {/* <ProtectedRoute exact path = "/account" element={<Profile/>} /> */}
  
    
  
{isAuthenticated === true &&
  <Route  exact path="/account" element= { <ProtectedRoute  ><Profile/></ProtectedRoute> }/>
} 
{stripeApiKey &&
    <Route exact path = '/process/payment' element={  <Elements stripe={loadStripe(stripeApiKey)}> <ProtectedRoute> <Payment/>  </ProtectedRoute></Elements>  }  />} 

    
  

  <Route exact path="/profile/update" element = {<ProtectedRoute> <UpdateProfile/> </ProtectedRoute>}/>
  <Route exact path="/password/update" element = {<ProtectedRoute> <UpdatePassword/> </ProtectedRoute>}/>
  <Route exact path="/password/forgot" element = { <ForgotPassword/> }/>
  <Route exact path="/password/reset/:token" element = { <ResetPassword/> }/>
  <Route exact path ="/cart" element= {<Cart/>} />
  <Route exact path = '/shipping' element={ <ProtectedRoute> <Shipping/> </ProtectedRoute>}/>
  <Route exact path = '/success' element={ <ProtectedRoute>  <OrderSuccess/>  </ProtectedRoute> } />
  
  <Route exact path = '/order/confirm' element={ <ProtectedRoute> <ConfirmOrder/> </ProtectedRoute>}/>
 {/* <Route exact path = '/order/confirm' element={  <ConfirmOrder/> }/>  */}
 <Route exact path = '/process/payment' element={ <Elements stripe={loadStripe(stripeApiKey)}>     <Payment/>  </Elements>}/> 
 {isAuthenticated === true &&
<Route exact path = '/orders' element={ <ProtectedRoute>  <MyOrders/>  </ProtectedRoute> } /> 
}
<Route exact path = '/order/:id' element={ <ProtectedRoute>  <OrderDetails/>  </ProtectedRoute> } /> 

<Route   exact path = '/admin/dashboard' element={ <ProtectedRoute  isAdmin={true}  >  <Dashboard/>  </ProtectedRoute> } /> 

<Route   exact path = '/admin/products' element={ <ProtectedRoute isAdmin={true}>  <ProductList/>  </ProtectedRoute> } /> 

<Route   exact path = '/admin/product' element={ <ProtectedRoute isAdmin={true}>  <NewProduct/>  </ProtectedRoute> } /> 

<Route   exact path = '/admin/product/:id' element={ <ProtectedRoute isAdmin={true}>  <UpdateProduct/>  </ProtectedRoute> } /> 
<Route   exact path="/admin/orders" element={ <ProtectedRoute isAdmin={true}>  <OrderList/>  </ProtectedRoute> } /> 
<Route   exact path="/admin/order/:id" element={ <ProtectedRoute isAdmin={true}>  <ProcessOrder/>  </ProtectedRoute> } /> 
<Route   exact path="/admin/users" element={ <ProtectedRoute isAdmin={true}>  <UserList/>  </ProtectedRoute> } /> 
<Route   exact path="/admin/user/:id" element={ <ProtectedRoute isAdmin={true}>  <UpdateUser/>  </ProtectedRoute> } /> 
<Route   exact path= "/admin/reviews" element={ <ProtectedRoute isAdmin={true}>  <ProductReviews/>  </ProtectedRoute> } /> 

<Route path ="*"  element={<NotFound/>}/>







  </Routes>
    <Footer/>
  </Router>
  );
  
}

export default App;
