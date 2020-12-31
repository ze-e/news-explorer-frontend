import React from 'react';

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <ul className="footer__nav">
        <li className="footer__nav-item"><a className="footer__nav-link">Home</a></li>
        <li className="footer__nav-item"><a className="footer__nav-link">Practicum by Yandex</a></li>
        <li className="footer__nav-item"><button className="footer__nav-button footer__nav-button_facebook"></button></li>
        <li className="footer__nav-item"><button className="footer__nav-button footer__nav-button_github"></button></li>
      </ul>
    </section>
  );
}