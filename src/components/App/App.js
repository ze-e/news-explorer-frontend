import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import About from '../About/About';
import Footer from '../Footer/Footer';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Navigation from '../Navigation/Navigation';


export default function App() {
  return (
    <>
    <Navigation />
    <div className="App">
      <div className="App__main-bg">
        <Header/>
        <Switch>
          <Route path="/">
            <Main/>
          </Route>
          <Route path="/saved-news">
            <SavedNews/>
          </Route>
        </Switch>
      </div>
      <About/>
      <Footer/>
    </div>
    </>
  );
}