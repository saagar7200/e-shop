import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedinIcom from "@material-ui/icons/LinkedIn"

const About = () => {
  const visitInstagram = () => {
    window.location ="http://instagram.com/saagar_bhandari_";
  };
  return (
    <div className="aboutSection">
      {/* <div></div> */}
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://scontent.fkep2-1.fna.fbcdn.net/v/t39.30808-6/269745201_2138103209672526_6727540175391835326_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=nZcxPrj-xn4AX_7_lUy&_nc_ht=scontent.fkep2-1.fna&oh=00_AT-I8Uids1rDASgZt6lCtBtRsEGY5gbIlU5T-uByy62EUg&oe=62B0E525"
              alt="Founder"
            />
            <Typography>saagar_bhandari_</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by saagar_bhandari_. Only with the
              purpose to learn MERN Stack. This is full functional E-commerce website.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href='http://facebook.com/rsaagar7200'
              target="blank"
            >
              <FacebookIcon className="facebookSvgIcon" />
            </a>

            <a href="http://instagram.com/saagar_bhandari_" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://instagram.com/meabhisingh" target="blank">
              <LinkedinIcom className="facebookSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;