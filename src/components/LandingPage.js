import React from 'react';
import '../styles/LandingPage.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <h1>Welcome to NeuroVista</h1>
      <p>AI-Powered Health Diagnostic Assistant</p>
      <ul>
        <li>Advanced AI analysis of patient data</li>
        <li>Support for healthcare professionals</li>
      </ul>
      <button onClick={onGetStarted}>Get Started</button>
    </div>
  );
}

export default LandingPage;
