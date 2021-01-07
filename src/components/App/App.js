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

export default function App() {

  const [isOpen, setisOpen] = React.useState(false);
  const [isLoggedIn, setisLoggedIn] = React.useState(false);


  function handleOpen(){
    setisOpen(true);
  }

  function handleClose(){
    setisOpen(false);
  }

  function handleLogin(){
    console.log("working");
    setisLoggedIn(true);
    handleClose();
  }

  return (
    <>
    <PopupWithForm isOpen={isOpen} onClose={handleClose} onLogin={handleLogin}/>
    <Navigation />
    <div className="App">
        <Switch>

          <Route exact path="/">
          <div className="App__main-bg">
            <Header onOpen={handleOpen} loggedIn={isLoggedIn}/>
            <Main/>
          </div>
          </Route>

          <Route exact path="/saved-news">
            <span className="App__saved-news">
              <Header onOpen={handleOpen} loggedIn={isLoggedIn}/>
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