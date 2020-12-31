import React from 'react';
//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import About from '../About/About';
import Footer from '../Footer/Footer';

export default function App() {
  return (
    <div className="App">
      <div className="App__main-bg">
        <Header></Header>
        <Main></Main>
      </div>
      <SavedNews></SavedNews>
      <About></About>
      <Footer></Footer>
    </div>
  );
}