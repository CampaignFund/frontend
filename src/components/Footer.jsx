import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <p>
          Follow us on{' '}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{' '}
          and{' '}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
