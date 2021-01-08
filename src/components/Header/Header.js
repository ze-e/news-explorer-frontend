import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  return (
    <>
    <nav className="header">
      <NavLink className="header__title-link" to="/"><h1 className="header__title">NewsExplorer</h1></NavLink>
      <ul className="header__links">
      <li className="header__item"><NavLink className="header__link" exact to="/" activeClassName="header__link_selected">Home</NavLink></li>
      <li className={`header__item ${!props.loggedIn && 'header__link_hidden'}`}>
        <NavLink className="header__link" exact to="/saved-news" activeClassName="header__link_selected">Saved Article</NavLink>
      </li>
        <li className={`header__item header__link_button ${props.loggedIn && 'header__link_hidden'}`}>
          <button className="header__button" type="button" onClick={props.onOpen}>Sign in</button>
        </li>
        <li className={`header__item header__link_button ${!props.loggedIn && 'header__link_hidden'}`}>
          <div className="header__button">myName<button className="header__button-icon" onClick={props.onLogout}></button></div>
        </li>
        <li className="header__item">
          <button className="header__collapse-button"></button>
        </li>
      </ul>
    </nav>
    </>
  ) 
}