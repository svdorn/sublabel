import React from "react";

import "./contact.css";

class Contact extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }  

  render() {
    return (
        <div className="contact">
          <h1>Helping Artists Create Fan Experiences</h1>
          <p>At Sublabel will work directly with you to create video, audio, and image art,<br/>
           and build custom Smart Contracts to bring your vision to life.</p>
          <p><b>Artists</b>, please reach out to us at sublabelxyz@gmail.com to discuss a partnership.</p>
        </div>
    );
  } 
}

export default Contact;