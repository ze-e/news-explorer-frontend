import React, { useEffect } from 'react';

export default function PopupWithForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [content, setContent] = React.useState('');

  //set form content
  React.useEffect(()=>{
    switch(props.type){
      case 'signIn': 
        setContent(signIn);
        break;
      case 'signUp':
        setContent(signUp);
        break;
    }
  },[props.type])

  //field form functions
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

  function handleUsername(e) {
    //set value
    setUsername(e.target.value);
    //set error
    props.fieldValidator(e.target, setUsernameError)
  }

  const signIn =
    (<form className="popup__form">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h4 className="popup__title">Sign in</h4>
      <p className="popup__input-label">Email</p>
      <input className="popup__input" type="popup" name="email" required minLength="2" maxLength="40" value={email} onChange={handleEmail} placeholder="Enter email"></input>
      <span className={`popup__input-error" id="email-input-error ${emailError !=='' && 'popup__error_visible'}`}>{emailError}</span>
      <p className="popup__input-label">Password</p>  
      <input className="popup__input" type="popup" name="password" required minLength="2" maxLength="12" value={password} onChange={handlePassword} placeholder="Enter password"></input>  
      <span className={`popup__input-error" id="password-input-error ${passwordError !=='' && 'popup__error_visible'}`}>{passwordError}</span>
      <button className="popup__submit" type="button" onClick={props.onLogin}>Sign in</button>
      <p className="popup__link-text">or <button className="popup__link" type="button"  onClick={props.onOpen}>Sign up</button></p>
    </form>);

  const signUp =
    (<form className="popup__form">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h4 className="popup__title">Sign up</h4>
      <p className="popup__input-label">Email</p>
      <input className="popup__input" type="popup" name="email" required minLength="2" maxLength="40" value={email} onChange={handleEmail} placeholder="Enter email"></input>
      <span className={`popup__input-error" id="email-input-error ${emailError !=='' && 'popup__error_visible'}`}>{emailError}</span>
      <p className="popup__input-label">Password</p>  
      <input className="popup__input" type="popup" name="password" required minLength="2" maxLength="12" value={password} onChange={handlePassword} placeholder="Enter password"></input>  
      <span className={`popup__input-error" id="password-input-error ${passwordError !=='' && 'popup__error_visible'}`}>{passwordError}</span>
      <p className="popup__input-label">Username</p>  
      <input className="popup__input" type="popup" name="username" required minLength="2" maxLength="12" value={username} onChange={handleUsername} placeholder="Enter your username"></input>  
      <span className={`popup__input-error" id="username-input-error ${usernameError !=='' && 'popup__error_visible'}`}>{usernameError}</span>
      
      <button className="popup__submit" type="button" onClick={props.onLogin}>Sign up</button>
      <p className="popup__link-text">or <button className="popup__link" type="button" onClick={props.onOpen}>Sign in</button></p>
    </form>);

  return (
    <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
      <div className="popup__container">
        {content}
      </div>
    </section>  
  )
}