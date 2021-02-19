import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function Main(props) {

  const [showResults, setShowResults] = React.useState(false);

  function handleSearch(searchValue){
    props.onSearch(searchValue);
    setShowResults(true);
  }

  React.useEffect(()=>{
    (props.searchCards && props.searchCards.length > 0) && setShowResults(true); 
  },[props.searchCards])

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
      <NewsCardList isSignedIn={props.isSignedIn} searchCards={props.searchCards} onSaveCard={props.onSaveCard} loading={props.loading}/>
    }
  </>
  ) 
}