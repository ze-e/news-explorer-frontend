import React from 'react';

export default function PopupWithForm(props) {

  return (
    <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
      <div className="popup__container">
        <form className="popup__form">
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <h4 className="popup__title">Sign in</h4>
          <p className="popup__input-label">Email</p>
          <input className="popup__input" type="popup" name="email" placeholder="Email"></input>
          <p className="popup__input-label">Password</p>  
          <input className="popup__input" type="popup" name="password" placeholder="Password"></input>  
          <button className="popup__submit popup__submit_disabled" type="button" onClick={props.handleLogin}>Save</button>
          <p className="popup__link-text">or <a className="popup__link" href="#">Sign up</a></p>
        </form>
      </div>
    </section>  
  )
}