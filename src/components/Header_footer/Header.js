import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CityLogo } from "./../UI/icons";

class Header extends Component {
  state = {};
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#98c5e9",
          boxShadow: "none",
          padding: "10px 0",
          borderBottom: "2px solid #00285e"
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <CityLogo link="/" width="70px" height="70px" />
            </div>
          </div>
          <Link to="/the-team">
            <Button color="inherit">The team</Button>
          </Link>
          <Link to="/the-matches">
            <Button color="inherit">Matches</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
