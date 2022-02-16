import React, { Component } from "react";

// import menu and footer
import Footer from "./footer";
import Menu from "./menu/menu";

// import pages
import Artist from "./artist/Artist";
import Contact from "./pages/Contact";
import Home from "./home/Home";

import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import { primaryWhite, primaryBlackDark, primaryCyan } from "./colors";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const typography = { fontFamily: '"Muli", sans-serif', useNextVariants: true };
const makeTheme = props => {
    const backgroundColor = props.backgroundColor ? props.backgroundColor : primaryBlackDark;
    const primaryColor = props.primaryColor ? props.primaryColor : primaryCyan;
    const secondaryColor = props.secondaryColor
        ? props.secondaryColor
        : props.primaryColor
        ? props.primaryColor
        : primaryWhite;

    const primary = { main: primaryColor };
    // const background = { default: backgroundColor, paper: backgroundColor };
    let secondary = { main: secondaryColor };
    if (props.buttonTextColor) secondary.contrastText = props.buttonTextColor;

    // make CSS root theme
    if (typeof document !== "undefined") {
        let root = document.documentElement;
        
        root.style.setProperty("--primary-color", primaryColor);
        root.style.setProperty("--secondary-color", secondaryColor);
        root.style.setProperty("--background-color", backgroundColor);
        root.style.setProperty("--button-color", props.buttonTextColor);
        root.style.setProperty("--text-color", props.textColor);
    }

    let palette = { primary, secondary };

    return createMuiTheme({ palette, typography });
};

const handleFirstTab = event => {
    const keyCode = event.keyCode || event.which;
    // if tab is pressed, make it so that the blue outline will show
    if (keyCode === 9) {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        const theme = makeTheme(props);

        this.state = {
            theme
        };
    }

    componentDidMount() {
        window.addEventListener("keydown", handleFirstTab);
    }

    // checks if the user is using internet explorer, and if so shows an alert telling them we don't support it
    usingInternetExplorer = () => {
        return !!window.MSInputMethodContext && !!document.documentMode;
    };

    // the get url starting after main domain
    getPathname = () => {
        try {
            return this.props.location.pathname.toLowerCase();
        } catch (e) {
            // if the pathname is not yet defined, return empty string - this will be executed again later
            return "";
        }
    };

    // get the most important part of the pathname
    getPathFirstPart = () => {
        // get the current path from the url
        const pathname = this.getPathname();

        // if the pathname is invalid, return empty string
        if (!pathname || typeof pathname !== "string") return "";

        // get the different parts of the pathname ([skillTest, front-end-developer, ...])
        const pathnameParts = pathname.split("/").slice(1);
        // get the first, most important part of the path first
        return pathnameParts[0];
    };

    render() {

        return (
            <MuiThemeProvider theme={this.state.theme}>
                <div style={{ color: "#2e2e2e" }}>
                  <Menu />
                    <div style={{ position: "relative" }}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/artist" element={<Artist />} />
                        <Route path="/contact" element={<Contact />} />
                      </Routes>
                    </div>
                    <Footer png={".png"} />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
