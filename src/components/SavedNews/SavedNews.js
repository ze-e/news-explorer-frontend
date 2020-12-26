import React from 'react';
//components
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function SavedNews() {
  return (
    <>
    <h2 className="savedNews__title">Saved articles</h2>
    {/* <SavedNewsHeader></SavedNewsHeader> */}
    <NewsCardList></NewsCardList>
    <button className="savedNews__show-more"></button>
    </>
  );
}