import React from 'react';
import { Link ,NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <div className="footer__links">
        <ul className="footer__nav">
          <li className="footer__nav-item"><NavLink to="/" className="footer__nav-link">Home</NavLink></li>
          <li className="footer__nav-item"><Link to="https://practicum.yandex.com/" target="_blank" className="footer__nav-link">Practicum by Yandex</Link></li>
        </ul>
        <ul className="footer__social">
          <li className="footer__social-item"><Link to="https://github.com/ze-e/news-explorer-frontend" target="_blank" className="footer__social-button footer__social-button_github"></Link></li>
          <li className="footer__social-item"><Link to="https://www.facebook.com/" target="_blank" className="footer__social-button footer__social-button_facebook"></Link></li>
        </ul>
      </div>
    </section>
  );
}