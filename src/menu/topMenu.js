import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import HamburgerMenuIcon from "../icons/HamburgerMenuIcon";
import {
    goTo,
    noop,
    isWhiteOrUndefined,
    isWhite,
    propertyExists,
    darken
} from "../miscFunctions";
import ShiftArrow from "../miscComponents/ShiftArrow";
import { primaryWhite, primaryBlackDark, pureBlack, primaryCyan, palette4Text } from "../colors";
import classNames from "classnames";

import "./topMenu.css";


class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.bound_updateMobileMenu = this.updateMobileMenu.bind(this);

        // set the initial state
        this.state = {
            // whether the user has scrolled at all
            hasScrolled: window.scrollY > 0,
            // whether a logo is currently uploading
            logoUploading: false,
            // mobile menu not currently showing
            anchorEl: null
        };
    }

    componentDidMount() {
        this.setListeners();
        window.addEventListener("resize", this.bound_updateMobileMenu);
    }

    componentWillUnmount() {
        this.removeAllListeners();
    }

    componentDidUpdate(prevProps) {
        this.setListeners();
    }

    removeAllListeners = () => {
        window.removeEventListener("resize", this.bound_updateMobileMenu);
    };

    setListeners = () => {
      // make sure there aren't already event listeners on scroll/resize ...
      window.removeEventListener("scroll", this.bound_checkForHeaderClassUpdate);
      window.removeEventListener("resize", this.bound_checkForHeaderClassUpdate);
      // ... then add event listeners for adding the shadow to the menu
      window.addEventListener("scroll", this.bound_checkForHeaderClassUpdate);
      window.addEventListener("resize", this.bound_checkForHeaderClassUpdate);
      // if the user has not scrolled and the menu has a shadow, get rid of the shadow
      if (this.state.headerClass !== "noShadow" && window.scrollY === 0) {
          this.setState({ headerClass: "noShadow" });
      }
      // if the user has scrolled and there is no shadow, add a shadow
      else if (this.state.headerClass === "noShadow" && window.scrollY !== 0) {
          this.setState({ headerClass: "" });
      }
    };

    // fires when a dropDown menu item is clicked
    handleDropDownItemClick = (event, index, value) => {

    };

    selectAndGoTo(route, value) { }

    signOut() { }

    makeMoonshotLogo = (headerLogos) => {
        const {
            currentUser,
            logo,
            bothMenus,
            customBackgroundColor,
            backgroundColor,
            customPrimaryColor,
            primaryColor
        } = this.props;

        // if showing both menus, must be on apply page
        if (bothMenus) {
            let logoSrc = null;
            if (this.props.temporaryLogo) {
                logoSrc = this.props.temporaryLogo;
            } else if (this.props.logo && this.props.logo !== "MoonshotWhite") {
                logoSrc = "/logos/";
                if (this.props.logo.includes(".")) {
                    logoSrc += this.props.logo;
                } else {
                    logoSrc += this.props.logo + ".png";
                }
            }

            const backgroundIsWhite = isWhite(customBackgroundColor);

            // if there is no logo, just show the name of the business
            if (!logoSrc) {
                var text = this.getBizName();

                var textColor = customPrimaryColor
                    ? customPrimaryColor
                    : backgroundIsWhite
                    ? pureBlack
                    : primaryWhite;
            }

            return (
                <div style={{ position: "relative" }}>
                    <div>
                        {logoSrc ? (
                            <img
                                src={logoSrc}
                                style={
                                    logoSrc.startsWith("/logos/MoonshotWhite.")
                                        ? styles.moonshotLogo
                                        : {}
                                }
                                className="logo"
                            />
                        ) : (
                            <span className="font20px" style={{ color: textColor }}>
                                {text}
                            </span>
                        )}
                    </div>
                </div>
            );
        }

        let headerLogo = "/logos/MoonshotBlack.png";

        return headerLogo ? (
            <div>
                <img
                    style={
                        headerLogo.startsWith("/logos/MoonshotWhite.") ||
                        headerLogo.startsWith("/logos/MoonshotAllBlack")
                            ? styles.moonshotLogo
                            : {}
                    }
                    alt="Logo"
                    className="inlineBlock moonshotMenuLogo logo clickable"
                    id="moonshotLogo"
                    src={headerLogo}
                    onClick={goTo("/")}
                />
            </div>
        ) : null;
    };

    // hide the mobile menu if the display gets too big
    updateMobileMenu(event) {
        if (this.state.anchorEl && window.innerWidth > 700) {
            this.setState({ anchorEl: null });
        }
    }

    checkForHeaderClassUpdate(event) {
      // on homepage, only give a shadow if wanted by both width and height
      const widthWantsShadow = window.innerWidth > 700;
      const scrollWantsShadow = window.scrollY !== 0;

      // see if there should be a shadow on the menu
      if (widthWantsShadow && scrollWantsShadow && this.state.headerClass === "noShadow") {
          this.setState({ headerClass: "" });
      } else if (!(widthWantsShadow && scrollWantsShadow) && this.state.headerClass === "") {
          this.setState({ headerClass: "noShadow" });
      }
    }

    tryOptions = greenHeader => {
        // if an account admin or potential one is here, don't show "Need Help?"
        if (this.props.bothMenus) return [];

        return [
            {
                optionType: "arrowCTA",
                title: "Talk to a culture expert",
                url: "/book-demo",
                greenHeader: greenHeader
            }
        ];
    };

    cultureAnalysisOptions = () => {
        return [
            {
                optionType: "arrowCTA",
                title: "Save Analysis",
                url: `/save-analysis/${this.props.params.business}`
            }
        ];
    };

    cultureLandingOptions = () => {
        return [
            {
                optionType: "arrowCTA",
                title: "Book a Call",
                onClick: () => this.props.openDemoModal(true),
                pricing: true
            }
        ];
    };

    saveAnalysisOptions = () => null;

    // getStyle = colorShouldFade => {
    //     let headerStyle = { zIndex: "100", color: textColor, backgroundColor };
    //     if (colorShouldFade) {
    //         headerStyle.backgroundColor = undefined;
    //         if (this.state.headerClass.includes("noShadow")) {
    //             headerStyle.backgroundColor = "initial";
    //         }
    //     }
    // };
    // getShadowStyle = () => "";
    // getPositioningStyle = () => "";
    // getTextColor = () => "";

    // things that modify how the menu looks (shadow, background color, etc)
    getHeaderStyle = () => {
        let { backgroundColor, textColor, bothMenus } = this.props;
        let background = backgroundColor ? backgroundColor : primaryWhite;
        textColor = textColor ? textColor : primaryWhite;

        if (bothMenus && this.props.customBackgroundColor) {
            background = this.props.customBackgroundColor;
            textColor = isWhite(background) ? pureBlack : primaryWhite;
        }

        let headerStyle = { zIndex: "100", color: textColor, background };
        let fixed = true;
        const lightShadow = isWhiteOrUndefined(background);
        let backgroundClass = "";

        return { headerStyle, fixed, lightShadow, /*whiteMenu*/ backgroundClass };
    };

    // options given to a lead (not candidates)
    loggedOutOptions = (colorShouldFade, pricing, bookDemo) => {
        if (bookDemo)
            return [
                {
                    optionType: "url",
                    title: "Log In",
                    url: "/login",
                    styleName: "login-right"
                }
            ];
        return [
            {
                optionType: "url",
                title: "Log In",
                url: "/login"
            },
            { optionType: "separator", styleName: colorShouldFade ? "semi-transparent" : "" },
            {
                optionType: "arrowCTA",
                title: "Book a Demo",
                url: "/book-demo",
                pricing: pricing
            }
        ];
    };

    // the center menu for leads
    loggedOutCenterOptions = () => [
        { optionType: "url", title: "Science", url: "/science" },
        { optionType: "url", title: "Pricing", url: "/pricing" },
        { optionType: "action", title: "Contact", action: this.props.openContactUsModal }
    ];

    // open the mobile menu
    openMobileMenu = event => this.setState({ anchorEl: event.currentTarget });

    // close the mobile menu
    closeMobileMenu = () => this.setState({ anchorEl: null });

    // close the mobile menu and perform the requested action
    menuItemClickWithAction = action => () => {
        this.closeMobileMenu();
        // if a function to perform was sent in, do the action
        if (typeof action === "function") action();
    };

    menuItemClick = e => {
        this.closeMobileMenu();
        // determine the type of action we should take
        if (!e || !e.target || !e.target.dataset) return;
        const dataset = e.target.dataset;
        if (dataset.type === "url") return goTo(dataset.url);
    };

    // construct the jsx for the menu parts
    makeMenuParts = (menuOptions) => {
        // construct the menu's tabs
        let desktopMenu = [];
        let mobileMenu = [];

        if (!Array.isArray(menuOptions)) return { desktopMenu, mobileMenu };

        const self = this;
        // primary text color throughout the site
        const textColor = primaryBlackDark;

        menuOptions.forEach(function(option) {
            switch (option.optionType) {
                case "url":
                    // default to not underlined
                    let optionClass = menuItemClass += " opacity-hover";
                    desktopMenu.push(
                        <p
                            key={option.title + " desktop"}
                            className={optionClass}
                            style={{ borderColor: textColor }}
                            styleName={option.styleName ? option.styleName : ""}
                            onClick={() => goTo(option.url)}
                        >
                            {option.title}
                        </p>
                    );
                    mobileMenu.push(
                        <MenuItem
                            key={option.title + " mobile"}
                            data-type="url"
                            data-url={option.url}
                            onClick={self.menuItemClick}
                        >
                            {option.title}
                        </MenuItem>
                    );
                    break;
                case "separator":
                    // push a line, only visible on desktop
                    desktopMenu.push(
                        <div
                            key={"separator"}
                            className={"menuDivider wideScreenMenuItem"}
                            styleName={option.styleName ? option.styleName : ""}
                            style={{
                                backgroundColor: textColor
                            }}
                        />
                    );
                    break;
                case "arrowCTA":
                    if (option.bookDemo) break;
                    let color = option.pricing ? primaryWhite : palette4Text;
                    if (option.greenHeader) {
                        color = "#4cdfbf";
                    }

                    // click handler
                    let onClick = () => goTo(option.url);
                    if (option.onClick) {
                        onClick = option.onClick;
                    }
                    desktopMenu.push(
                        <div
                            key={"arrow cta desktop"}
                            style={{ color: color }}
                            className={`menuItem pointer font14px wideScreenMenuItem ${
                                option.pricing ? "opacity-hover" : ""
                            }`}
                            onClick={onClick}
                        >
                            <span
                                style={{
                                    marginRight: "7px",
                                    color: color
                                }}
                            >
                                {option.title}
                            </span>{" "}
                            <ShiftArrow color={color} style={{ height: "20px" }} />
                        </div>
                    );
                    mobileMenu.push(
                        <MenuItem
                            key={"arrow cta mobile"}
                            onClick={self.menuItemClickWithAction(() => goTo("/book-demo"))}
                        >
                            {option.title}
                        </MenuItem>
                    );
                    break;
                case "action": {
                    let optionClass = menuItemClass + " opacity-hover";
                    desktopMenu.push(
                        <p
                            key={option.title + " desktop"}
                            className={optionClass}
                            styleName={option.styleName ? option.styleName : ""}
                            onClick={option.action}
                        >
                            {option.title}
                        </p>
                    );
                    mobileMenu.push(
                        <MenuItem
                            key={option.title + " mobile"}
                            onClick={self.menuItemClickWithAction(option.action)}
                        >
                            {option.title}
                        </MenuItem>
                    );
                    break;
                }
                default:
                    break;
            }
        });

        return { desktopMenu, mobileMenu };
    };

    render() {
        // color of the dropDown menu icon
        let iconMenuColor = "white";
        // source for whatever logo will be shown in the menu
        let headerLogo = null;
        // if a different logo was found through props OR through user object, get it
        // let logo = (!!currentUser && currentUser.logo) || this.props.logo;
        let logo = this.props.logo;
        // if a logo was found ...
        if (logo) {
            // ... create a full path for it
            headerLogo = "/logos/";
            // if it has a file extension, add it as is
            if (logo.includes(".")) headerLogo += logo;
            // otherwise add .png
            else headerLogo += logo + ".png";
        }

        // whether we're on the homepage
        const colorShouldFade = true;

        // get all the header styles
        const {
            fixed,
            headerStyle,
            lightShadow,
            /*whiteMenu*/ backgroundClass
        } = this.getHeaderStyle();

        // the options that will be shown in the menu
        let menuOptions = [];

        // construct the parts of the menu
        let { desktopMenu, mobileMenu } = this.makeMenuParts(menuOptions);

        let menu = (
            <header
                styleName={
                    "menu" +
                    backgroundClass +
                    // (whiteMenu ? " white-menu" : "") +
                    (fixed ? "" : " notFixed") +
                    (lightShadow ? " light-shadow" : "") +
                    (this.props.bothMenus ? " both-menus" : "")
                }
                className={this.props.blurMenu ? "blur" : ""}
                style={headerStyle}
            >
                <div style={styles.menuContainer}>
                    <div id="menu" style={styles.menu}>
                        <div>
                            {this.makeMoonshotLogo(headerLogo)}
                        </div>
                        <div
                            style={styles.toolbarGroup}
                        >
                            {desktopMenu}

                            <div styleName="small-screen-menu">
                                <HamburgerMenuIcon
                                    className="pointer"
                                    width="20px"
                                    onClick={this.openMobileMenu}
                                />
                                <Menu
                                    anchorEl={this.state.anchorEl}
                                    open={!!this.state.anchorEl}
                                    onClose={this.closeMobileMenu}
                                    styleName="popover-menu"
                                >
                                    {mobileMenu}
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );

        return (
            <div>
                {menu}
                <div styleName="headerSpace" />
            </div>
        );
    }
}

const styles = {
    anchorOrigin: { horizontal: "right", vertical: "top" },
    moonshotLogo: { marginTop: "-2px" },
    toolbarGroup: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    menuContainer: { height: "100%" },
    menu: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px 24px 0",
        height: "100%"
    }
};

// class of every menu item
const menuItemClass = "menuItem font14px wideScreenMenuItem pointer";

export default TopMenu;
