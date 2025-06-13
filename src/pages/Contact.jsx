import '../css/Contact.css';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const Contact=()=> {
  return (
    <section className="contact-section">
      <Link to="/" className="home-icon"><FiHome /></Link>
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-text">
          We'd love to hear from you! Reach out via phone, email, or visit us at our office.
        </p>

        <div className="contact-info">
          <div className="info-card">
            <FiPhone className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="info-card">
            <FiMail className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>support@fundraisetogether.com</p>
            </div>
          </div>

          <div className="info-card">
            <FiMapPin className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>123 Charity Lane, Kindness City, CA 94016</p>
            </div>
          </div>
        </div>
      </div>
    </section>
)}

export default Contact;