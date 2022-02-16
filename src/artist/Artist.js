import React from "react";

import "./artist.css";

class Artist extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }  

  render() {
    return (
        <div className="artist">
          <h1>VITA</h1>
          <section className="artist-intro">
            <div>
              <img src="images/home/VITA/1.png" alt="Artist EP" />
            </div>
            <div>
              <p>Hailing from East Killara, Sydney, Australia, multidimensional artist Vita is pushing the boundaries of society, and teaching her fans to do the same. Inspired at an early age from her mother, Helen Libre, who is a jazz singer and samba dancer, Vita calls on her earliest memories for inspiration in her music career today.</p>
              <p>She draws inspiration from her parents, who have been a driving force in her passions for both music and activism, forming both into a pivotal part of her life and her art. Vita, who was named after her great aunt who died in the Holocaust, has carried the power of her ancestors with her throughout her artistic journey. That strength is evident in her music, and the way that her art makes listeners feel.</p>
              <p>With musical influences that range from Rihanna to Kevin Parker to Rage Against The Machine, Vita’s sound is impossible to define with modern language. Her craft defies genre lines, and forces fans to envision a separate world where her music lives. Born in the age of information, Vita has had no lack for sources of inspiration. Despite her wide range of influences, Vita has had her sights set on creating something truly unique with her music, and her debut as an artist will unveil that she has well surpassed her goal. She is not content with anything that limits her within society, and her music speaks to the generation that shares those values.</p>
            </div>
          </section>
        </div>
    );
  } 
}

export default Artist;