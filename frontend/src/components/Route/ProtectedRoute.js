// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate, } from 'react-router-dom';

import React from "react";
import { useSelector } from "react-redux";
// import { Redirect, } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin,  element: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//  const navigate= useNavigate();
//   return (
//     <Fragment>
//       {loading === false && (
        
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return navigate("/login");
//             }

//             // if (isAdmin === true && user.role !== "admin") {
//             //   return <Redirect to="/login" />;
//             // }

//             return <Component {...props} />;
//           }}
//         />
    
//       )}
//     </Fragment>
//   );
// };







const ProtectedRoute = ({isAdmin,children}) => {


  const Navigate = useNavigate();
   
    const { loading,isAuthenticated,user} = useSelector((state) => state.user);
    
    if(loading === false ){

        if(  isAuthenticated === false ){
            // return <Navigate to="/login" />;
            return Navigate("/login")
        }
    
        if(   isAuthenticated === false  && isAdmin===true && user.role !=="admin"  ){
            // return <Navigate to="/login" />;
            return Navigate("/login")
    
    
        }
    }
  
  
    // if( loading===false && isAuthenticated === false ){
    //     // return <Navigate to="/login" />;
    //     return Navigate("/login")
    // }

    // if( loading === false && isAdmin===true && user.role !=="admin" ){
    //     // return <Navigate to="/login" />;
    //     return Navigate("/login")


    // }

    //  {isAuthenticated ===flase  &&    <Navigate to="/login" /> }

   
    return children;



    
}

export default ProtectedRoute

