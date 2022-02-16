import React from "react";
import classNames from "classnames";

import "./customTabs.css";

class CustomTab extends React.Component {
    // when a tab is clicked, tell the parent that the tab was clicked
    onTabClick = event => {
        if (!event || !event.target) return console.log("invalid event: ", event);

        let target = event.target;
        let attempts = 0;
        while (target.nodeName !== "BUTTON" && attempts < 5) {
            target = target.parentElement;
            attempts++;
        }

        if (attempts == 5) return console.log("Too many nested elements in CustomTab.");
        if (typeof target.value !== "string") return console.log("Invalid target: ", target);

        if (typeof this.props.onClick !== "function")
            return console.log("onClick has not been defined for the Tab component");

        this.props.onClick(target.value);
    };

    render() {
        const { name, active, children } = this.props;
        return (
            <button
                value={name}
                onClick={this.onTabClick}
                className={classNames("tab", { active })}
            >
                {children}
            </button>
        );
    }
}

export default CustomTab;
