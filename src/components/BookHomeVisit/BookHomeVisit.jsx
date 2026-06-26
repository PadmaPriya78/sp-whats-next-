import React, { useState } from 'react';
import './BookHomeVisit.css';
import solarConsultation from '../../assets/images/solar_consultation.png';

function BookHomeVisit() {
    const [billAmount, setBillAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here if needed
        alert('Form submitted successfully!');
    };

    return (
        <section className="bhv-section">
            <div className="bhv-container">
                <div className="bhv-header">
                    <h2>Book a Free Home Visit today!</h2>
                    <p>Schedule a FREE solar consultation at home!</p>
                </div>
                
                <div className="bhv-content">
                    {/* Left Side: Image */}
                    <div className="bhv-image-wrapper">
                        <img 
                            src={solarConsultation} 
                            alt="Solar Consultation" 
                            className="bhv-image"
                        />
                    </div>

                    {/* Right Side: Form */}
                    <div className="bhv-form-wrapper">
                        <form className="bhv-form" onSubmit={handleSubmit}>
                            <div className="bhv-input-group">
                                <label>Name *</label>
                                <input type="text" placeholder="Enter your name" required />
                            </div>

                            <div className="bhv-input-group">
                                <label>Mobile *</label>
                                <input type="tel" placeholder="Enter your mobile number" required />
                            </div>

                            <div className="bhv-input-group">
                                <label>Pin Code *</label>
                                <input type="text" placeholder="Enter your pin code" required />
                            </div>

                            <div className="bhv-input-group bhv-bill-group">
                                <label>What is your Bi-Monthly Electricity Bill? *</label>
                                <div className="bhv-radio-buttons">
                                    <button 
                                        type="button" 
                                        className={billAmount === 'less_2000' ? 'active' : ''}
                                        onClick={() => setBillAmount('less_2000')}
                                    >
                                        Less than 2000
                                    </button>
                                    <button 
                                        type="button" 
                                        className={billAmount === '2000_5000' ? 'active' : ''}
                                        onClick={() => setBillAmount('2000_5000')}
                                    >
                                        2000 to 5000
                                    </button>
                                    <button 
                                        type="button" 
                                        className={billAmount === 'above_5000' ? 'active' : ''}
                                        onClick={() => setBillAmount('above_5000')}
                                    >
                                        Above 5000
                                    </button>
                                </div>
                            </div>

                            <div className="bhv-checkbox-group">
                                <label>
                                    <input type="checkbox" required />
                                    <span>I agree to Dynamic Solar's terms of service & privacy policy *</span>
                                </label>
                            </div>

                            <button type="submit" className="bhv-submit-btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookHomeVisit;
