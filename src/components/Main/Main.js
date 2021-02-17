import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function Main(props) {

  const [showResults, setShowResults] = React.useState(false);

  function handleSearch(searchValue){
    props.onSearch(searchValue);
  }

  React.useEffect(()=>{
    localStorage.getItem('cards').length > 0 ? setShowResults(true) : setShowResults(false); 
  },[props.cards])

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