import React from 'react';

export default function PopupWithForm(props) {
  //form fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  //form validation
  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [signInFormInvalid, setSignInFormInvalid] = React.useState(true);
  const [signUpFormInvalid, setSignUpFormInvalid] = React.useState(true);

  //reset fields when opened
  React.useEffect(()=>{
    setSignInFormInvalid(true);
    setSignUpFormInvalid(true);
    setEmail('');
    setPassword('');
    setUsername('');
  },[props.isOpen])

  //field form functions
  function handleEmail(e) {
    //set value
    setEmail(e.target.value);
    //set error
    props.fieldValidator(e.target, setEmailError);
  }
  
  function handlePassword(e) {
    //set value
    setPassword(e.target.value);
    //set error
    props.fieldValidator(e.target, setPasswordError);
  }

  function handleUsername(e) {
    //set value
    setUsername(()=>{return e.target.value.replace(" ","_")});
    //set error
    props.fieldValidator(e.target, setUsernameError);
  }

  function handleSignIn(e){
    e.preventDefault();     
    //check if the form is valid before sending
    if(!signInFormInvalid){
      props.onSignIn(email, password);
    }
  }

  function handleSignUp(e){
    e.preventDefault();     
    //check if the form is valid before sending
    if(!signUpFormInvalid){
      props.onSignUp(username, email, password);
    }
}

const signInRef = React.useRef();
const signUpRef = React.useRef();

function validateSignInForm(){
  props.formValidator(signInRef.current,'.popup__input') ? setSignInFormInvalid(true) : setSignInFormInvalid(false);
}

function validateSignUpForm(){
  props.formValidator(signUpRef.current,'.popup__input') ? setSignUpFormInvalid(true) : setSignUpFormInvalid(false);
}

  const signIn =
  (<div className="popup__container">
    <form className="popup__form" onChange={validateSignInForm} onSubmit={handleSignIn} ref={signInRef}>
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h4 className="popup__title">Sign in</h4>
      <p className="popup__input-label">Email</p>
      <input className="popup__input" id="email-input" type="text" name="email" required minLength="2" maxLength="40" placeholder="Enter email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" required value={email} onChange={handleEmail} />
      <span className={`popup__input-error" ${emailError !=='' && 'popup__error_visible'}`} id="email-input-error">{emailError}</span>
      <p className="popup__input-label">Password</p>  
      <input className="popup__input" id="password-input" type="password" name="password" required minLength="2" maxLength="12" placeholder="Enter password" required value={password} onChange={handlePassword} /> 
      <span className={`popup__input-error" ${passwordError !=='' && 'popup__error_visible'}`} id="password-input-error">{passwordError}</span>
      <button className={`popup__submit ${signInFormInvalid && 'popup__submit_disabled'}`} disabled={signInFormInvalid} type="submit">{props.isLoading ? "Loading..." : "Sign in"}</button>
      <p className="popup__link-text">or <button className="popup__link" type="button"  onClick={props.onOpen}>Sign up</button></p>
    </form>
    </div>
    );

  const signUp =
    (<div className="popup__container">
    <form className="popup__form" onChange={validateSignUpForm} onSubmit={handleSignUp} ref={signUpRef}>
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h4 className="popup__title">Sign up</h4>
      <p className="popup__input-label">Email</p>
      <input className="popup__input" type="text" name="email" required minLength="2" maxLength="40" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" required value={email} onChange={handleEmail} placeholder="Enter email"></input>
      <span className={`popup__input-error ${emailError !=='' && 'popup__error_visible'}`} id="email-input-error">{emailError}</span>
      <p className="popup__input-label">Password</p>  
      <input className="popup__input" type="password" name="password" required minLength="7" maxLength="12" pattern="[\w\d\S]{7,12}" required value={password} onChange={handlePassword} placeholder="Enter password"></input>  
      <span className={`popup__input-error ${passwordError !=='' && 'popup__error_visible'}`} id="password-input-error" >{passwordError}</span>
      <p className="popup__input-label">Username</p>  
      <input className="popup__input" type="text" name="username" required minLength="2" maxLength="12" pattern="[\w\d\S]{1,12}" required value={username} onChange={handleUsername} placeholder="Enter your username"></input>  
      <span className={`popup__input-error ${usernameError !=='' && 'popup__error_visible'}`} id="username-input-error">{usernameError}</span>     
      <button className={`popup__submit ${signUpFormInvalid && 'popup__submit_disabled'}`} disabled={signUpFormInvalid} type="submit">Sign up</button>
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

  if (props.type === 'signIn'){
    return (
      <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
        {signIn}
      </section>  
    )
  }
    else if (props.type === 'signUp'){
      return (
      <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
        {signUp}
      </section>  
    )}

    else if (props.type === 'success'){
      return (
        <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
        {success}
      </section>  
    )}

    else {
      return (
      <section className={`popup ${props.isOpen  && 'popup_state_opened'}` } >
      </section>
    )}

}