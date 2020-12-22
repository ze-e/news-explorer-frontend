import React from 'react';

export default function Header(props) {
  return (
    <>
    <nav className="header header__logged_in">
      <a className="header__title-link"><h1 className="header__title">NewsExplorer</h1></a>
      <ul className="header__links">
        <li className="header__link">Home</li>
        <li className="header__link header__link_selected header__logged_in">Saved Article</li>
        <li className="header__link header__link_button">
          <button className="header__button header__link_hidden">Sign in</button>
        </li>
        <li className="header__link header__link_button">
          <button className="header__button header__logged_in">myName<div className="header__button-icon"></div></button>
        </li>
        <li className="header__link">
          <button className="header__collapse-button"></button>
        </li>
      </ul>
    </nav>
    </>
  ) 
}