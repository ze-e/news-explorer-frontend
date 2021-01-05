import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <div className="footer__links">
        <ul className="footer__nav">
          <li className="footer__nav-item"><Link to="/" className="footer__nav-link">Home</Link></li>
          <li className="footer__nav-item"><div className="footer__nav-link">Practicum by Yandex</div></li>
        </ul>
        <ul className="footer__social">
          <li className="footer__social-item"><button className="footer__social-button footer__social-button_github"></button></li>
          <li className="footer__social-item"><button className="footer__social-button footer__social-button_facebook"></button></li>
        </ul>
      </div>
    </section>
  );
}