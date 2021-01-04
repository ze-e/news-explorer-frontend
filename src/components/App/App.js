import React from 'react';
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
        <Main/>
      </div>
      <SavedNews/>
      <About/>
      <Footer/>
    </div>
    </>
  );
}