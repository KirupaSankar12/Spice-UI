import React from 'react';
import '../css/StaticPage.css';

function FAQPage() {
  return (
    <div className="static-page-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-item">
        <h4>How do I track my application status?</h4>
        <p>You can track the status of all your applications from your main Dashboard page.</p>
      </div>
      <div className="faq-item">
        <h4>What kind of training is provided?</h4>
        <p>We provide comprehensive online and in-person training covering our products, sales techniques, and business management to ensure your success.</p>
      </div>
    </div>
  );
}

export default FAQPage;