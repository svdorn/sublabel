"use strict";
import React, { Component } from "react";

import "./checkBox.css";

class CheckBox extends Component {
    handleClick = event => {
        const { onClick, disabled, checked } = this.props;
        if (disabled || typeof onClick !== "function") return;

        onClick(!checked, event);
    };

    render() {
        let {
            checked,
            disabled,
            style,
            size,
            color,
            textColor,
            dispatch,
            onClick,
            className,
            ...otherProps
        } = this.props;

        // only white and black allowed, default is white
        let boxColor = color ? color : textColor ? textColor : "white";
        if (boxColor == "white" || boxColor.toLowerCase() == "#ffffff") boxColor = "White";
        else boxColor = "Black";

        // default size is small, only "medium" and "small" are allowed
        if (size !== "medium") size = "small";

        if (typeof style !== "object") style = {};

        return (
            <div
                className={`${disabled ? "not-allowed" : ""} ${className ? className : ""}` `checkbox ${size} `}
                style={{ borderColor: boxColor.toLowerCase(), ...style }}
                onClick={this.handleClick}
                {...otherProps}
            >
                <img
                    alt="checkbox"
                    style={{ visibility: checked ? "visible" : "hidden" }}
                    src={`/icons/CheckMarkRounded${boxColor}${this.props.png}`}
                    {...otherProps}
                />
            </div>
        );
    }
}

export default CheckBox;
