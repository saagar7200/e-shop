import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {

    const CreateMail = ()=>{
        window.location = "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=rsaagar7200@gmail.com"
    }
  return (
    <div className="contactContainer">
      {/* <a className="mailBtn" href="mailto: rsaagar7200@gmail.com.com"> */}
      <a className="mailBtn" href={CreateMail} >
        <button onClick={CreateMail} target="blank" >Contact:rsaagar7200@gmail.com</button>
      </a>
    </div>
  );
};

export default Contact;