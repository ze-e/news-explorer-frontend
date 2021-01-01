import React from 'react';

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <div className="footer__links">
        <ul className="footer__nav">
          <li className="footer__nav-item"><a className="footer__nav-link">Home</a></li>
          <li className="footer__nav-item"><a className="footer__nav-link">Practicum by Yandex</a></li>
        </ul>
        <ul className="footer__social">
          <li className="footer__social-item"><button className="footer__social-button footer__social-button_facebook"></button></li>
          <li className="footer__social-item"><button className="footer__social-button footer__nav-button_github"></button></li>
        </ul>
      </div>
    </section>
  );
}