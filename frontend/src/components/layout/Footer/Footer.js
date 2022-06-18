import React from 'react';
import "./footer.css"
import playStore from "../../../images/footerimg/googleplay.png";
import appStore from "../../../images/footerimg/appstore.png";
// import { Link } from 'react-router-dom';



const Footer = () => {
  return (
  <footer id='footer'>


    <div className='leftFooter'>
        <h4>Download our app  </h4>
        <p>Get our app for Android and IOS.  </p>

        <img src={playStore} alt="Playstore"/>
        <img src={appStore} alt="Appstore"/>
    </div>

    <div className='midFooter'>

        <a href='/' > <h1 id='mid-footer'>e-sh0p</h1> </a>
       
        <p>Customer Satisfaction is always  Our First Priority. </p>
        <p> All Rights reserved &copy; e-sh0p</p>
    </div>

    <div className='rightFooter'>
        <h4>Follow Us  on:</h4>
        <a href='http://instagram.com/saagar_bhandari_'>instagram</a>
        <a href='http://facebook.com/rsaagar7200'>facebook</a>
    </div>


    
  </footer>
  )
}

export default Footer