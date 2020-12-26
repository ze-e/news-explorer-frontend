import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';

export default function NewsCardList() {
  return (
    <div className="newsCardList">
      <div className="newsCardList__grid">
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      </div> 
    </div>
  );
}