import React from 'react';
import { Route, Switch } from 'react-router-dom';

//util
import {formValidator} from '../../utils/formvalidator';
import { mainApi } from '../../utils/MainApi';
import { newsApi } from '../../utils/NewsApi';
import { auth }  from '../../utils/auth';

//components
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//context
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

export default function App() {

  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [isSignedIn, setisSignedIn] = React.useState(false);
  const [isNavOpen, setisNavOpen] = React.useState(false);

  const [currentUser, setcurrentUser] = React.useState({});
  const [savedCards, setsavedCards] = React.useState([]);
  const [searchCards, setsearchCards] = React.useState([]);

  //loading
  const [loadingResults, setloadingResults] = React.useState(false);
  const [loadingUser, setloadingUser] = React.useState(false);


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
    setloadingUser(true);
    auth.login(email, password)
    .then((res) => {
      if(res){
        getUser();
      }
      else{
        console.log("login failed");
      }
    })
    .finally(()=>{    
      setloadingUser(false);
      closeAllPopups();
    })  
  }

  function handleSignOut(){
    setcurrentUser({});
    localStorage.clear();
    setsearchCards([]);
    setisSignedIn(false);
  }

  function handleOpenSuccess(){
    closeAllPopups();
    setIsSuccessOpen(true);
  }

  function handleNav(){
    setisNavOpen(!isNavOpen);
  }

  function handleSearch(keyword) {
    //set loading
    setloadingResults(true);
    //get cards
    newsApi.getResults(keyword)        
    .then((data)=>{
      //reset cards
      setsearchCards([]);
      localStorage.removeItem('cards');
      //format cards and set cards
      const formattedCards = formatResults(data.articles, keyword);
      setsearchCards(formattedCards);
      localStorage.setItem('cards', searchCards);
    })
    .catch((err) => { 
      console.log(err);
    })
    .finally(()=>{
      //set loading
      setloadingResults(false);
    })
  }

  function formatResults(results, keyword){
    const defaultImage ='https://images.unsplash.com/photo-1585829365295-ab7cd400c167';
    return results.map(result => ({ 
      keyword : keyword,
      image : !result.urlToImage ? defaultImage:result.urlToImage,
      link : result.url,
      date : result.publishedAt,
      title : result.title,
      text : result.description,
      source : result.source.name
    }));
  }

  function handleSaveCard(card) {
    //check if card already on list
    if(!savedCards.some((item) => item.link === card.link))
    {
      mainApi.addCard(card)
      .then((data)=>{
        console.log("card added!");
        getSavedCards();
      })
      .catch((err) => { 
        console.log(err);
      })
    }
    else{
      const savedCard = savedCards.find((item)=> item.link === card.link);
      handleDeleteCard(savedCard);
    };
  }

  function handleDeleteCard(card) {
    mainApi.deleteCard(card._id)
    .then((data)=>{
      console.log("card deleted!");
      getSavedCards();
    })
    .catch((err) => { 
      console.log(err);
    })
  }

  function getUser(){
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      mainApi.setToken(token);

      //load user
      setloadingUser(true);
      auth.authorize()
      .then((data)=>{
        setisSignedIn(true);
        setcurrentUser(data);
        localStorage.setItem('user', currentUser);
      })
      .catch((err) => { 
        setisSignedIn(false);
        console.log(err);
      })
      .finally(()=>{
        setloadingUser(false);
      })
    }
  }

  function getSavedCards(){
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      mainApi.setToken(token);
      //load cards
      mainApi.getCards()
      .then((data) => { 
        setsavedCards(data);
      })
      .catch((err) => { 
        console.log(err);
      })
    }
    console.log(savedCards);
  }

    //get user from localStorage
    React.useEffect(()=>{   
      if(localStorage.getItem('token')) {   
        getUser();
      }
    },[])

    //get saved cards from localStorage
    React.useEffect(()=>{   
      if(localStorage.getItem('user')) {   
        getSavedCards();
      }
    },[currentUser])

    //reset cards when window is closed
    React.useEffect(()=>{      
      setsearchCards([]);
      localStorage.removeItem('cards');
    },[])

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
      isLoading={loadingUser}
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
            onOpen={handleOpenSignIn} 
            onSignOut={handleSignOut} 
            signedIn={isSignedIn} 
            onOpenNav={handleNav}
            currentUser={currentUser}
            loading={loadingUser}
            />
            <Navigation signedIn={isSignedIn} onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onSignIn={handleSignIn}/>
            <Main 
              isSignedIn={isSignedIn}
              onSearch={handleSearch} 
              onSaveCard={handleSaveCard}
              cards={searchCards}
              fieldValidator={formValidator.fieldValidator}
              formValidator={formValidator.formValidator}
              loading={loadingResults}
            />
          </div>
          </Route>

          <ProtectedRoute exact path="/saved-news" 
            children={
            <div className="App__saved-news">
              <Header
              onSignin={handleSignIn} 
              onOpen={handleOpenSignIn} 
              onSignOut={handleSignOut} 
              signedIn={isSignedIn} 
              onOpenNav={handleNav}
              currentUser={currentUser}
              loading={loadingUser}
              />
              <Navigation signedIn={isSignedIn} onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onSignIn={handleSignIn}/>
              <CurrentCardsContext.Provider value={savedCards}>
                <SavedNews isSignedIn={isSignedIn} onDeleteCard={handleDeleteCard}/>
              </CurrentCardsContext.Provider>
            </div>}
          />

        </Switch>
      <About/>
      <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}