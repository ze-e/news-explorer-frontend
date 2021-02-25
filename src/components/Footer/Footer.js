import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      
      <div className="footer__links">     
        <ul className="footer__nav">
          <li className="footer__nav-item"><NavLink to="/main" className="footer__nav-link">Home</NavLink></li>
          <li className="footer__nav-item"><a href="https://practicum.yandex.com/" target="_blank" rel="noreferrer" className="footer__nav-link">Practicum by Yandex</a></li>
        </ul>
        
        <ul className="footer__social">
          <li className="footer__social-item"><a href="https://github.com/ze-e/news-explorer-frontend" target="_blank" rel="noreferrer"><div className="footer__social-button footer__social-button_github"></div></a></li>
          <li className="footer__social-item"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><div className="footer__social-button footer__social-button_facebook"></div></a></li>
        </ul> 
      </div>

    </section>
  );
}