import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function Main(props) {

  const [showResults, setShowResults] = React.useState(false);

  function handleSearch(searchValue){
    setShowResults(true);
    props.onSearch(searchValue);
  }

  //reload last searched cards
  React.useEffect(()=>{   
    if (localStorage.getItem('cards')) {  
      const loadedCards = localStorage.getItem('cards');
      loadedCards.length > 0 ? setShowResults(true) : setShowResults(false);
    }
    else{
      setShowResults(false);
    }
  })

  return (
  <>
    <section className="main">
      <h2 className="main__title">What's going on in the world?</h2>
      <h3 className="main__subtitle">
        Find the latest news on any topic 
        and save them in your personal account.
      </h3> 
      <SearchForm onSearch={handleSearch} formValidator={props.formValidator} fieldValidator={props.fieldValidator}/>
    </section>
    {showResults && 
      <NewsCardList isSignedIn={props.isSignedIn} cards={props.cards} onSaveCard={props.onSaveCard} loading={props.loading}/>
    }
  </>
  ) 
}