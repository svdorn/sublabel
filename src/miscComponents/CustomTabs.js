import React from "react";

import "./customTabs.css";

class CustomTabs extends React.Component {
    render() {
        return <div className="tabs">{this.props.children}</div>;
    }
}

export default CustomTabs;
