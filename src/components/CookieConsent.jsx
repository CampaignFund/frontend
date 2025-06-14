import { useEffect, useState } from 'react';
import '../css/CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-message">
        We use cookies to improve your experience. By using our site, you agree to our use of cookies.
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn accept" onClick={() => handleConsent('accepted')}>
          Accept All
        </button>
        <button className="cookie-btn reject" onClick={() => handleConsent('rejected')}>
          Reject Non-Essential
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;