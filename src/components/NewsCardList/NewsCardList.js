import React from 'react';
//components
import NewsCard from '../NewsCard/NewsCard';

export default function NewsCardList() {
  return (
    <div className="newsCardList">
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
    </div>
  );
}