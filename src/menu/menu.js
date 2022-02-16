import React, { Component } from "react";
import "./menu.css";

import SublabelLogo from "../miscComponents/SublabelLogo";

import { Link } from "react-router-dom";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
          <div className="menu">
            <Link to="/" className="menu-header">
              <SublabelLogo />
            </Link>
              <a
                  href="https://twitter.com/sublabelxyz"
                  target="_blank"
                  rel="noopener"
                  className='social-logo-container'
              >
                  <img
                      alt="Twitter Logo"
                      className="social-logo"
                      src="/logos/Twitter-Black.png"
                  />
              </a>
          </div>
        );
    }
}

export default Menu;
