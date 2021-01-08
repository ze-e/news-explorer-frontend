import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation(props) {
  return (
    <>
    <section className={`nav ${props.isOpen && "nav_open"}`}>
    <nav className="nav__container">
      <div className="nav__top">
        <NavLink className="nav__title-link" to="/"><h1 className="nav__title">NewsExplorer</h1></NavLink>
        <button className="nav__button-icon" onClick={props.onOpenNav}></button>
      </div>
      <ul className="nav__links">
        <li className="nav__item nav__link_selected"><NavLink className="nav__link" to="/">Home</NavLink></li>
        <li className="nav__item nav__link_selected"><NavLink className="nav__link" to="/saved-news">Saved Article</NavLink></li>
        <li className="nav__item nav__link_button">
          <button className="nav__button" onClick={props.onLogin}>Sign in</button>
        </li>
      </ul>
    </nav>
    </section>
    </>
  ) 
}