import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <img src="/logo.png" alt="לוגו" className="footer-logo" />

        <div className="footer-section">
          <h4>ניווט מהיר</h4>
          <ul>
            <li><a href="/">דף הבית</a></li>
            <li><a href="/">חנות</a></li>
            <li><a href="/">קטגוריות</a></li>
            <li><a href="/Contact">צור קשר</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>צור קשר</h4>
          <p>📞 050-1234567</p>
          <p>✉️ info@yoursite.co.il</p>
          <p>📍 ירושלים, הדוגמה 5</p>
        </div>

        <div className="footer-section">
          <h4>עקבו אחרינו</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="pi pi-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="pi pi-instagram"></i></a>
            <a href="https://wa.me/972501234567" target="_blank" rel="noreferrer"><i className="pi pi-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <Divider />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} כל הזכויות שמורות | YourSite</p>
      </div>
    </footer>
  );
};

export default Footer;
