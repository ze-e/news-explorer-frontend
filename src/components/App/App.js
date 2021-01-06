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

  function handleOpen(){
    setisOpen(true);
  }

  function handleClose(){
    setisOpen(false);
  }

  return (
    <>
    <PopupWithForm isOpen={isOpen} onClose={handleClose} />
    <Navigation />
    <div className="App">
        <Switch>

          <Route exact path="/">
          <div className="App__main-bg">
            <Header onOpen={handleOpen}/>
            <Main/>
          </div>
          </Route>

          <Route exact path="/saved-news">
            <span className="App__saved-news">
              <Header/>
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