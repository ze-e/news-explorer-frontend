import React from 'react';
//components
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
//cards
import {CurrentCardsContext} from '../../contexts/CurrentCardsContext';

const [setCards, cards] = React.useState([]);

export default function SavedNews(props) {
  return (
    <div className="savedNews">
      <SavedNewsHeader />
      <h2 className="savedNews__title">Search Results</h2>
      <CurrentCardsContext.Provider value={cards}>
        <NewsCardList isSignedIn={props.isSignedIn} cards={cards}/>
      </CurrentCardsContext.Provider>

    </div>
  );
}