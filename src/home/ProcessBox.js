import React from "react";

import ShiftArrow from "../miscComponents/ShiftArrow";

import "./ProcessBox.css";

export default ({ variant, png, onClick, style }) => {
    const i = info[variant];
    return (
        <div className="box" onClick={onClick} style={style || {}}>
            <img src={`/images/home/Star${i.starColor}.png`} className="star" style={i.starStyle} />
            {i.hasCornerOutline
                ? [
                      <div key={`${variant} top`} className="outline-top" style={i.topStyle} />,
                      <div
                          key={`${variant} starter side`}
                          className="outline-side-starter"
                          style={i.starterSideStyle}
                      />,
                      <div
                          key={`${variant} bottom`}
                          className="outline-bottom"
                          style={i.bottomStyle}
                      />,
                      <div
                          key={`${variant} follower side`}
                          className="outline-side-follower"
                          style={i.followerSideStyle}
                      />
                  ]
                : [
                      <div key="top" className="outline-c-top" style={i.topStyle} />,
                      <div key="left" className="outline-c-left" style={i.colorStyle} />,
                      <div key="right" className="outline-c-right" style={i.colorStyle} />,
                      <div key="bl" className="outline-c-bottom-left" style={i.colorStyle} />,
                      <div key="br" className="outline-c-bottom-right" style={i.colorStyle} />
                  ]}
            <img src={i.img + png} className="icon" />
            <h2 className="title">{i.title}</h2>
            <h4>{i.subtext}</h4>
            {onClick ? (
                <div className="cta" style={{ color: i.color }}>
                    <b className="cta-text">{i.cta}</b>
                    <ShiftArrow
                        color={i.color}
                        width="12px"
                        style={{ marginBottom: "3px" }}
                        nested
                    />
                </div>
            ) : null}
        </div>
    );
};

const colors = {
    sell: "#fe7774",
    curate: "#28d5d4",
    relationships: "#9369fe"
};
const info = {
    sell: {
        img: `/images/home/1`,
        title: "Artists create unique NFTs",
        subtext:
            "Musicians develop custom video, audio, and visual NFTs with experiences and giveaways embedded.",
        cta: "Explore Art",
        color: colors["sell"],
        topStyle: {
            left: 0,
            transformOrigin: "top left",
            backgroundColor: colors["sell"]
        },
        starterSideStyle: {
            left: 0,
            transformOrigin: "top left",
            backgroundColor: colors["sell"]
        },
        bottomStyle: {
            left: 0,
            transformOrigin: "bottom left",
            backgroundColor: colors["sell"]
        },
        followerSideStyle: {
            right: 0,
            transformOrigin: "top right",
            backgroundColor: colors["sell"]
        },
        hasCornerOutline: true,
        starColor: "Red",
        starStyle: { bottom: 0, right: "0", transform: "translate(29%, 25%)" }
    },
    curate: {
        img: `/images/home/2`,
        title: "Curators Buy Direct",
        subtext:
            "Curators buy art and experiences directly from musicians, building their music collections.",
        cta: "Build your Collection",
        color: "#28d5d4",
        topStyle: {
            left: 0,
            transformOrigin: "top center",
            backgroundColor: colors["curate"]
        },
        colorStyle: { backgroundColor: colors["curate"] },
        starColor: "Green",
        starStyle: { bottom: 0, left: "50%", transform: "translate(-50%,50%) rotate(46deg)" }
    },
    relationships: {
        img: `/images/home/3`,
        title: "Relationships Build",
        subtext: "Relationships are built as artists and fans directly communicate and support each other.",
        cta: "Support Artists",
        color: "#9369fe",
        topStyle: { right: 0, transformOrigin: "top right", backgroundColor: colors["relationships"] },
        starterSideStyle: {
            right: 0,
            transformOrigin: "top right",
            backgroundColor: colors["relationships"]
        },
        bottomStyle: { right: 0, transformOrigin: "bottom right", backgroundColor: colors["relationships"] },
        followerSideStyle: {
            left: 0,
            transformOrigin: "top left",
            backgroundColor: colors["relationships"]
        },
        hasCornerOutline: true,
        starColor: "Purple",
        starStyle: { bottom: 0, left: "0", transform: "translate(-29%, 25%)" }
    }
};
