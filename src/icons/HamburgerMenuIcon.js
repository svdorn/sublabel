import React, { Component } from "react";
import { noop } from "../miscFunctions";

class HamburgerMenuIcon extends Component {
    render() {
        const color = this.props.color || this.props.textColor || "#ffffff";
        const width = this.props.width !== undefined ? this.props.width : "16px";
        const height = this.props.height ? this.props.height : null;
        const style = this.props.style || {};
        const className = this.props.className ? this.props.className : "";
        const onClick = typeof this.props.onClick === "function" ? this.props.onClick : noop;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 225 133.5"
                onClick={onClick}
                height={height}
                width={width}
                className={className}
                style={style}
            >
                <path
                    fill="none"
                    stroke={color}
                    strokeMiterlimit="10"
                    strokeWidth="23"
                    d="M0 11.5h225M0 67h225M0 122h225"
                />
            </svg>
        );
    }
}

export default HamburgerMenuIcon;
