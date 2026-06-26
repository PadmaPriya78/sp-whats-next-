import React from 'react';
import './SolarLoans.css';
import solarLoansEmi from '../../assets/images/solar_loans_emi_orange.png';
import { 
    SbiIcon, HdfcIcon, IciciIcon, AxisIcon, 
    PnbIcon, BobIcon, BoiIcon, CbiIcon, CalendarRupeeIcon 
} from './BankIcons';

function SolarLoans() {
    return (
        <section className="solar-loans-section">
            <div className="container">
                <div className="sl-header">
                    <h2 className="sl-title">Solar loans at your door step</h2>
                    <p className="sl-subtitle">Get interest rates as low as <span>6.75%*</span></p>
                    <button className="sl-get-quote">Get Quote</button>
                </div>

                <div className="sl-grid">
                    {/* Left Card */}
                    <div className="sl-left-card">
                        <div className="sl-left-content">
                            <h3>5-year EMI Plan</h3>
                            <p>Flexible payment options that fit your budget perfectly.</p>
                        </div>
                        <img 
                            src={solarLoansEmi} 
                            alt="5-year EMI Plan with Solar Installer" 
                            className="sl-left-image" 
                        />
                    </div>

                    {/* Right Column */}
                    <div className="sl-right-col">
                        {/* Top Card */}
                        <div className="sl-right-card sl-card-pay-later">
                            <div className="sl-card-icon-wrap">
                                <CalendarRupeeIcon />
                            </div>
                            <div className="sl-card-text">
                                <h3>
                                    Go Solar Pay Later
                                    <span className="sl-badge-new">NEW</span>
                                </h3>
                                <p>Pay in 6 easy installments with zero interest</p>
                            </div>
                        </div>

                        {/* Bottom Card */}
                        <div className="sl-right-card sl-card-banks">
                            <div className="sl-card-text">
                                <h3>EMI starting from just<br/>₹ 2,170/month</h3>
                                <p>Get instant long-term loans with nationalised banks up to 10 years.</p>
                            </div>
                            
                            <div className="sl-bank-logos">
                                <div className="sl-bank-logo"><SbiIcon /></div>
                                <div className="sl-bank-logo"><HdfcIcon /></div>
                                <div className="sl-bank-logo"><IciciIcon /></div>
                                <div className="sl-bank-logo"><AxisIcon /></div>
                                <div className="sl-bank-logo"><PnbIcon /></div>
                                <div className="sl-bank-logo"><BobIcon /></div>
                                <div className="sl-bank-logo"><BoiIcon /></div>
                                <div className="sl-bank-logo"><CbiIcon /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SolarLoans;
