import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <img src="/logo.png" alt="לוגו" className="footer-logo" />
        <div className="footer-contact">
          <p>📞 050-1234567</p>
          <p>✉️ info@yoursite.co.il</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
