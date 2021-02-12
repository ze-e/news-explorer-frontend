import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//util
import {formValidator} from '../../utils/formvalidator';
import { api } from '../../utils/api';
import { auth }  from '../../utils/auth';

//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

//context
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function App() {

  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [isSignedIn, setisSignedIn] = React.useState(false);
  const [isNavOpen, setisNavOpen] = React.useState(false);

  const [currentUser, setcurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  function handleSignUp(username, email, password){
    auth.register(username, email, password)
    .then((res) => {
      if(res){
        //registration succeeded
        handleSignIn(email, password);
        console.log(res);
      }
      else{
        //registration failed
        console.log("registration failed");
      }
    })
    closeAllPopups();
    handleOpenSuccess();
  }

  function handleSignIn(email, password){
    auth.login(email, password)
    .then((res) => {
      if(res){
        setisSignedIn(true);
      }
      else{
        console.log("login failed");
      }
    })
    closeAllPopups();
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
    <CurrentUserContext.Provider value={currentUser}>
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
            <Main isSignedIn={isSignedIn} cards={cards}/>
          </div>
          </Route>

          <Route exact path="/saved-news">
          {!isSignedIn ? <Redirect to="/" /> : 
            (<div className="App__saved-news">
              <Header
              onSignin={handleSignIn} 
              onOpen={handleOpenSignIn} onSignOut={handleSignOut} signedIn={isSignedIn} onOpenNav={handleNav}/>
              <Navigation signedIn={isSignedIn} onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onSignIn={handleSignIn}/>
              <SavedNews isSignedIn={isSignedIn} cards={cards}/>
            </div>)}
          </Route>

        </Switch>
      <About/>
      <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}