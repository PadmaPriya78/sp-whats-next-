import { useState, useEffect, useCallback } from "react";
import "./Hero.css";

import bannerResidential from "../../assets/images/hero/banner-residential.png";
import bannerOngrid from "../../assets/images/hero/banner-ongrid.png";
import bannerOffgrid from "../../assets/images/hero/banner-offgrid.png";
import bannerHybrid from "../../assets/images/hero/banner-hybrid.png";
import bannerWiseChoice from "../../assets/images/hero/banner-wisechoice.png";

const slides = [
    {
        image: bannerResidential,
        headline: ["Residential Solar", "With Storage"],
        cta: { text: "Making Rooftops Profitable", href: "#" },
        hashtag: true,
        align: "left",
    },
    {
        image: bannerOngrid,
        headline: ["Solar On-Grid", "Solution"],
        cta: null,
        hashtag: true,
        align: "left",
    },
    {
        image: bannerOffgrid,
        headline: ["Solar Off-Grid", "Solution"],
        cta: null,
        hashtag: true,
        align: "left",
    },
    {
        image: bannerHybrid,
        headline: ["Solar Hybrid", "Solution"],
        cta: null,
        hashtag: true,
        align: "left",
    },
    {
        image: bannerWiseChoice,
        headline: null,
        centeredHashtag: true,
        cta: null,
        hashtag: false,
        align: "center",
    },
];

const INTERVAL = 5000;

function Hero() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [textVisible, setTextVisible] = useState(true);

    const goTo = useCallback(
        (idx) => {
            if (animating || idx === current) return;
            setAnimating(true);
            setTextVisible(false);

            setTimeout(() => {
                setCurrent(idx);
                setTimeout(() => {
                    setTextVisible(true);
                    setAnimating(false);
                }, 100);
            }, 400);
        },
        [animating, current]
    );

    const next = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    return (
        <section className="hero-banner" aria-label="Hero banner carousel" id="hero-banner">
            {/* Background Slides */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className={`hero-banner__slide ${i === current ? "hero-banner__slide--active" : ""}`}
                    aria-hidden={i !== current}
                >
                    <img
                        src={s.image}
                        alt={s.headline ? s.headline.join(" ") : "Dynamic Solar Power"}
                        className="hero-banner__bg"
                    />
                </div>
            ))}

            {/* Dark Overlay */}
            <div className="hero-banner__overlay" />

            {/* Hexagon Pattern (left side decorative) */}
            <div className="hero-banner__hex-pattern" aria-hidden="true">
                <svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hexPattern" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                            <polygon points="30,0 60,15 60,37 30,52 0,37 0,15" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="400" height="700" fill="url(#hexPattern)" />
                </svg>
            </div>

            {/* Content */}
            <div className={`hero-banner__content ${textVisible ? "hero-banner__content--visible" : ""}`}>
                <div className={`hero-banner__container ${slide.align === "center" ? "hero-banner__container--center" : ""}`}>
                    {/* Regular slide with headline */}
                    {slide.headline && (
                        <div className="hero-banner__title">
                            <h1 className={`hero-banner__heading ${!slide.cta ? "hero-banner__heading--underline" : "hero-banner__heading--no-border"}`}>
                                {slide.headline[0]}
                                <br />
                                {slide.headline[1]}
                            </h1>
                            {slide.cta && (
                                <div className="hero-banner__action">
                                    <a className="hero-banner__btn" href={slide.cta.href} id="hero-cta-btn">
                                        {slide.cta.text}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Centered hashtag slide (last slide) */}
                    {slide.centeredHashtag && (
                        <div className="hero-banner__title hero-banner__title--centered">
                            <h1 className="hero-banner__heading hero-banner__heading--no-border hero-banner__heading--hashtag-main">
                                #The<span className="hero-banner__wise">Wise</span>Choice
                            </h1>
                        </div>
                    )}

                    {/* Bottom-left hashtag */}
                    {slide.hashtag && (
                        <div className="hero-banner__hashtag">
                            #The<span className="hero-banner__wise">Wise</span>Choice
                        </div>
                    )}
                </div>
            </div>

            {/* Dot Navigation */}
            <div className="hero-banner__dots" role="tablist">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`hero-banner__dot ${i === current ? "hero-banner__dot--active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        role="tab"
                        aria-selected={i === current}
                        id={`hero-banner-dot-${i}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Hero;