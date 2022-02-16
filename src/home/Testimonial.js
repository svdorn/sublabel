import React from "react";

import "./testimonial.css";

export default ({ logo, quote, profile, name, title, color, logoStyle, companyName }) => {
    return (
        <div className="testimonial">
            <div className="speech-bubble">
                <img
                    src={logo}
                    className="logo"
                    style={logoStyle || {}}
                    alt={companyName + " logo"}
                />
                <br />
                <div className="quote">"{quote}"</div>
                <div className="speech-triangle" />
            </div>
            <div className="profile">
                <img src={profile} alt="Speaker profile" className="profile-picture" />
                <div className="name-and-title">
                    <div>{name}</div>
                    <div style={{ color }}>{title}</div>
                </div>
            </div>
        </div>
    );
};
