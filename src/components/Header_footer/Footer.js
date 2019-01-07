import React from "react";
import { CityLogo } from "./../UI/icons";

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link="/" width="70px" height="70px" />
      </div>
      <div className="footer_discl">
        Manchester city 2018.All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
