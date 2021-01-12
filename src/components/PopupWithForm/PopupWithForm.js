import React, { useEffect } from 'react';

export default function PopupWithForm(props) {
  //form fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');\

  //form validation
  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const formRef = React.useRef();
  const [formInvalid, setFormInvalid] = React.useState(true)

  //state
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
      case 'success':
        setContent(success);
        break;
    }
  },[props.type])
  
  //reset fields when opened
  React.useEffect(()=>{
    setFormInvalid(true);
    setEmail('');
    setPassword('');
    setUsername('');
  },[props.isOpen])

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

  function handleLogin(e){
        //check if the form is valid before sending
        if(!formInvalid){
          e.preventDefault();     
          props.onLogin();
        }
  }

  function handleSignup(e){
    //check if the form is valid before sending
    if(!formInvalid){
      e.preventDefault();     
      props.onSignup();
    }
}

function validateForm(){
  props.formValidator(formRef.current,'.popup__input') ? setFormInvalid(true) : setFormInvalid(false);
}

  const signIn =
    (<div className="popup__container">
    <form className="popup__form">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h4 className="popup__title">Sign in</h4>
      <p className="popup__input-label">Email</p>
      <input className="popup__input" type="popup" name="email" required minLength="2" maxLength="40" value={email} onChange={handleEmail} placeholder="Enter email"></input>
      <span className={`popup__input-error" id="email-input-error ${emailError !=='' && 'popup__error_visible'}`}>{emailError}</span>
      <p className="popup__input-label">Password</p>  
      <input className="popup__input" type="popup" name="password" required minLength="2" maxLength="12" value={password} onChange={handlePassword} placeholder="Enter password"></input>  
      <span className={`popup__input-error" id="password-input-error ${passwordError !=='' && 'popup__error_visible'}`}>{passwordError}</span>
      <button className={`popup__submit ${formInvalid && 'popup__submit_disabled'}`} disabled={formInvalid} type="button" onClick={handleLogin}>Sign in</button>
      <p className="popup__link-text">or <button className="popup__link" type="button"  onClick={props.onOpen}>Sign up</button></p>
    </form>
    </div>
    );

  const signUp =
    (<div className="popup__container">
    <form className="popup__form">
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
      
      <button className={`popup__submit ${formInvalid && 'popup__submit_disabled'}`} disabled={formInvalid} type="button" onClick={handleSignup}>Sign up</button>
      <p className="popup__link-text">or <button className="popup__link" type="button" onClick={props.onOpen}>Sign in</button></p>
    </form>
    </div>
    );

  const success =
  (<div className="popup__container popup_success">
  <form className="popup__form">
    <button className="popup__close" type="button" onClick={props.onClose}></button>
    <h4 className="popup__title">Registration successfully completed!</h4>
    <p className="popup__link-text popup_success"><button className="popup__link" type="button" onClick={props.onOpen}>Sign in</button></p>
  </form>
  </div>
  );

  return (
    <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
      {content}
    </section>  
  )
}