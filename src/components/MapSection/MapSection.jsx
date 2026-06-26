import { useState, useEffect, useRef } from "react";
import "./MapSection.css";

/* ── Pin positions across the Chennai Metropolitan Area ── */
const PINS = [
    /* Ponneri / North */
    [260,55],[280,62],[240,68],[300,72],[270,80],[225,82],[310,85],[255,90],
    /* Ambattur / Upper-left */
    [195,108],[175,120],[210,122],[160,135],[190,148],[145,155],
    /* North Chennai / Upper-right */
    [330,98],[350,112],[315,115],[360,128],[340,138],[325,152],
    /* Thiruvallur / Mid-left */
    [135,198],[155,215],[120,228],[145,242],[165,255],[130,268],
    /* Central interior */
    [240,168],[260,182],[220,195],[280,200],[245,215],[265,232],[230,245],[255,260],
    /* Central Chennai / Coast */
    [345,215],[365,228],[330,242],[375,255],[350,270],[340,288],
    /* South Chennai */
    [310,325],[330,345],[295,358],[315,372],[280,385],[300,398],
    /* Tambaram */
    [245,328],[265,348],[230,362],[255,378],[240,398],[260,415],
    /* Kancheepuram */
    [155,358],[175,378],[140,392],[165,410],[148,428],
    /* Chengalpattu */
    [225,452],[245,470],[210,485],[235,502],[220,522],
];

/* ── Area Labels with leader line endpoints ── */
const LABELS = [
    { text: "Ponneri",         tx: 275, ty: 18,  x1: 275, y1: 22,  x2: 268, y2: 48,  anchor: "middle" },
    { text: "Ambattur",        tx: 75,  ty: 122, x1: 80,  y1: 122, x2: 150, y2: 132, anchor: "end" },
    { text: "North Chennai",   tx: 418, ty: 100, x1: 413, y1: 100, x2: 365, y2: 98,  anchor: "start" },
    { text: "Thiruvallur",     tx: 75,  ty: 238, x1: 80,  y1: 238, x2: 100, y2: 228, anchor: "end" },
    { text: "Central Chennai", tx: 418, ty: 252, x1: 413, y1: 252, x2: 388, y2: 248, anchor: "start" },
    { text: "Kancheepuram",    tx: 75,  ty: 412, x1: 80,  y1: 412, x2: 108, y2: 398, anchor: "end" },
    { text: "South Chennai",   tx: 418, ty: 400, x1: 413, y1: 400, x2: 348, y2: 390, anchor: "start" },
    { text: "Tambaram",        tx: 395, ty: 492, x1: 390, y1: 492, x2: 285, y2: 478, anchor: "start" },
    { text: "Chengalpattu",    tx: 215, ty: 612, x1: 215, y1: 602, x2: 212, y2: 565, anchor: "middle" },
];

/* ── Chennai Metropolitan Area (Detailed District Paths) ── */
const DISTRICTS = [
    // North (Ponneri)
    "M 260,30 L 290,25 L 320,40 L 335,55 L 350,80 L 330,95 L 305,100 L 285,90 L 265,105 L 250,85 L 240,60 Z",
    // North Chennai / Ambattur
    "M 250,85 L 265,105 L 285,90 L 305,100 L 330,95 L 350,80 L 365,110 L 380,140 L 390,170 L 375,190 L 350,185 L 330,165 L 310,180 L 280,170 L 260,140 L 235,145 L 220,125 L 230,100 Z",
    // Central Chennai
    "M 375,190 L 390,170 L 395,210 L 390,250 L 385,290 L 370,300 L 355,270 L 330,280 L 320,250 L 335,225 L 325,200 L 350,185 Z",
    // Thiruvallur
    "M 220,125 L 235,145 L 260,140 L 280,170 L 310,180 L 330,165 L 325,200 L 335,225 L 320,250 L 330,280 L 300,285 L 280,260 L 255,275 L 235,250 L 210,260 L 195,235 L 170,240 L 150,215 L 140,180 L 115,160 L 110,130 L 125,100 L 155,85 L 185,90 L 200,110 Z",
    // Kancheepuram
    "M 170,240 L 195,235 L 210,260 L 235,250 L 255,275 L 280,260 L 300,285 L 330,280 L 355,270 L 370,300 L 360,335 L 340,355 L 325,385 L 300,390 L 280,420 L 255,425 L 240,400 L 215,410 L 195,385 L 170,390 L 150,365 L 135,330 L 110,310 L 105,280 L 120,250 L 145,260 Z",
    // Tambaram
    "M 280,420 L 300,390 L 325,385 L 340,355 L 360,335 L 370,300 L 385,290 L 380,320 L 370,355 L 355,390 L 340,425 L 320,460 L 295,475 L 275,450 Z",
    // Chengalpattu
    "M 170,390 L 195,385 L 215,410 L 240,400 L 255,425 L 280,420 L 275,450 L 295,475 L 320,460 L 305,490 L 285,515 L 265,540 L 240,560 L 220,575 L 195,580 L 180,560 L 165,540 L 150,515 L 135,490 L 145,460 L 130,430 L 150,415 Z"
];

/* ── Stats Data ── */
const STATS = [
    { label: "Annual Co2 Mitigated",    end: 2280,     prefix: "",  suffix: " tons" },
    { label: "Annual Customer Savings", end: 20428800, prefix: "₹", suffix: "" },
    { label: "Annual Equivalent Trees", end: 83904,    prefix: "",  suffix: "" },
];

/* ── Counter Hook ── */
function useCounter(end, duration, active) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) { setCount(0); return; }
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [active, end, duration]);
    return count;
}

/* ── Stat Card with Counter ── */
function StatCard({ stat, active }) {
    const count = useCounter(stat.end, 2200, active);
    const formatted = count.toLocaleString("en-US");
    return (
        <div className="map-stat-card">
            <div className="map-stat-card-label">{stat.label}</div>
            <div className="map-stat-card-value">
                {stat.prefix}{formatted}{stat.suffix}
            </div>
        </div>
    );
}

/* ── MapSection Component ── */
function MapSection() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const projectCount = useCounter(500, 2000, visible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="map-section" ref={sectionRef} id="service-area">
            <div className="container">
                {/* Header */}
                <div className={`section-header map-header fade-in-up ${visible ? "visible" : ""}`}>
                    <span className="section-tag">Our Reach</span>
                    <h2 className="section-title">
                        Trusted by families across <span>Chennai</span>
                    </h2>
                </div>

                {/* Content: Map + Stats */}
                <div className="map-content">
                    {/* Left — SVG Map */}
                    <div className={`map-svg-wrap fade-in-left ${visible ? "visible" : ""}`}>
                        <svg
                            viewBox="-20 0 560 640"
                            xmlns="http://www.w3.org/2000/svg"
                            className="map-svg"
                            aria-label="Map showing Dynamic Solar installations across Chennai"
                        >
                            <defs>
                                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fff3e8" />
                                    <stop offset="50%" stopColor="#fde1c0" />
                                    <stop offset="100%" stopColor="#f9c990" />
                                </linearGradient>
                                <clipPath id="mapClip">
                                    <path d="M 150,50 L 180,40 L 210,40 L 220,50 L 260,60 L 280,55 L 290,65 L 300,60 L 310,75 L 280,85 L 260,110 L 245,150 L 230,190 L 210,240 L 205,270 L 195,300 L 175,340 L 160,370 L 140,400 L 130,430 L 120,440 L 110,430 L 100,440 L 80,420 L 70,430 L 50,420 L 40,400 L 50,380 L 45,360 L 55,340 L 40,320 L 50,300 L 45,280 L 55,270 L 40,260 L 50,250 L 45,230 L 55,210 L 50,190 L 60,180 L 55,160 L 65,150 L 60,140 L 75,130 L 80,110 L 95,95 L 100,75 L 115,65 L 130,60 Z" />
                                </clipPath>
                                <filter id="mapDropShadow" x="-5%" y="-3%" width="110%" height="108%">
                                    <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#f47b20" floodOpacity="0.08" />
                                </filter>
                            </defs>

                            {/* Map district fills with borders */}
<g filter="url(#mapDropShadow)">
    {DISTRICTS.map((path, i) => (
        <path
            key={i}
            d={path}
            fill="url(#mapGrad)"
            stroke="#f47b20"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeOpacity="0.35"
        />
    ))}
</g>

                            {/* Area labels + leader lines */}
                            {LABELS.map((l, i) => (
                                <g
                                    key={i}
                                    className="map-label-group"
                                    style={{ animationDelay: `${i * 80 + 400}ms` }}
                                >
                                    <line
                                        x1={l.x1} y1={l.y1}
                                        x2={l.x2} y2={l.y2}
                                        stroke="#e8a87c"
                                        strokeWidth="1"
                                    />
                                    <circle
                                        cx={l.x2} cy={l.y2}
                                        r="2.5"
                                        fill="#f47b20"
                                        opacity="0.9"
                                    />
                                    <text
                                        x={l.tx} y={l.ty}
                                        textAnchor={l.anchor}
                                        fontSize="11.5"
                                        fontWeight="600"
                                        fill="#555555"
                                        fontFamily="Inter, sans-serif"
                                    >
                                        {l.text}
                                    </text>
                                </g>
                            ))}

                            {/* Location pins */}
                            {PINS.map(([x, y], i) => (
                                <g
                                    key={i}
                                    transform={`translate(${x},${y})`}
                                    className="map-pin"
                                    style={{ animationDelay: `${i * 30 + 200}ms` }}
                                >
                                    <path
                                        d="M0,-17 C4,-17 7,-13 7,-9 C7,-3.5 0,0 0,0 S-7,-3.5 -7,-9 C-7,-13 -4,-17 0,-17 Z"
                                        fill="#d9670f"
                                    />
                                    <circle cx="0" cy="-9.5" r="2.2" fill="white" opacity="0.9" />
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Right — Stats */}
                    <div className={`map-stats fade-in-right ${visible ? "visible" : ""}`}>
                        {/* Hero stat */}
                        <div className="map-stat-hero">
                            <div className="map-stat-hero-number">{projectCount}+</div>
                            <div className="map-stat-hero-label">PROJECTS</div>
                            <div className="map-stat-hero-sub">
                                Executed across all over Chennai
                            </div>
                        </div>

                        {/* Metric cards */}
                        {STATS.map((stat, i) => (
                            <StatCard key={i} stat={stat} active={visible} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MapSection;
