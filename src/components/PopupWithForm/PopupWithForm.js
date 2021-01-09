import React from 'react';

export default function PopupWithForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  function handleEmail(e) {
    //set value
    setEmail(e.target.value);
    //set error
    props.fieldValidator(e.target, setEmailError)
  }
  
  function handlePassword(e) {
    //set value
    setPassword(e.target.value);
    //set error
    props.fieldValidator(e.target, setPasswordError)
  }

  return (
    <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
      <div className="popup__container">
        <form className="popup__form">
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <h4 className="popup__title">Sign in</h4>
          <p className="popup__input-label">Email</p>
          <input className="popup__input" type="popup" name="email" required minLength="2" maxLength="40" value={email} onChange={handleEmail} placeholder="Enter email"></input>
          <span className={`popup__input-error" id="email-input-error ${emailError !=='' && 'popup__error_visible'}`}>{emailError}</span>
          <p className="popup__input-label">Password</p>  
          <input className="popup__input" type="popup" name="password" required minLength="2" maxLength="12" value={password} onChange={handlePassword} placeholder="Enter password"></input>  
          <span className={`popup__input-error" id="password-input-error ${passwordError !=='' && 'popup__error_visible'}`}>{passwordError}</span>
          <button className="popup__submit" type="button" onClick={props.onLogin}>Save</button>
          <p className="popup__link-text">or <a className="popup__link" href="#">Sign up</a></p>
        </form>
      </div>
    </section>  
  )
}