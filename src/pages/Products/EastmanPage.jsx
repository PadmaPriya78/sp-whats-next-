import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useInView } from "../../hooks/useInView";
import { EASTMAN_NAV, EASTMAN_SECTIONS } from "../../data/eastmanData";
import "./EastmanPage.css";

const SCROLL_OFFSET = 170;

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Product Card (reference design: image left + info right) ── */
function ProductCard({ product, delay = 0 }) {
    const [imgError, setImgError] = useState(false);
    const [cardRef, inView] = useInView();

    const showFallback = !product.image || imgError;

    return (
        <article
            ref={cardRef}
            className={`prod-card fade-in-up${inView ? ' visible' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {product.badge && (
                <span className="prod-badge">{product.badge}</span>
            )}

            {/* Image area */}
            <div className="prod-img-wrap">
                {showFallback ? (
                    <div className="prod-img-fallback">
                        <span className="prod-img-icon">☀️</span>
                        <span className="prod-img-label">{product.name}</span>
                    </div>
                ) : (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="prod-img"
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Content area */}
            <div className="prod-body">
                <p className="prod-subtitle">{product.subtitle}</p>
                <h3 className="prod-name">{product.name}</h3>

                {/* Range + Warranty boxes */}
                <div className="prod-info-boxes">
                    {product.range && (
                        <div className="prod-info-box prod-info-box--range">
                            <svg
                                className="prod-info-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M13 2L4.09 12.6H11L10 22L19.91 11.4H13L13 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <div>
                                <span className="prod-info-value">{product.range}</span>
                                <span className="prod-info-label">Range</span>
                            </div>
                        </div>
                    )}
                    {product.warranty && (
                        <div className="prod-info-box prod-info-box--warranty">
                            <svg
                                className="prod-info-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 12l2 2 4-4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div>
                                <span className="prod-info-value">{product.warranty}</span>
                                <span className="prod-info-label">Years Warranty*</span>
                            </div>
                        </div>
                    )}
                </div>

                {product.warranty && (
                    <p className="prod-tc">*T&C Apply</p>
                )}

                <p className="prod-desc">{product.description}</p>

                <ul className="prod-specs">
                    {product.specs.map(({ label, value }) => (
                        <li key={label} className="prod-spec-row">
                            <span className="prod-spec-label">{label}</span>
                            <span className="prod-spec-value">{value}</span>
                        </li>
                    ))}
                </ul>

                <ul className="prod-highlights">
                    {product.highlights.map((h) => (
                        <li key={h}>{h}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/* ── Product Section ── */
function ProductSection({ section }) {
    const [hdrRef, hdrInView] = useInView();

    return (
        <section id={section.id} className="prod-section">
            <div className="container">
                <div
                    ref={hdrRef}
                    className={`section-header fade-in-up${hdrInView ? ' visible' : ''}`}
                >
                    <span className="section-tag">{section.tag}</span>
                    <h2 className="section-title">{section.title}</h2>
                    <p className="section-subtitle">{section.tagline}</p>
                </div>

                <div className="prod-list">
                    {section.products.map((product, i) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            delay={Math.min(i * 0.1, 0.4)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Sticky Category Nav ── */
function CategoryNav({ activeId }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const inverterIds = [
        'section-grid-tie',
        'section-hybrid-lv',
        'section-hybrid-hv',
        'section-off-grid'
    ];

    const inverters = [
        { id: 'section-grid-tie',   label: 'Solar Grid Tie Inverter'                    },
        { id: 'section-hybrid-lv',  label: 'Solar Hybrid Inverter IP65 - Low Voltage'   },
        { id: 'section-hybrid-hv',  label: 'Solar Hybrid Inverter IP65 - High Voltage'  },
        { id: 'section-off-grid',   label: 'Solar Off-Grid Inverter'                    },
    ];

    const otherCategories = [
        { id: 'section-lithium',    label: 'Solar Lithium Battery'                      },
        { id: 'section-tubular',    label: 'Solar Conventional Tubular Battery'         },
        { id: 'section-panels',     label: 'Solar Panels'                               },
    ];

    const isInverterActive = inverterIds.includes(activeId);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInverterClick = (id) => {
        scrollToSection(id);
        setDropdownOpen(false);
    };

    return (
        <div className="prod-cat-nav" role="navigation" aria-label="Eastman product categories">
            <div className="container prod-cat-inner">
                {/* Solar Inverter Dropdown */}
                <div 
                    className="cat-inverter-wrap" 
                    ref={dropdownRef}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button
                        className={`prod-cat-btn${isInverterActive ? ' prod-cat-btn--active' : ''}`}
                        onClick={() => setDropdownOpen((o) => !o)}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                    >
                        <span>Solar Inverter</span>
                        <svg
                            className={`cat-chevron${dropdownOpen ? ' cat-chevron--open' : ''}`}
                            width="12" height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <div className={`prod-cat-dropdown-menu${dropdownOpen ? ' prod-cat-dropdown-menu--open' : ''}`} role="menu">
                        {inverters.map(({ id, label }) => (
                            <button
                                key={id}
                                className={`prod-cat-dropdown-item${activeId === id ? ' prod-cat-dropdown-item--active' : ''}`}
                                onClick={() => handleInverterClick(id)}
                                role="menuitem"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Other Categories */}
                {otherCategories.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`prod-cat-btn${activeId === id ? ' prod-cat-btn--active' : ''}`}
                        onClick={() => scrollToSection(id)}
                        aria-current={activeId === id ? 'true' : undefined}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ── Main Eastman Page ── */
function EastmanPage() {
    const [heroRef, heroInView] = useInView();
    const [activeId, setActiveId] = useState(EASTMAN_NAV[0].id);
    const location = useLocation();

    /* Scroll to hash on first mount or when hash changes */
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (!hash) return;
        const valid = EASTMAN_NAV.some(({ id }) => id === hash);
        if (!valid) return;
        const tryScroll = () => {
            const el = document.getElementById(hash);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        };
        setTimeout(tryScroll, 120);
    }, [location.hash]);

    /* IntersectionObserver — highlights active category in sticky nav */
    useEffect(() => {
        const observers = [];
        EASTMAN_NAV.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
                { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <>
            <Navbar />

            {/* Hero */}
            <div
                ref={heroRef}
                className={`page-hero eastman-hero${heroInView ? ' animate-typing' : ''}`}
            >
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Brand Showcase</span>
                    <h1 className="page-hero-title">Eastman Solar Products</h1>
                    <p className="page-hero-sub">
                        India's #1 solar brand — grid tie inverters, hybrid inverters, lithium batteries, tubular batteries, and high-efficiency panels.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <Link to="/products">Products</Link>
                        <span>›</span>
                        <span>Eastman</span>
                    </nav>
                </div>
            </div>

            {/* Sticky Category Nav */}
            <CategoryNav activeId={activeId} />

            {/* Product Sections */}
            {EASTMAN_SECTIONS.map((section) => (
                <ProductSection key={section.id} section={section} />
            ))}

            <Footer />
        </>
    );
}

export default EastmanPage;
