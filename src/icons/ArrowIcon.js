import React, { Component } from "react";
import { noop } from "../miscFunctions";

class ArrowIcon extends Component {
    render() {
        const color = this.props.color || this.props.textColor || "#ffffff";
        const width = this.props.width !== undefined ? this.props.width : "16px";
        const height = this.props.height ? this.props.height : null;
        const style = this.props.style || {};
        const className = this.props.className ? this.props.className : "";
        const onClick = this.props.onClick || noop;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 252 169"
                height={height}
                width={width}
                style={style}
                className={className}
                onClick={onClick}
            >
                <path
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M16 86h219M158 153l78-67M158 16l78 67"
                />
            </svg>
        );
    }
}

export default ArrowIcon;
