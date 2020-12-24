import React from 'react';
//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

export default function App() {
  return (
    <div className="App">
      <div className="App__main-bg">
        <Header></Header>
        <Main></Main>
      </div>
      <SavedNews></SavedNews>
    </div>
  );
}