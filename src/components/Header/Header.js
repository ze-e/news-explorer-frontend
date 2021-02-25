import React from 'react';
import { NavLink } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function Header(props) {

  const User = React.useContext(CurrentUserContext);

  return (
    <>
    <nav className="header">
      <NavLink className="header__title-link" to="/main"><h1 className="header__title">NewsExplorer</h1></NavLink>
      <ul className="header__links">
      <li className="header__item"><NavLink className="header__link" exact to="/main" activeClassName="header__link_selected">Home</NavLink></li>
      <li className={`header__item ${!props.signedIn && 'header__link_hidden'}`}>
        <NavLink className="header__link" exact to="/saved-news" activeClassName="header__link_selected">Saved Articles</NavLink>
      </li>
        <li className={`header__item header__link_button ${props.signedIn && 'header__link_hidden'}`}>
          <button className="header__button" type="button" onClick={props.onOpen}>{props.loading ? "Loading..." : 'Sign In'}</button>

        </li>
        <li className={`header__item header__link_button ${!props.signedIn && 'header__link_hidden'}`}>
          <div className="header__button">{props.loading ? "Loading..." : User.name}<button className="header__button-icon" onClick={props.onSignOut}></button></div>
        </li>
      </ul>
      <button className="header__collapse-button" onClick={props.onOpenNav}></button>
    </nav>
    </>
  ) 
}