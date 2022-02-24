import React from "react";
import classNames from "classnames";
import { goTo } from "../miscFunctions";
import colors from "../colors";

import ShiftArrow from "../miscComponents/ShiftArrow";
import HomeButton from "./HomeButton";
import HomeOutlinedButton from "./HomeOutlinedButton";
import MetaTags from "react-meta-tags";
import ProcessBox from "./ProcessBox";
import ButtonExplainer from "./ButtonExplainer";
import ScienceBox from "./ScienceBox";
import ShortWaveBackground from "./ShortWaveBackground";

import "./home.css";

const TIME_PER_SCREENSHOT = 8000;

const goToBookDemo = () => goTo("/book-demo");
const goToCultureQuiz = () => goTo("/intro-page/culture");
const goToScience = () => goTo("/science");
const goToTryAssessment = () => goTo("/intro-page/assessment");
const goToRollingStoneArticle = () =>
    window.open(
        "https://www.rollingstone.com/pro/news/music-artists-make-12-percent-from-music-sales-706746/",
        "_blank"
    );
const goToMusicNFTs = () =>
window.open(
    "https://cryptonews.com/exclusives/how-music-nfts-could-disrupt-music-industry.htm#:~:text=Music%20NFTs%20are%20music%20tracks,for%20every%20secondary%20market%20sale.",
    "_blank"
);  
const scrollToScreenshots = () => {
    window.scroll({
        top: document.getElementById("section-screenshots").offsetTop,
        left: 0,
        behavior: "smooth"
    });
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { selectedScreenshotButton: "1" };
    }

    componentDidMount() {
      this.resetTimer();

      this.setState({
          
      });
    }

    componentWillUnmount() {
        window.clearTimeout(this.videoTimer);
    }

    onPreviousScreenshot = () => {
        let newSelected = parseInt(this.state.selectedScreenshotButton, 10);
        newSelected--;
        if (newSelected < 1) newSelected = 3;
        newSelected = newSelected.toString();

        this.updateScreenshot(newSelected);
    };

    onNextScreenshot = () => {
        let newSelected = parseInt(this.state.selectedScreenshotButton, 10);
        newSelected++;
        if (newSelected > 3) newSelected = 1;
        newSelected = newSelected.toString();

        this.updateScreenshot(newSelected);
    };

    updateScreenshot = selectedScreenshot => {
        this.setState({ selectedScreenshotButton: selectedScreenshot });
        this.resetTimer();
    };

    resetTimer = () => {
        let bar = document.getElementById("home-progress-bar");
        this.removeAnimation(bar);
        setTimeout(() => this.addAnimation(bar), 3);
        window.clearTimeout(this.videoTimer);
        this.videoTimer = window.setTimeout(this.onNextScreenshot, TIME_PER_SCREENSHOT);
    };

    removeAnimation = element => this.setAnimation(element, "none");
    addAnimation = element => this.setAnimation(element, "");
    setAnimation = (element, animation) => {
        ["webkit", "moz", "ms", "o", ""].forEach(animationType =>
            this.addSpecificAnimation(element, animation, animationType)
        );
    };
    addSpecificAnimation = (element, animation, animationType) =>
        (element.style[animationType + "Animation"] = animation);

    // when one of the screenshot buttons is clicked, mark it as selected
    selectScreenshotButton = event => this.updateScreenshot(event.currentTarget.value);

    render() {
        const png = ".png";

        return (
            <div className="home">
                <MetaTags>
                    <title>Sublabel</title>
                    <meta
                        name="description"
                        content="Invest in Custom Music NFTs. Become a music curator."
                    />
                </MetaTags>
                <IntroSection png={png} />
                <ProcessSection png={png} />
                <ScreenshotSection
                    selectScreenshotButton={this.selectScreenshotButton}
                    selectedScreenshotButton={this.state.selectedScreenshotButton}
                    onNextScreenshot={this.onNextScreenshot}
                    onPreviousScreenshot={this.onPreviousScreenshot}
                />
                <TryItSection />
                <FounderSection />
                <TryIt2Section png={png} />
            </div>
        );
    }
}

const IntroSection = ({ png }) => {
    return (
        <section className="section-intro">
            <div className="center">
                <h1>
                    Invest in Custom Music NFTs{" "}
                    <br />
                    Become a Music Curator
                </h1>
                <h4 className="subtext">
                    A music NFT marketplace on <b>Arbitrum</b> to connect musicians with their fans.{" "}
                    <br className="above500only" />
                    Building customized music NFT experiences for artists.
                </h4>
                <div className="side-by-side-buttons" style={{ display: "block" }}>
                    <div>
                        <HomeButton
                            text="Explore"
                            onClick={goToBookDemo}
                            colors={[colors.palette4Light, colors.palette4Dark]}
                        />
                    </div>
                    <div>
                        <HomeOutlinedButton
                            text="Create"
                            onClick={goToScience}
                            color={colors.palette4Dark}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProcessSection = ({ png }) => {
    return (
        <section className="section-process">
            <h1>How it works</h1>
            <ProcessBox variant="sell" onClick={goToCultureQuiz} png={png} />
            <ProcessBox variant="curate" onClick={goToTryAssessment} png={png} />
            <ProcessBox variant="relationships" png={png} onClick={scrollToScreenshots} />
        </section>
    );
};

const ScreenshotSection = ({
    selectedScreenshotButton,
    selectScreenshotButton,
    onNextScreenshot,
    onPreviousScreenshot
}) => {
    return (
        <section className="section-screenshots" id="section-screenshots">
            <div className="wave">
                <div className="wave-cap-left" />
                <img src="/images/home/Wave.png" alt="Wave" />
                <div className="wave-cap-right" />
            </div>
            <div className="top-space" />
            <div className="both-sides">
                <div>
                    <h2>Featured Artist - <b>VITA</b></h2>
                    <ScreenshotButton
                        text="Hailing from Sydney, Australia, multidimensional artist Vita is pushing the boundaries of society"
                        selectScreenshotButton={selectScreenshotButton}
                        selected={selectedScreenshotButton}
                        value="1"
                    />
                    <ScreenshotButton
                        text="Vita, named after her great aunt who died in the Holocaust, carries the power of her ancestors with her"
                        selectScreenshotButton={selectScreenshotButton}
                        selected={selectedScreenshotButton}
                        value="2"
                    />
                    <ScreenshotButton
                        text="Vita's craft defies genre lines, and forces fans to envision a separate world where her music lives"
                        selectScreenshotButton={selectScreenshotButton}
                        selected={selectedScreenshotButton}
                        value="3"
                    />
                    <div className="screenshots-cta">
                        <HomeButton
                            colors={[colors.primaryWhite]}
                            textColor={[colors.palette2Dark]}
                            text="View Collection"
                            onClick={goToScience}
                        />
                    </div>
                </div>
                <div className="center">
                    <div className="image-container">
                        {["1", "2", "3"].map(num => (
                            <img
                                key={`featured artist ${num}`}
                                src={`/images/home/VITA/${num}.png`}
                                alt={`featured artist ${num}`}
                                style={selectedScreenshotButton === num ? {} : { display: "none" }}
                            />
                        ))}
                        <div className="progress-bar" id="home-progress-bar" />
                    </div>
                </div>
                <div />
            </div>
        </section>
    );
};

const ScreenshotButton = ({ selected, text, value, selectScreenshotButton }) => (
    <button
        className={classNames("screenshot-button", { selected: selected === value })}
        onClick={selectScreenshotButton}
        value={value}
    >
        {text}
    </button>
);

const TryItSection = () => {
    return (
        <section className="section-try-it center">
            <div className="decorative-circle" />
            <div className="decorative-circle" />
            <div className="decorative-circle" />
            <div className="decorative-circle" />
            <div className="try-it-box">
                <div className="outline-top" />
                <div className="outline-left" />
                <div className="outline-right" />
                <div className="outline-bottom" />
                <h2>Invest in your favorite musicians</h2>
                <div className="side-by-side-buttons">
                    <div>
                        <HomeButton
                            to="/artist"
                            text="Explore Featured Artists"
                            onClick={goToCultureQuiz}
                            colors={[colors.palette3Light, colors.palette3Dark]}
                        />
                        <ButtonExplainer text="For Curators and Fans" />
                    </div>
                    <div>
                        <HomeOutlinedButton
                            to="/artist"
                            text="Give Ownership to Fans"
                            onClick={goToTryAssessment}
                            color={colors.palette3Dark}
                        />
                        <ButtonExplainer text="For Musicians" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FounderSection = () => {
    const bookDemoCta = (
        <div className="center inline-block">
            <HomeButton
                text="Explore Collections"
                onClick={goToBookDemo}
                colors={[colors.palette4Dark, colors.palette4Light]}
            />
            <ButtonExplainer text="Believe in Artists" />
        </div>
    );
    return (
        <section className="section-science">
            <div>
                <div className="science-description">
                    <h2>Aligned with Artists and Fans</h2>
                    <p>
                        Sublabel works directly with Artists to create custom video, audio, and image art 
                        and smart contracts that carry out the Artist's vision. We are focused on creating 
                        unique fan experiences and pushing the boundaries of music NFTs. Our mission is to 
                        open up a new way for musicians of all kinds, big and small, to connect with their fanbases.
                    </p>
                    <p>
                        Our founders have worked in the legacy music industry and produced hit records working with some of 
                        the biggest musicians in the world. We have seen the old model and ready to pave new monetization avenues for artists. 
                    </p>
                    <div className="above700only">{bookDemoCta}</div>
                </div>
                <div className="science-boxes">
                    <ScienceBox
                        text="Musicians only get 12% of the money the music industry makes. New artists struggle to make money in the streaming world if they don't have large fan bases."
                        action="See the Data"
                        actionColor={colors.palette4Dark}
                        onClick={goToRollingStoneArticle}
                    />
                    <ScienceBox
                        text="Music NFTs allow artists to connect with their fans directly and cut out the middlemen. New artists have the ability to monetize off of a smaller number of passionate fans."
                        action="Read More"
                        actionColor={colors.palette4Dark}
                        onClick={goToMusicNFTs}
                    />
                </div>
            </div>
            <div className="demo-under-700">{bookDemoCta}</div>
        </section>
    );
};

const TryIt2Section = () => {
    return (
        <section className="section-try-it-2">
            <ShortWaveBackground />
            <div className="try-it-2-content">
                <h2>It's time to support artists.</h2>
                <div className="side-by-side-buttons">
                    <div>
                        <HomeButton
                            to="/artist"
                            text="Explore Featured Artists"
                            onClick={goToCultureQuiz}
                            colors={[colors.primaryWhite]}
                            textColor={["#6582fe"]}
                        />
                        <ButtonExplainer text="For Curators and Fans" white />
                    </div>
                    <div>
                        <HomeOutlinedButton
                            to="/artist"
                            text="Give Ownership to Fans"
                            onClick={goToTryAssessment}
                            color={colors.primaryWhite}
                        />
                        <ButtonExplainer text="For Musicians" white />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
