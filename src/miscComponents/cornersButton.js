import React, { Component } from "react";
import { noop } from "../miscFunctions";
import { primaryCyan, primaryWhite } from "../colors";
import ArrowIcon from "../icons/ArrowIcon";
import "./cornersButton.css";

class CornersButton extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let {
            className,
            onClick,
            color1,
            color2,
            style,
            content,
            png,
            size,
            active,
            arrow,
            paddingSides,
            paddingTop
        } = this.props;
        if (typeof className !== "string") {
            className = "";
        }
        if (typeof onClick !== "function") {
            onClick = noop;
        }
        if (typeof color1 !== "string") {
            color1 = primaryCyan;
        }
        if (typeof color2 !== "string") {
            color2 = primaryWhite;
        }
        if (typeof style !== "object") {
            style = {};
        }
        if (typeof size !== "string") {
            size = "";
        }
        if (typeof paddingSides !== "string") {
            paddingSides = "50px";
        }
        if (typeof paddingTop !== "string") {
            paddingTop = "16px";
        }
        paddingSides = "side-padding-" + paddingSides;
        paddingTop = "top-padding-" + paddingTop;

        return (
            <div
                className={`button ${size} ${active ? "active" : ""} ${paddingSides} ${paddingTop}`}
                onClick={onClick}
                style={style}
            >
                <div className="content" style={{ color: color1 }}>
                    {content}
                </div>
                <div className="border border-top" style={{ backgroundColor: color1 }} />
                <div className="border border-right" style={{ backgroundColor: color1 }} />
                <div className="border border-bottom" style={{ backgroundColor: color1 }} />
                <div className="border border-left" style={{ backgroundColor: color1 }} />
                <div className="under-hover-content" style={{ backgroundColor: color1 }} />
                <div className="hover-content" style={{ color: color2 }}>
                    {content}
                </div>
                {arrow === false ? null : <ArrowIcon className="arrow" color={primaryWhite} />}
                <div className="above-hover-content" style={{ backgroundColor: color1 }} />
            </div>
        );
    }
}

export default CornersButton;
