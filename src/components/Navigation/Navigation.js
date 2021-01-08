import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation(props) {
  return (
    <>
    <section className={`nav ${props.isOpen && "nav_open"}`}>
    <nav className="nav__container">
      <div className="nav__top">
        <Link className="nav__title-link" to="/"><h1 className="nav__title">NewsExplorer</h1></Link>
        <button className="nav__button-icon"></button>
      </div>
      <ul className="nav__links">
        <li className="nav__link nav__link_selected"><Link to="/">Home</Link></li>
        <li className="nav__link nav__link_selected"><Link to="/saved-news">Saved Article</Link></li>
        <li className="nav__link nav__link_button">
          <button className="nav__button">Sign in</button>
        </li>
      </ul>
    </nav>
    </section>
    </>
  ) 
}