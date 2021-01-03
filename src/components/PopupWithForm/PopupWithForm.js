import React from 'react';

export default function PopupWithForm() {

  return (
    <section className={`popup_state_opened`} >
      <div className="popup__container">
        <form className={`popup__form`}>
          <button className={`popup__close`} type="button"></button>
          <label for="email">Email</label>
          <input type="popup__input-email" name="email"></input>
          <label for="password">Password</label>  
          <input type="popup__input-password"></input>  
          <h4 className="popup__title">Sign in</h4>
          <button className={`popup__submit`} type="submit">Save</button>
        </form>
        <p className="" >or<a>Sign Up</a></p>
      </div>
    </section>  
  )
}