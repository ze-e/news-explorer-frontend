import React from 'react';

export default function Header(props) {
  return (
    <nav className="header">
      <a className="header__title-link"><h1 className="header__title">NewsExplorer</h1></a>
      <ul className="header__links">
        <li className="header__link header__link_selected">Home</li>
        <li className="header__link header__link_hidden">Saved Article</li>
        <li className="header__link header__link_button">
          <button className="header__login-button">Sign in</button>
        </li>
        <li className="header__link header__link_hidden">
          <button className="header__profile-button">myName<span className="header__profile-button-icon">-</span></button>
        </li>
      </ul>
    </nav>
  ) 
}