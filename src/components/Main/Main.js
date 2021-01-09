import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function Main() {

  const [showResults, setShowResults] = React.useState(false);

  function handleSearch(e){
    e.preventDefault();
    setShowResults(true);
  }

  return (
    <section className="main">
      <h2 className="main__title">What's going on in the world?</h2>
      <h3 className="main__subtitle">
        Find the latest news on any topic 
        and save them in your personal account.
      </h3> 
      <SearchForm onSearch={handleSearch} />
      {showResults &&
      <NewsCardList />
      }

    </section>
  ) 
}