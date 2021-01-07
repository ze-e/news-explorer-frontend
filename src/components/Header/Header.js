import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <>
    <nav className="header">
      <Link className="header__title-link" to="/"><h1 className="header__title">NewsExplorer</h1></Link>
      <ul className="header__links">
      <li className="header__item"><Link className="header__link" to="/">Home</Link></li>
      <li className={`header__item header__link_selected ${!props.loggedIn && 'header__link_hidden'}`}><Link className="header__link" to="/saved-news">Saved Article</Link></li>
        <li className={`header__item header__link_button ${props.loggedIn &&'header__link_hidden'}`}>
          <button className="header__button" type="button" onClick={props.onOpen}>Sign in</button>
        </li>
        <li className={`header__item header__link_button ${!props.loggedIn && 'header__link_hidden'}`}>
          <button className="header__button">myName<div className="header__button-icon"></div></button>
        </li>
        <li className="header__item">
          <button className="header__collapse-button"></button>
        </li>
      </ul>
    </nav>
    </>
  ) 
}