import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import About from '../About/About';
import Footer from '../Footer/Footer';

import Navigation from '../Navigation/Navigation';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import {formValidator} from '../../utils/formvalidator';


export default function App() {

  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [isSignedIn, setisSignedIn] = React.useState(false);
  const [isNavOpen, setisNavOpen] = React.useState(false);

  function closeAllPopups(){
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsSuccessOpen(false);
    setisNavOpen(false);
  }

  function handleOpenSignIn(){
    closeAllPopups();
    setIsSignInOpen(true);
  }

  function handleOpenSignUp(){
    closeAllPopups();
    setIsSignUpOpen(true);
  }

  function handleSignIn(){
    setisSignedIn(true);
    closeAllPopups();
  }

  function handleSignUp(){
    closeAllPopups();
    handleOpenSuccess();
  }

  function handleOpenSuccess(){
    closeAllPopups();
    setIsSuccessOpen(true);
  }

  function handleSignOut(){
    setisSignedIn(false);
  }

  function handleNav(){
    setisNavOpen(!isNavOpen);
  }

  return (
    <>
    <PopupWithForm 
      isOpen={isSignInOpen} 
      onOpen={handleOpenSignUp}
      onClose={closeAllPopups} 
      onSignIn={handleSignIn} 
      fieldValidator={formValidator.fieldValidator}
      formValidator={formValidator.formValidator}

      type={'signIn'}
    />

    <PopupWithForm 
      isOpen={isSignUpOpen} 
      onOpen={handleOpenSignIn}
      onClose={closeAllPopups} 
      onSignUp={handleSignUp} 
      fieldValidator={formValidator.fieldValidator}
      formValidator={formValidator.formValidator}
      type={'signUp'}
    />  

    <PopupWithForm 
      isOpen={isSuccessOpen} 
      onOpen={handleOpenSignIn}
      onClose={closeAllPopups} 
      type={'success'}
    /> 

    <div className="App">
        <Switch>
          <Route exact path="/">
          <div className="App__main-bg">
            <Header 
            onSignin={handleSignIn} 
            onOpen={handleOpenSignIn} onSignOut={handleSignOut} signedIn={isSignedIn} onOpenNav={handleNav}/>
            <Navigation signedIn={isSignedIn}  onOpen={handleOpenSignIn} isOpen={isNavOpen}  onOpenNav={handleNav} onSignIn={handleSignIn}/>
            {/* <Main isSignedIn={isSignedIn}/> */}
          </div>
          </Route>

          <Route exact path="/saved-news">
          {!isSignedIn ? <Redirect to="/" /> : 
            (<div className="App__saved-news">
              <Header
              onSignin={handleSignIn} 
              onOpen={handleOpenSignIn} onSignOut={handleSignOut} signedIn={isSignedIn} onOpenNav={handleNav}/>
              <Navigation signedIn={isSignedIn} onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onSignIn={handleSignIn}/>
              <SavedNews isSignedIn={isSignedIn}/>
            </div>)}
          </Route>

        </Switch>
      {/* <About/> */}
      {/* <Footer/> */}
    </div>
    </>
  );
}