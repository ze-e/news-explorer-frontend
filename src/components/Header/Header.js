import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  return (
    <>
    <nav className="header">
      <NavLink className="header__title-link" to="/"><h1 className="header__title">NewsExplorer</h1></NavLink>
      <ul className="header__links">
      <li className="header__item"><NavLink className="header__link" exact to="/" activeClassName="header__link_selected">Home</NavLink></li>
      <li className={`header__item ${!props.signedIn && 'header__link_hidden'}`}>
        <NavLink className="header__link" exact to="/saved-news" activeClassName="header__link_selected">Saved Articles</NavLink>
      </li>
        <li className={`header__item header__link_button ${props.signedIn && 'header__link_hidden'}`}>
          <button className="header__button" type="button" onClick={props.onOpen}>Sign in</button>

        </li>
        <li className={`header__item header__link_button ${!props.signedIn && 'header__link_hidden'}`}>
          <div className="header__button">{props.currentUser.name}<button className="header__button-icon" onClick={props.onSignOut}></button></div>
        </li>
      </ul>
      <button className="header__collapse-button" onClick={props.onOpenNav}></button>
    </nav>
    </>
  ) 
}