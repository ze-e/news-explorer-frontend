import React from 'react';

export default function Navigation(props) {
  return (
    <>
    <section className="nav">
    <nav className="nav__container">
      <div className="nav__top">
        <a className="nav__title-link"><h1 className="nav__title">NewsExplorer</h1></a>
        <button className="nav__button-icon"></button>
      </div>
      <ul className="nav__links">
        <li className="nav__link nav__link_selected">Home</li>
        <li className="nav__link nav__link_selected">Saved Article</li>
        <li className="nav__link nav__link_button">
          <button className="nav__button">Sign in</button>
        </li>
      </ul>
    </nav>
    </section>
    </>
  ) 
}