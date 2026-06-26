import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Contact.css";

const contactInfo = [
    {
        Icon: MapPin,
        label: "Our Office",
        value: "Gandhi Rd, Tambaram West,\nTambaram, Chennai – 600045",
        link: null,
    },
    {
        Icon: Phone,
        label: "Call Us",
        value: "+91 98765 43210",
        link: "tel:+919876543210",
    },
    {
        Icon: Mail,
        label: "Email Us",
        value: "info@dynamicsolar.in",
        link: "mailto:info@dynamicsolar.in",
    },
    {
        Icon: Clock,
        label: "Working Hours",
        value: "Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed",
        link: null,
    },
];

const services = [
    "Solar Power Plant",
    "Solar Water Heater",
    "Solar Water Pumping",
    "Solar Street Lights",
    "Solar Home UPS",
    "Inverter & Battery",
    "Online UPS",
    "RO Systems",
    "General Inquiry",
];

function AnimSection({ children, className = "" }) {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }
            }),
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={className}>{children}</div>;
}

function Contact() {
    const [heroRef, heroInView] = useInView();
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "", message: "", budget: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
        if (!form.phone.trim() || !/^\+?[\d\s\-()]{8,15}$/.test(form.phone)) e.phone = "Valid phone number required";
        if (!form.service) e.service = "Please select a service";
        if (!form.message.trim() || form.message.length < 20) e.message = "Message must be at least 20 characters";
        return e;
    };

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSubmitted(true);
    };

    return (
        <>
            <Navbar />

            {/* Page Hero */}
            <div ref={heroRef} className={`page-hero contact-hero ${heroInView ? 'animate-typing' : ''}`}>
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Get In Touch</span>
                    <h1 className="page-hero-title">Contact Dynamic Solar</h1>
                    <p className="page-hero-sub">
                        Ready to go solar? Our experts are here to help you every step of the way.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>Contact</span>
                    </nav>
                </div>
            </div>

            {/* ── Contact Grid ── */}
            <section className="contact-section">
                <div className="container contact-grid">

                    {/* Info Panel */}
                    <AnimSection className="contact-info-panel">
                        <div className="fade-in-up">
                            <span className="section-tag">Reach Us</span>
                            <h2 className="contact-info-heading">
                                Let's Build Your <span>Solar Future</span> Together
                            </h2>
                            <p className="contact-info-body">
                                Whether you're exploring solar for the first time or looking to expand
                                an existing system, our certified solar consultants are ready to assist
                                with a free assessment and personalised quote.
                            </p>
                        </div>

                        <div className="contact-cards">
                            {contactInfo.map((c, i) => (
                                <div className={`contact-card fade-in-up delay-${i + 1}`} key={i}>
                                    <div className="contact-card-icon"><c.Icon size={20} strokeWidth={1.8} /></div>
                                    <div>
                                        <div className="contact-card-label">{c.label}</div>
                                        {c.link ? (
                                            <a href={c.link} className="contact-card-value contact-card-link">
                                                {c.value}
                                            </a>
                                        ) : (
                                            <p className="contact-card-value">
                                                {c.value.split("\n").map((line, j) => (
                                                    <span key={j}>{line}{j < c.value.split("\n").length - 1 && <br />}</span>
                                                ))}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="contact-social fade-in-up delay-5">
                            <span className="contact-social-label">Follow Us</span>
                            {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((s) => (
                                <a key={s} href="#" className="contact-social-btn" aria-label={s} target="_blank" rel="noopener noreferrer">
                                    {s[0]}
                                </a>
                            ))}
                        </div>
                    </AnimSection>

                    {/* Form Panel */}
                    <AnimSection className="contact-form-panel">
                        {submitted ? (
                            <div className="contact-success fade-in-up">
                                <div className="success-icon">✅</div>
                                <h3>Thank You!</h3>
                                <p>
                                    Your inquiry has been received. A Dynamic Solar consultant will
                                    contact you within 24 hours to schedule your free site assessment.
                                </p>
                                <button
                                    className="btn-primary"
                                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "", budget: "" }); }}
                                >
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form fade-in-up delay-1" onSubmit={handleSubmit} noValidate>
                                <div className="form-header">
                                    <h3 className="form-title">Request a Free Quote</h3>
                                    <p className="form-subtitle">
                                        Fill in the details below and we'll get back to you within 24 hours.
                                    </p>
                                </div>

                                <div className="form-row">
                                    <div className={`form-group ${errors.name ? "form-group--error" : ""}`}>
                                        <label htmlFor="contact-name">Full Name *</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Rajesh Kumar"
                                            value={form.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />
                                        {errors.name && <span className="form-error">{errors.name}</span>}
                                    </div>
                                    <div className={`form-group ${errors.email ? "form-group--error" : ""}`}>
                                        <label htmlFor="contact-email">Email Address *</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                        {errors.email && <span className="form-error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className={`form-group ${errors.phone ? "form-group--error" : ""}`}>
                                        <label htmlFor="contact-phone">Phone Number *</label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="+91 98765 43210"
                                            value={form.phone}
                                            onChange={handleChange}
                                            autoComplete="tel"
                                        />
                                        {errors.phone && <span className="form-error">{errors.phone}</span>}
                                    </div>
                                    <div className={`form-group ${errors.service ? "form-group--error" : ""}`}>
                                        <label htmlFor="contact-service">Service Required *</label>
                                        <select
                                            id="contact-service"
                                            name="service"
                                            value={form.service}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a service…</option>
                                            {services.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        {errors.service && <span className="form-error">{errors.service}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-budget">Approximate Budget (Optional)</label>
                                    <select
                                        id="contact-budget"
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a budget range…</option>
                                        <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                                        <option value="₹1 – ₹3 Lakhs">₹1 – ₹3 Lakhs</option>
                                        <option value="₹3 – ₹10 Lakhs">₹3 – ₹10 Lakhs</option>
                                        <option value="₹10 – ₹50 Lakhs">₹10 – ₹50 Lakhs</option>
                                        <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                                    </select>
                                </div>

                                <div className={`form-group ${errors.message ? "form-group--error" : ""}`}>
                                    <label htmlFor="contact-message">Your Message *</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us about your property, electricity consumption, or any specific requirements…"
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <span className="form-error">{errors.message}</span>}
                                </div>

                                <button type="submit" className="btn-primary form-submit">
                                    Send Inquiry ↗
                                </button>

                                <p className="form-note">
                                    🔒 Your information is secure and will never be shared with third parties.
                                </p>
                            </form>
                        )}
                    </AnimSection>

                </div>
            </section>

            {/* Map Placeholder */}
            <div className="contact-map-placeholder">
                <div className="map-overlay-text">
                    <span>📍</span>
                    <strong>Gandhi Rd, Tambaram West, Chennai</strong>
                    <a
                        href="https://wa.me/+917550399820"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-directions-btn"
                    >
                        Get Directions →
                    </a>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Contact;
