import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Zaroorat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
