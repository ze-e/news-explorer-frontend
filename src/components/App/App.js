import React from 'react';
import { Route, Switch } from 'react-router-dom';

//util
import {formValidator} from '../../utils/formvalidator';
import { mainApi } from '../../utils/MainApi';
import { newsApi } from '../../utils/NewsApi';

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
  const [isErrorOpen, setIsErrorOpen] = React.useState(false);
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
    setIsErrorOpen(false);
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
    setloadingUser(true);
    mainApi.register(username, email, password)
    .then((res) => {
      if(res){
        //registration succeeded
        handleOpenSuccess();
        handleSignIn(email, password);
        console.log(res);
      }
      else{
        //registration failed
        handleOpenError();
        console.log("registration failed");
      }
    })
    .catch(()=>{
      handleOpenError();
      console.log("registration failed");
    })
    .finally(()=>{    
      setloadingUser(false);
    })  

  }

  function handleSignIn(email, password){
    setloadingUser(true);
    mainApi.login(email, password)
    .then((res) => {
      if(res){
        getUser();
        closeAllPopups();
      }
      else{
        handleOpenError();
        console.log("login failed");
      }
    })
    .catch(()=>{
      handleOpenError();
      console.log("login failed");
    })
    .finally(()=>{    
      setloadingUser(false);
    })  
  }

  function handleSignOut(){
    setcurrentUser({});
    setsavedCards([]);
    localStorage.clear();
    setisSignedIn(false);
  }

  function handleOpenSuccess(){
    closeAllPopups();
    setIsSuccessOpen(true);
  }

  function handleOpenError(){
    closeAllPopups();
    setIsErrorOpen(true);
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
      //format cards and set cards
      const formattedCards = formatResults(data.articles, keyword);
      setsearchCards(formattedCards);
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
      mainApi.authorize()
      .then((data)=>{
        setisSignedIn(true);
        setcurrentUser(data);
        localStorage.setItem('user', currentUser);
      })
      .catch((err) => { 
        setisSignedIn(false);
        handleOpenError();
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
        localStorage.setItem('cards', savedCards);
      })
      .catch((err) => { 
        console.log(err);
      })
    }
    console.log(savedCards);
  }

    //get info from localStorage
    React.useEffect(()=>{ 
      if(localStorage.getItem('token')){
        if(localStorage.getItem('cards')) {   
          setsavedCards(localStorage.getItem('cards'))
          getSavedCards();
        } 
        if(localStorage.getItem('user')) {   
          setcurrentUser(localStorage.getItem('user'))
        } 
      getUser();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //get info from localStorage
    React.useEffect(()=>{ 
      getSavedCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <CurrentCardsContext.Provider value={savedCards}>
    <PopupWithForm 
      isOpen={isSignInOpen} 
      onOpen={handleOpenSignUp}
      onClose={closeAllPopups} 
      onSignIn={handleSignIn} 
      fieldValidator={formValidator.fieldValidator}
      formValidator={formValidator.formValidator}
      type={'signIn'}
      isLoading={loadingUser}
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

    <PopupWithForm 
      isOpen={isErrorOpen} 
      onClose={closeAllPopups} 
      type={'error'}
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
              onOpenSignin={handleOpenSignIn}
              searchCards={searchCards}
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
              <SavedNews isSignedIn={isSignedIn} onDeleteCard={handleDeleteCard}/>
            </div>}
          />

        </Switch>
      <About/>
      <Footer/>
    </div>
    </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>

  );
}