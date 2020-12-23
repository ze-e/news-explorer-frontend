import React from 'react';
//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Main_LoggedIn from '../Main_LoggedIn/Main_LoggedIn';

export default function App() {
  return (
    <div className="App signedIn">
      <div className="App__main-bg">
        <Header></Header>
        <Main_LoggedIn></Main_LoggedIn>
      </div>
    </div>
  );
}