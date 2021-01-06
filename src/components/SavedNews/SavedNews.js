import React from 'react';
//components
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function SavedNews() {
  return (
    
    <div className="savedNews">
      <h2 className="savedNews__title">Search Results</h2>
      <SavedNewsHeader></SavedNewsHeader>
      <NewsCardList></NewsCardList>
      <button className="savedNews__show-more">Show More</button>
    </div>
  );
}