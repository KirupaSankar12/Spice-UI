import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SuccessPage.css'; // We will create new styles for this

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-page-container">
      <div className="success-card">
        
        {/* Animated SVG Checkmark */}
        <div className="checkmark-container">
          <svg className="checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1>Application Submitted!</h1>
        <p>Thank you for your interest. We have received your application and a representative will be in touch with you shortly.</p>
        <button onClick={() => navigate('/home')}>Return to Dashboard</button>
        
      </div>
    </div>
  );
}

export default SuccessPage;