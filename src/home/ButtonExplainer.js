import React from "react";

import "./buttonExplainer.css";

class ButtonExplainer extends React.Component {
    render() {
        const { white, text, png } = this.props;
        return (
            <div className="explainer" style={white ? { color: "#ffffff" } : {}}>
                {text}
                <img src={`/images/home/CornerArrow${white ? "White" : ""}${png}`} alt="" />
            </div>
        );
    }
}

export default ButtonExplainer;
