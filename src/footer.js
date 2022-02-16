"use strict";
import React, { Component } from "react";
import { darken, isWhiteOrUndefined, goTo } from "./miscFunctions";
import { primaryBlackDark, primaryWhite } from "./colors";
import { Link } from "react-router-dom";

import SublabelLogo from "./miscComponents/SublabelLogo";

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.bound_checkIfInView = this.checkIfInView.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.bound_checkIfInView);
    }

    checkIfInView() {
        try {
            const footer = document.querySelector("#footer");
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const footerDistance = footer.getBoundingClientRect().top;

            const { footerOnScreen } = this.props;

            // if the footer is OFF the screen and isn't marked as such
            if (windowHeight <= footerDistance && footerOnScreen) {
                this.props.markFooterOnScreen(false);
            }
            // if the footer is ON the screen and isn't marked as such
            else if (windowHeight > footerDistance && !footerOnScreen) {
                this.props.markFooterOnScreen(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        // the type of footer to display
        let fullFooter = true;
        let footerClassName = "";
        
        // the background color should be a slightly darker version of the regular background
        const backgroundColor = darken(primaryWhite, 8);

        const textColor = primaryBlackDark;

        const iconColor = "Black";

        const categories = [
            {
                name: "NFTs",
                items: [
                    { name: "VITA", url: "/artist" }
                ]
            },
            {
                name: "Contact",
                items: [{ name: "Contact Us", url: "/contact" }]
            }
        ];

        const categoryItems = categories.map(category => {
            // create the clickable items
            const items = category.items.map(item => {
                return [
                    <Link
                        data-url={item.url ? item.url : "/"}
                        to={item.url ? item.url : "/"}
                        className="pointer opacity-hover primary-black-dark"
                        style={styles.categoryItem}
                        key={`${category.name} ${item.name}`}
                    >
                        {item.name}
                    </Link>,
                    <br key={`${category.name} ${item.name} br`} />
                ];
            });

            return (
                <div key={category.name} style={styles.category}>
                    <div style={styles.categoryName}>{category.name}</div>
                    {items}
                </div>
            );
        });

        return (
            <div style={{ ...styles.container }}>
                <div className="top-shadow" style={{ position: "absolute", zIndex: "100" }}>
                    <div />
                </div>
                <footer
                    style={styles.footer}
                    id="footer"
                    style={{ backgroundColor, color: textColor }}
                    className="font14px"
                >
                    <div style={styles.interior} className={footerClassName}>
                        <div style={styles.logoContainer}>
                            <SublabelLogo />
                            <br />
                            <a
                                href="https://twitter.com/sublabelxyz"
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    alt="Twitter Logo"
                                    style={styles.socialLogo}
                                    src={"/logos/Twitter-" + iconColor + this.props.png}
                                />
                            </a>
                        </div>
                        {fullFooter ? (
                            <div style={styles.categories}>{categoryItems}</div>
                        ) : (
                            <div style={styles.socialMargin} />
                        )}
                    </div>
                    <div className="font10px" style={styles.copyright}>
                        &copy; 2022 Sublabel.xyz All rights reserved.
                    </div>
                </footer>
            </div>
        );
    }
}

const styles = {
    container: { zIndex: "1000", position: "relative", display: "block" },
    copyright: { position: "absolute", right: "10px", bottom: "4px" },
    categories: { display: "inline-block", verticalAlign: "top", margin: "20px auto 20px" },
    category: {
        display: "inline-block",
        verticalAlign: "top",
        width: "125px",
        marginBottom: "10px"
    },
    categoryName: { fontWeight: "bold" },
    categoryItem: { display: "inline-block" },
    logoContainer: { display: "inline-block", verticalAlign: "top", marginRight: "80px" },
    logo: { width: "100px" },
    socialLogo: { height: "16px", marginRight: "16px", marginTop: "-40px" },
    socialMargin: { marginBottom: "20px" },
    footer: { paddingTop: "16px" },
    interior: { margin: "15px 10% 0 15%" }
};

export default Footer;
