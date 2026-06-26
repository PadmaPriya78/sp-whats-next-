import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const BRANDS = [
    { slug: 'eastman', label: 'Eastman' },
    { slug: 'havells',  label: 'Havells'  },
    { slug: 'vguard',   label: 'V-Guard'  },
    { slug: 'racold',   label: 'Racold'   },
];

function Navbar() {
    const [scrolled,       setScrolled]       = useState(() => window.scrollY > 50);
    const [menuOpen,       setMenuOpen]       = useState(false);
    const [dropdownOpen,   setDropdownOpen]   = useState(false);
    const [mobileProdOpen, setMobileProdOpen] = useState(false);
    const [mobileEastmanOpen, setMobileEastmanOpen] = useState(false);
    const [mobileInverterOpen, setMobileInverterOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeAll = () => {
        setMenuOpen(false);
        setMobileProdOpen(false);
        setDropdownOpen(false);
        setMobileEastmanOpen(false);
        setMobileInverterOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="container navbar-inner">

                {/* Logo */}
                <Link to="/" className="logo" onClick={closeAll}>
                    <img src="/logo.png" alt="Dynamic Solar Logo" className="logo-img" />
                </Link>

                {/* Desktop Nav */}
                <ul className="nav-links">
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>

                    {/* Products hover dropdown — brands only */}
                    <li
                        className={`nav-dropdown${dropdownOpen ? ' nav-dropdown--open' : ''}`}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <NavLink to="/products">
                            Products
                            <svg
                                className="nav-dropdown-chevron"
                                width="12" height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </NavLink>

                        <div className="nav-dropdown-menu" role="menu">
                            {BRANDS.map(({ slug, label }) => {
                                if (slug === 'eastman') {
                                    return (
                                        <div key={slug} className="nav-dropdown-item-wrap nav-dropdown-item-wrap--has-submenu">
                                            <Link
                                                to="/products/eastman"
                                                className="nav-dropdown-item nav-dropdown-item--has-submenu"
                                                onClick={closeAll}
                                            >
                                                <span>{label}</span>
                                                <svg
                                                    className="nav-subdropdown-chevron"
                                                    width="10" height="10"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Link>
                                            
                                            <div className="nav-subdropdown-menu" role="menu">
                                                <div className="nav-subdropdown-item-wrap nav-subdropdown-item-wrap--has-submenu">
                                                    <Link
                                                        to="/products/eastman#section-grid-tie"
                                                        className="nav-subdropdown-item nav-subdropdown-item--has-submenu"
                                                        onClick={closeAll}
                                                    >
                                                        <span>Solar Inverter</span>
                                                        <svg
                                                            className="nav-subdropdown-chevron"
                                                            width="10" height="10"
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </Link>
                                                    <div className="nav-subsubdropdown-menu" role="menu">
                                                        <Link to="/products/eastman#section-grid-tie" className="nav-subsubdropdown-item" onClick={closeAll}>Solar Grid Tie Inverter</Link>
                                                        <Link to="/products/eastman#section-hybrid-lv" className="nav-subsubdropdown-item" onClick={closeAll}>Solar Hybrid Inverter IP65 - Low Voltage</Link>
                                                        <Link to="/products/eastman#section-hybrid-hv" className="nav-subsubdropdown-item" onClick={closeAll}>Solar Hybrid Inverter IP65 - High Voltage</Link>
                                                        <Link to="/products/eastman#section-off-grid" className="nav-subsubdropdown-item" onClick={closeAll}>Solar Off-Grid Inverter</Link>
                                                    </div>
                                                </div>
                                                <Link to="/products/eastman#section-lithium" className="nav-subdropdown-item" onClick={closeAll}>Solar Lithium Battery</Link>
                                                <Link to="/products/eastman#section-tubular" className="nav-subdropdown-item" onClick={closeAll}>Solar Conventional Tubular Battery</Link>
                                                <Link to="/products/eastman#section-panels" className="nav-subdropdown-item" onClick={closeAll}>Solar Panels</Link>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={slug}
                                        to={`/products/${slug}`}
                                        className="nav-dropdown-item"
                                        role="menuitem"
                                        onClick={closeAll}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    </li>

                    <li><NavLink to="/solar-calculator">Solar Calculator</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>

                {/* CTA */}
                <Link to="/contact" className="nav-cta" onClick={closeAll}>
                    Get a Quote
                </Link>

                {/* Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                <ul>
                    <li><NavLink to="/" end onClick={closeAll}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={closeAll}>About Us</NavLink></li>

                    <li className="mobile-products-item">
                        <button
                            className="mobile-products-toggle"
                            onClick={() => setMobileProdOpen((o) => !o)}
                            aria-expanded={mobileProdOpen}
                        >
                            <span>Products</span>
                            <svg
                                className={`mobile-chevron${mobileProdOpen ? ' rotated' : ''}`}
                                width="14" height="14"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        {mobileProdOpen && (
                            <ul className="mobile-sub-menu">
                                <li>
                                    <NavLink to="/products" onClick={closeAll}>All Brands</NavLink>
                                </li>
                                {BRANDS.map(({ slug, label }) => {
                                    if (slug === 'eastman') {
                                        return (
                                            <li key={slug} className="mobile-brand-item">
                                                <div className="mobile-brand-header">
                                                    <Link
                                                        to="/products/eastman"
                                                        className="mobile-sub-item mobile-sub-item--brand"
                                                        onClick={closeAll}
                                                    >
                                                        {label}
                                                    </Link>
                                                    <button
                                                        className="mobile-sub-toggle"
                                                        onClick={() => setMobileEastmanOpen((o) => !o)}
                                                        aria-expanded={mobileEastmanOpen}
                                                    >
                                                        <svg
                                                            className={`mobile-chevron${mobileEastmanOpen ? ' rotated' : ''}`}
                                                            width="12" height="12"
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>
                                                </div>

                                                {mobileEastmanOpen && (
                                                    <ul className="mobile-categories-menu">
                                                        <li className="mobile-category-item">
                                                            <div className="mobile-category-header">
                                                                <Link
                                                                    to="/products/eastman#section-grid-tie"
                                                                    className="mobile-cat-link"
                                                                    onClick={closeAll}
                                                                >
                                                                    Solar Inverter
                                                                </Link>
                                                                <button
                                                                    className="mobile-sub-toggle"
                                                                    onClick={() => setMobileInverterOpen((o) => !o)}
                                                                    aria-expanded={mobileInverterOpen}
                                                                >
                                                                    <svg
                                                                        className={`mobile-chevron${mobileInverterOpen ? ' rotated' : ''}`}
                                                                        width="12" height="12"
                                                                        viewBox="0 0 12 12"
                                                                        fill="none"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                            {mobileInverterOpen && (
                                                                <ul className="mobile-inverters-menu">
                                                                    <li>
                                                                        <Link to="/products/eastman#section-grid-tie" className="mobile-inverter-link" onClick={closeAll}>
                                                                            Solar Grid Tie Inverter
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="/products/eastman#section-hybrid-lv" className="mobile-inverter-link" onClick={closeAll}>
                                                                            Solar Hybrid Inverter Low Voltage
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="/products/eastman#section-hybrid-hv" className="mobile-inverter-link" onClick={closeAll}>
                                                                            Solar Hybrid Inverter High Voltage
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="/products/eastman#section-off-grid" className="mobile-inverter-link" onClick={closeAll}>
                                                                            Solar Off-Grid Inverter
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        </li>
                                                        <li>
                                                            <Link to="/products/eastman#section-lithium" className="mobile-cat-link" onClick={closeAll}>
                                                                Solar Lithium Battery
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/products/eastman#section-tubular" className="mobile-cat-link" onClick={closeAll}>
                                                                Solar Conventional Tubular Battery
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/products/eastman#section-panels" className="mobile-cat-link" onClick={closeAll}>
                                                                Solar Panels
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    }
                                    return (
                                        <li key={slug}>
                                            <Link
                                                to={`/products/${slug}`}
                                                className="mobile-sub-item"
                                                onClick={closeAll}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </li>

                    <li><NavLink to="/solar-calculator" onClick={closeAll}>Solar Calculator</NavLink></li>
                    <li><NavLink to="/blog" onClick={closeAll}>Blog</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeAll}>Contact</NavLink></li>
                    <li>
                        <Link to="/contact" className="mobile-cta" onClick={closeAll}>
                            Get a Quote
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
