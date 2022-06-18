import React, { Fragment, useState } from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction } from '@mui/material';
import  Backdrop  from '@material-ui/core/Backdrop';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcom from "@material-ui/icons/ShoppingCart"
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';




const UserOptions = ({user}) => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();
    // const history = useHistory();

    const {cartItems} = useSelector((state) => state.cart);

    const [open,setOpen] = useState(false);

    const options = [
      {icon:<ListAltIcon/>, name:"Orders", func:orders},
      {icon:<PersonIcon/>, name:"Profile", func:account},
      {icon:<ShoppingCartIcom  
        style={{color: cartItems.length >0? "tomato" : "unset"}} />, name:`Cart(${cartItems.length})`, func:cart},
      {icon:<ExitToAppIcon/>, name:"Logout", func:logoutuser}

    ];

   if(user.role==="admin"){
     options.unshift({
       icon:<DashboardIcon/>,
       name:"Dashboard",
       func:dashboard

     });
   }

   function dashboard(){
     history("/admin/dashboard");
   }

   function orders(){
    history("/orders");
  }
  function account(){
    history("/account");

  }

  function cart(){
    history("/cart");

  }

  function logoutuser(){
    dispatch(logout());   
    
    Navigate("/login")
    alert.success("logout successfully");
  

  }





  return ( 
   <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}}/>
       <SpeedDial
       ariaLabel='SpeedDail tooltip example'
       onClose={()=>{setOpen(false)}}
       onOpen={()=>setOpen(true)}
       open={open}
       direction="down"
       className='speedDial'
       icon={ <img 
          className='speedDialIcon'
          src={user.avatar.url ? user.avatar.url : "/profile.png" }
          alt="profile"
        />}
        >

      {
        options.map((item)=>(
          <SpeedDialAction 
            key={item.name}
            icon= {item.icon} 
            tooltipTitle = {item.name} 
            onClick={item.func}
            tooltipOpen= {window.innerWidth <=600 ? true : false}
            />
        ))
      }
       

       </SpeedDial>

   </Fragment>
  )
}

export default UserOptions