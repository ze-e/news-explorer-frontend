import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
  const [cards, setCards] = React.useState([]);
  const [searchCards, setsearchCards] = React.useState([]);

  const [loading, isLoading] = React.useState(false);

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

  function handleSignOut(){
    setcurrentUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cards');

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
    //reset cards
    setsearchCards([]);
    //get cards
    newsApi.getResults(keyword)        
    .then((data)=>{
      //format cards and set cards
      const formattedCards = formatResults(data.articles, keyword);
      setsearchCards(formattedCards);
    })
    .catch((err) => { 
      console.log(err);
    })
  }

  function formatResults(results, keyword){
    return results.map(result => ({ 
      keyword : keyword,
      image : result.urlToImage,
      link : result.url,
      date : result.publishedAt,
      title : result.title,
      text : result.description,
      source : result.source.name
    }));
  }

  function handleSaveCard(card) {
    //check if card already on list
    if(!cards.some((item) => item.link === card.link))
    {
      mainApi.addCard(card)
      .then((data)=>{
        getCards();
      })
      .catch((err) => { 
        console.log(err);
      })
    }
    else(handleDeleteCard(card));
  }

  function handleDeleteCard(card) {
    mainApi.deleteCard(card)
    .then((data)=>{
      getCards();
    })
    .catch((err) => { 
      console.log(err);
    })
  }

  function getCards(){
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      mainApi.setToken(token);
      mainApi.getCards()
      .then((data) => { 
        setCards(data);
      })
      .catch((err) => { 
        console.log(err);
      })
    }
    console.log(cards);
  }

    //get user
    React.useEffect(()=>{
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        mainApi.setToken(token);
        setisSignedIn(true);
        auth.authorize()
        .then((data)=>{
          setcurrentUser(data);
        })
        .catch((err) => { 
          setisSignedIn(false);
          console.log(err);
        })
      }
    },[isSignedIn])

    //save user to localstorage if it changes
    React.useEffect(()=>{
      localStorage.setItem('user', currentUser);
    },[currentUser])

    //get cards from user
    React.useEffect(()=>{      
      getCards();
    },[currentUser])

    //save cards to localStorage if they change
    React.useEffect(()=>{      
      localStorage.setItem('cards', cards);
    },[cards])

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
            onOpen={handleOpenSignIn} 
            onSignOut={handleSignOut} 
            signedIn={isSignedIn} 
            onOpenNav={handleNav}
            currentUser={currentUser}
            />
            <Navigation signedIn={isSignedIn} onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onSignIn={handleSignIn}/>
            <Main 
            isSignedIn={isSignedIn}
            onSearch={handleSearch} 
            onSaveCard={handleSaveCard}
            cards={searchCards}
            fieldValidator={formValidator.fieldValidator}
            formValidator={formValidator.formValidator}
            />
          </div>
          </Route>

          <Route exact path="/saved-news">
            <div className="App__saved-news">
              <Header
              onSignin={handleSignIn} 
              onOpen={handleOpenSignIn} 
              onSignOut={handleSignOut} 
              signedIn={isSignedIn} 
              onOpenNav={handleNav}
              currentUser={currentUser}
              />
              <Navigation signedIn={isSignedIn} onOpen={handleOpenSignIn} isOpen={isNavOpen} onOpenNav={handleNav} onSignIn={handleSignIn}/>
              <CurrentCardsContext.Provider value={cards}>
                <SavedNews isSignedIn={isSignedIn} onDeleteCard={handleDeleteCard}/>
              </CurrentCardsContext.Provider>
            </div>
          </Route>

        </Switch>
      <About/>
      <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}