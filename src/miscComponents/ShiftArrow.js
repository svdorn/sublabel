import React, { Component } from "react";
import { propertyExists } from "../miscFunctions";
import { pureBlack, primaryWhite, primaryCyan } from "../colors";
import "./ShiftArrow.css";
import ArrowIcon from "../icons/ArrowIcon";

class ShiftArrow extends Component {
    getArrowColor = () => {
        const {
            color,
            buttonTextColor,
            primaryColor,
            secondaryColor,
            inButton,
            textColor,
            backgroundColor
        } = this.props;

        let arrowColor = primaryWhite;
        if (color) {
            if (["cyan", "blue"].includes(color)) arrowColor = primaryCyan;
            else arrowColor = color;
        } else if (inButton) {
            if (propertyExists(this, ["props", "theme", "palette", "secondary", "contrastText"])) {
                arrowColor = this.props.theme.palette.secondary.contrastText;
            } else if (buttonTextColor) {
                arrowColor = buttonTextColor;
            } else if (secondaryColor || primaryColor) {
                arrowColor = this.props.theme.palette.getContrastText(
                    secondaryColor || primaryColor
                );
            } else {
                arrowColor = pureBlack;
            }
        } else if (textColor) {
            arrowColor = textColor;
        } else if (backgroundColor) {
            arrowColor = this.props.theme.palette.getContrastText(backgroundColor);
        } else {
            arrowColor = primaryWhite;
        }

        return arrowColor;
    };

    render() {
        const style = typeof this.props.style === "object" ? this.props.style : {};
        const disabledStyle = this.props.disabled ? "disabled" : "";
        return (
            <ArrowIcon
                width={this.props.width ? this.props.width : "10px"}
                color={this.getArrowColor()}
                style={style}
                className={`${this.props.reversed ? "reverse-" : ""}shift-arrow ${disabledStyle} ${
                    this.props.nested ? "nested-in-div" : ""
                }`}
            />
        );
    }
}

export default ShiftArrow;
