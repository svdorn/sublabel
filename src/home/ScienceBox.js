import React from "react";

import ShiftArrow from "../miscComponents/ShiftArrow";

import "./scienceBox.css";

export default ({ text, action, actionColor, onClick }) => (
    <div className="science-box" onClick={onClick}>
        <div className="text">{text}</div>
        <span style={{ color: actionColor }} className="action">
            {action}
        </span>{" "}
        <ShiftArrow color={actionColor} style={{ marginBottom: "2px" }} width="12px" />
    </div>
);
