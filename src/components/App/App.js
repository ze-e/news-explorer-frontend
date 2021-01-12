import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const [isNavOpen, setisNavOpen] = React.useState(false);

  function closeAllPopups(){
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
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

  function handleLogin(){
    setisLoggedIn(true);
    closeAllPopups();
    setisNavOpen(false);
  }

  function handleLogout(){
    setisLoggedIn(false);
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
      onLogin={handleLogin} 
      fieldValidator={formValidator.fieldValidator}
      type={'signIn'}
    />

    <PopupWithForm 
      isOpen={isSignUpOpen} 
      onOpen={handleOpenSignIn}
      onClose={closeAllPopups} 
      onLogin={handleLogin} 
      fieldValidator={formValidator.fieldValidator}
      type={'signUp'}
    />  

    <div className="App">
        <Switch>
          <Route exact path="/">
          <div className="App__main-bg">
            <Header onOpen={handleOpenSignIn} onLogout={closeAllPopups} loggedIn={isLoggedIn} onOpenNav={handleNav}/>
            <Navigation onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onLogin={handleLogin}/>
            <Main/>
          </div>
          </Route>

          <Route exact path="/saved-news">
            <span className="App__saved-news">
              <Header onOpen={handleOpenSignIn} onLogout={closeAllPopups} loggedIn={isLoggedIn} onOpenNav={handleNav}/>
              <Navigation onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onLogin={handleLogin}/>
              <SavedNews/>
            </span>
          </Route>

        </Switch>
      <About/>
      <Footer/>
    </div>
    </>
  );
}