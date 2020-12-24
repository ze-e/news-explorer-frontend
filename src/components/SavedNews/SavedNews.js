import React from 'react';
//components
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function SavedNews() {
  return (
    <>
    <SavedNewsHeader></SavedNewsHeader>
    <NewsCardList></NewsCardList>
    </>
  );
}