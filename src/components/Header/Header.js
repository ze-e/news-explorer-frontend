import React from 'react';

export default function Header(props) {
  return (
    <nav className="header">
      <h1 className="header__title"><a className="header__title-link">NewsExplorer</a></h1>
      <ul className="header__links">
        <li className="header__link header__link_selected">Home</li>
        <li className="header__link header__link_hidden">Saved Article</li>
        <li className="header__link">
          <button className="header__login-button">Sign in</button>
        </li>
        <li className="header__link header__link_hidden">
          <button className="header__profile-button">myName<span className="header__profile-button-icon">-</span></button>
        </li>
      </ul>
    </nav>
  ) 
}